using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.ViewModels;
using API.Base;
using API.Handler.Contracts;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AccountsController : BaseController<string, Account, IAccountRepository>
{
    private readonly ITokenService tokenService;

    public AccountsController(IAccountRepository repository, ITokenService tokenService) : base(repository)
    {
        this.tokenService = tokenService;
    }

    [HttpPost("Register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register(RegisterVM registerVM)
    {
        try
        {
            var result = await _repository.Register(registerVM);

            return result is 0
                ? Conflict(new { code = 409, message = "Data fail to Insert!" })
                : Ok(new { code = 200, message = "Register Succesfully!" });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }

    [HttpPost("Login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login(LoginVM loginVM)
    {
        try
        {
            var result = await _repository.Login(loginVM);

            if (result is false)
                return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Account Email or Password Does not Match!" });

            var userdata = await _repository.GetUserData(loginVM.Email);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, userdata.Email),
                new Claim(ClaimTypes.Name, userdata.Email),
                new Claim(ClaimTypes.NameIdentifier, userdata.FullName)
            };

            var getRoles = await _repository.GetRolesByEmail(loginVM.Email);
            foreach (var item in getRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }

            var accessToken = tokenService.GenerateAccessToken(claims);
            var refreshToken = tokenService.GenerateRefreshToken();

            await _repository.UpdateToken(userdata.Email, refreshToken, DateTime.Now.AddDays(1));

            // var generatedToken = new TokenResponseVM
            // {
            //     Token = accessToken,
            //     RefreshToken = refreshToken,
            //     TokenType = "Bearer"
            // };

            var token = accessToken;

            return Ok(new { code = StatusCodes.Status200OK, message = "Login Succesfully!", data = token });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }

    [HttpPost]
    [Route("RefreshToken")]
    [AllowAnonymous]
    public async Task<IActionResult> Refresh(TokenVM token)
    {
        try
        {
            if (token is null)
                return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Invalid Client Request" });

            var principal = tokenService.GetPrincipalFromExpiredToken(token.AccessToken);
            var email = principal.Identity.Name;

            var account = await _repository.GetByEmail(email);

            if (account is null || account.RefreshToken != token.RefreshToken || account.RefreshTokenExpiryTime <= DateTime.Now || token.TokenType != "Bearer")
                return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Invalid Client Request" });

            var newAccessToken = tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = tokenService.GenerateRefreshToken();

            await _repository.UpdateToken(email, newRefreshToken);

            var refreshedToken = new TokenResponseVM
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                TokenType = "Bearer"
            };

            return Ok(new { code = StatusCodes.Status200OK, message = "Refresh Token Succesfully!", data = refreshedToken });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }

    [HttpPost]
    [Route("RevokeToken")]
    [AllowAnonymous]
    public async Task<IActionResult> Revoke()
    {
        var email = User.Identity.Name;

        var user = await _repository.GetByEmail(email);
        if (user is null)
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Invalid Client Request" });

        await _repository.UpdateToken(email, null);

        return NoContent();
    }
}

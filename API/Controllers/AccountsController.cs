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
                ? Conflict(new { statusCode = 409, message = "Data fail to Insert!" })
                : Ok(new { statusCode = 200, message = "Register Succesfully!" });
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

            // await _repository.UpdateToken(userdata.Email, refreshToken, DateTime.Now.AddDays(1));

            var generatedToken = new
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };

            return Ok(new { code = StatusCodes.Status200OK, message = "Login Succesfully!", data = generatedToken });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }
}

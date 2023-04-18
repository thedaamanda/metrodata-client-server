using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.ViewModels;
using API.Base;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : BaseController<int, Account, IAccountRepository>
{
    private readonly IAccountRepository repository;
    private readonly IConfiguration configuration;

    public AccountsController(IAccountRepository repository, IConfiguration configuration) : base(repository)
    {
        this.repository = repository;
        this.configuration = configuration;
    }

    [HttpPost("Register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register(RegisterVM registerVM)
    {
        try
        {
            await repository.Register(registerVM);

            return Ok(new { code = StatusCodes.Status200OK, message = "Register Succesfully!" });
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
            var result = await repository.Login(loginVM);

            if (result is false)
                return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Account Email or Password Does not Match!" });

            var userdata = await repository.GetUserData(loginVM.Email);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, userdata.Email),
                new Claim(ClaimTypes.Name, userdata.Email),
                new Claim(ClaimTypes.NameIdentifier, userdata.FullName)
            };

            var getRoles = await repository.GetRolesByEmail(loginVM.Email);
            foreach (var item in getRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentials
            );

            var generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new { code = StatusCodes.Status200OK, message = "Login Succesfully!", data = generatedToken });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }
}

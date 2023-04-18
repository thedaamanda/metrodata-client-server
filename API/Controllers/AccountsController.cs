using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.ViewModels;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : BaseController<int, Account, IAccountRepository>
{
    private readonly IAccountRepository repository;

    public AccountsController(IAccountRepository repository) : base(repository)
    {
        this.repository = repository;
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register(RegisterVM registerVM)
    {
        try
        {
            await repository.Register(registerVM);

            return Ok(new { statusCode = 200, message = "Register Succesfully!" });
        }
        catch
        {
            return BadRequest(new { statusCode = 400, message = "Something Wrong!" });
        }
    }

    [HttpPost("Login")]
    public async Task<ActionResult> Login(LoginVM loginVM)
    {
        try
        {
            var result = await repository.Login(loginVM);

            return result is false
                ? BadRequest(new { statusCode = 400, message = "Wrong Email or Password!" })
                : Ok(new { statusCode = 200, message = "Login Succesfully!", data = result });
        }
        catch
        {
            return BadRequest(new { statusCode = 400, message = "Something Wrong!" });
        }
    }
}

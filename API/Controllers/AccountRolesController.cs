using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountRolesController : BaseController<int, AccountRole, IAccountRoleRepository>
{
    public AccountRolesController(IAccountRoleRepository repository) : base(repository)
    {
    }
}

using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolesController : BaseController<int, Role, IRoleRepository>
{
    public RolesController(IRoleRepository repository) : base(repository)
    {
    }
}

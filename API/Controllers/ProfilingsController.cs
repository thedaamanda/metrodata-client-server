using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfilingsController : BaseController<int, Profiling, IProfilingRepository>
{
    public ProfilingsController(IProfilingRepository repository) : base(repository)
    {
    }
}

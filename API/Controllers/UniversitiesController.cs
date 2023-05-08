using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User")]
public class UniversitiesController : BaseController<int, University, IUniversityRepository>
{
    public UniversitiesController(IUniversityRepository repository) : base(repository)
    {
    }
}

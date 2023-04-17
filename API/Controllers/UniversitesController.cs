using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UniversitiesController : BaseController<int, University, IUniversityRepository>
{
    public UniversitiesController(IUniversityRepository repository) : base(repository)
    {
    }
}

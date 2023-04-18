using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EducationsController : BaseController<int, Education, IEducationRepository>
{
    public EducationsController(IEducationRepository repository) : base(repository)
    {
    }
}

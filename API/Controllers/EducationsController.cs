using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,User")]
public class EducationsController : BaseController<int, Education, IEducationRepository>
{
    public EducationsController(IEducationRepository repository) : base(repository)
    {
    }
}

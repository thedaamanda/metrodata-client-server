using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : BaseController<string, Employee, IEmployeeRepository>
{
    public EmployeesController(IEmployeeRepository repository) : base(repository)
    {
    }
}

using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : BaseController<string, Employee, IEmployeeRepository>
{
    private readonly IEmployeeRepository repository;

    public EmployeesController(IEmployeeRepository repository) : base(repository)
    {
        this.repository = repository;
    }

    [HttpGet("Master")]
    public async Task<ActionResult> GetMaster()
    {
        try
        {
            var result = await repository.GetEmployeeWithEducationAndUniversity();

            return result.Count() is 0
                ? NotFound(new { code = StatusCodes.Status404NotFound, message = "Data Not Found!" })
                : Ok(new { code = StatusCodes.Status200OK, message = "Success", data = result });
        }
        catch (Exception e)
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = $"Something Wrong! : {e.Message}" });
        }
    }
}

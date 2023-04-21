using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;
using API.Models;
using API.Base;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfilingsController : BaseController<string, Profiling, IProfilingRepository>
{
    public ProfilingsController(IProfilingRepository repository) : base(repository)
    {
    }

     [HttpGet("WorkPeriod")]
     public async Task<ActionResult> GetEmployeesByLengthOfWorkDescending()
    {
        var result = await _repository.GetEmployeesByLengthOfWorkDescending();
        return result is null
            ? NotFound(new { code = StatusCodes.Status404NotFound, message = "Data Not Found!" })
            : Ok(new { code = StatusCodes.Status200OK, message = "Success", data = result });
    }

    [HttpGet("TotalByMajor")]
    public async Task<ActionResult> GetEmployeesTotalByMajorAndUniversity()
    {
        var result = await _repository.GetEmployeesTotalByMajorAndUniversity();
        return result is null
            ? NotFound(new { code = StatusCodes.Status404NotFound, message = "Data Not Found!" })
            : Ok(new { code = StatusCodes.Status200OK, message = "Success", data = result });
    }

    [HttpGet("AvgGPA/{year}")]
    public async Task<ActionResult> GetEmployeesAboveAvgGPAByMajorAndUniversity(int year)
    {
        var result = await _repository.GetEmployeesAboveAvgGPAByMajorAndUniversity(year);
        return result is null
            ? NotFound(new { code = StatusCodes.Status404NotFound, message = "Data Not Found!" })
            : Ok(new { code = StatusCodes.Status200OK, message = "Success", data = result });
    }
}

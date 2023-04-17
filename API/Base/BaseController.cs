using Microsoft.AspNetCore.Mvc;
using API.Repositories.Contracts;

namespace API.Base;

[Route("api/[controller]")]
[ApiController]
public class BaseController<Key, Entity, Repository> : ControllerBase
    where Entity : class
    where Repository : IGeneralRepository<Key, Entity>
{
    private readonly Repository repository;

    public BaseController(Repository repository)
    {
        this.repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        try
        {
            var result = await repository.GetAllAsync();
            return result.Count() is 0
                ? NotFound(new { code = StatusCodes.Status404NotFound, message = "Data Not Found!" })
                : Ok(new { code = StatusCodes.Status200OK, message = "Success", data = result });
        }
        catch (Exception e)
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = $"Something Wrong! : {e.Message}" });
        }
    }

    [HttpGet("{key}")]
    public async Task<ActionResult> GetById(Key key)
    {
        try
        {
            var result = await repository.GetByIdAsync(key);
            return result is null
                ? NotFound(new { code = StatusCodes.Status404NotFound, message = $"Data With Id {key} Not Found!" })
                : Ok(new { code = StatusCodes.Status200OK, message = $"Data Found!", data = result });
        }
        catch (Exception e)
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = $"Something Wrong! : {e.Message}" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> Insert(Entity entity)
    {
        try
        {
            var result = await repository.InsertAsync(entity);

            return result is null
                ? BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" })
                : Ok(new { code = StatusCodes.Status201Created, message = "Insert Succesfully!", data = result });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!" });
        }
    }

    [HttpPut("{key}")]
    public async Task<ActionResult> Update(Entity entity, Key key)
    {
        try
        {
            var result = await repository.IsDataExist(key);

            if (!result)
            {
                return NotFound(new { code = StatusCodes.Status404NotFound, message = $"Id {key} Data Not Found" });
            }

            await repository.UpdateAsync(entity);

            return Ok(new { code = StatusCodes.Status200OK, message = "Data Update Succesfully!" });
        }
        catch
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = "Something Wrong!"});
        }
    }

    [HttpDelete("{key}")]
    public async Task<ActionResult> Delete(Key key)
    {
        try
        {
            var result = await repository.IsDataExist(key);

            if (!result)
            {
                return NotFound(new { code = StatusCodes.Status404NotFound, message = $"Id {key} Data Not Found" });
            }

            await repository.DeleteAsync(key);

            return Ok(new { code = StatusCodes.Status200OK, message = "Data Delete Succesfully!" });
        }
        catch (Exception e)
        {
            return BadRequest(new { code = StatusCodes.Status400BadRequest, message = $"Something Wrong {e.Message}" });
        }
    }
}

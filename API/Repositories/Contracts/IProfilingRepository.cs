using API.Models;

namespace API.Repositories.Contracts;

public interface IProfilingRepository : IGeneralRepository<string, Profiling>
{
     Task<IEnumerable<Employee>> GetEmployeesByLengthOfWorkDescending();
}

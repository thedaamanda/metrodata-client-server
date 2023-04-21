using API.Models;
using API.ViewModels;

namespace API.Repositories.Contracts;

public interface IProfilingRepository : IGeneralRepository<string, Profiling>
{
     Task<IEnumerable<Employee>> GetEmployeesByLengthOfWorkDescending();
     Task<IEnumerable<EmployeeTotalVM>> GetEmployeesTotalByMajorAndUniversity();
     Task<IEnumerable<EmployeeGpaVM>> GetEmployeesAboveAvgGPAByMajorAndUniversity(int year);
}

using API.Models;
using API.ViewModels;

namespace API.Repositories.Contracts;

public interface IEmployeeRepository : IGeneralRepository<string, Employee>
{
    Task<Employee?> GetByEmail(string email);
    Task<IEnumerable<EmployeeDetailVM>> GetEmployeeWithEducationAndUniversity();
}

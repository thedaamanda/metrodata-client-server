using API.Contexts;
using API.Models;
using API.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class EmployeeRepository : GeneralRepository<string, Employee, MyContext>, IEmployeeRepository
{
    public EmployeeRepository(MyContext context) : base(context)
    {
    }

    public async Task<Employee?> GetByEmail(string email)
    {
        return await _context.Set<Employee>().FirstOrDefaultAsync(x => x.Email == email);
    }
}

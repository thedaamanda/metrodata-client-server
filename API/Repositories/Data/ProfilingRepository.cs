using API.Contexts;
using API.Models;
using API.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class ProfilingRepository : GeneralRepository<string, Profiling, MyContext>, IProfilingRepository
{
    public ProfilingRepository(MyContext context
    ) : base(context)
    {
    }

    public async Task<IEnumerable<Employee>> GetEmployeesByLengthOfWorkDescending()
    {
        var getEmployees = await _context.Set<Employee>().ToListAsync();
        var getEmployeesByLengthOfWorkDescending = getEmployees.OrderByDescending(x => x.HiringDate);

        return getEmployeesByLengthOfWorkDescending;
    }
}

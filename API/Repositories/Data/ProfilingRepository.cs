using API.Contexts;
using API.Models;
using API.Repositories.Contracts;

namespace API.Repositories.Data;

public class ProfilingRepository : GeneralRepository<int, Profiling, MyContext>, IProfilingRepository
{
    public ProfilingRepository(MyContext context) : base(context)
    {
    }
}

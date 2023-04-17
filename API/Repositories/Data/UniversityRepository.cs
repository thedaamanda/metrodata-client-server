using API.Contexts;
using API.Models;
using API.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class UniversityRepository : GeneralRepository<int, University, MyContext>, IUniversityRepository
{
    public UniversityRepository(MyContext context) : base(context)
    {
    }

    public async Task<bool> IsNameExist(string name)
    {
        var entity = await _context.Set<University>().FirstOrDefaultAsync(x => x.Name == name);
        return entity is not null;
    }
}

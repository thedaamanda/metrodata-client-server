using API.Contexts;
using API.Models;
using API.Repositories.Contracts;

namespace API.Repositories.Data;

public class UniversityRepository : GeneralRepository<int, University, MyContext>, IUniversityRepository
{
    public UniversityRepository(MyContext context) : base(context)
    {
    }
}

using API.Models;

namespace API.Repositories.Contracts;

public interface IUniversityRepository : IGeneralRepository<int, University>
{
    Task<bool> IsNameExist(string name);
}

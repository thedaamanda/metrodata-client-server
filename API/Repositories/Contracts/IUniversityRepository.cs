using API.Models;

namespace API.Repositories.Contracts;

public interface IUniversityRepository : IGeneralRepository<int, University>
{
    Task<University?> GetByName(string name);
    Task<bool> IsNameExist(string name);
}

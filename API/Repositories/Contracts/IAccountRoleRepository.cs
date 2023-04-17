using API.Models;

namespace API.Repositories.Contracts;

public interface IAccountRoleRepository : IGeneralRepository<int, AccountRole>
{
    Task<IEnumerable<string>> GetRolesByNIK(string nik);
}

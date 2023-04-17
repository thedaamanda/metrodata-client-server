using API.Contexts;
using API.Models;
using API.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class AccountRoleRepository : GeneralRepository<int, AccountRole, MyContext>, IAccountRoleRepository
{
    private readonly IRoleRepository _roleRepository;

    public AccountRoleRepository(
        MyContext context,
        IRoleRepository roleRepository
        ) : base(context)
    {
        _roleRepository = roleRepository;
    }

    public async Task<IEnumerable<string>> GetByNik(string nik)
    {
        var getRoles = await _roleRepository.GetAllAsync();
        var getAccountRoles = await GetAllAsync();

        return getAccountRoles.Where(ar => ar.AccountNik == nik)
            .Join(getRoles, ar => ar.RoleId, r => r.Id, (ar, r) => r.Name).ToList();
    }
}

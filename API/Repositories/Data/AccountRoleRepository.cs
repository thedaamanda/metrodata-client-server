using API.Contexts;
using API.Models;
using API.Repositories.Contracts;

namespace API.Repositories.Data;

public class AccountRoleRepository : GeneralRepository<int, AccountRole, MyContext>, IAccountRoleRepository
{
    public AccountRoleRepository(MyContext context) : base(context)
    {
    }
}

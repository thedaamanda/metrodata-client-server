using API.Models;
using API.ViewModels;

namespace API.Repositories.Contracts;

public interface IAccountRepository : IGeneralRepository<string, Account>
{
    Task<int> Register(RegisterVM registerVM);
    Task<bool> Login(LoginVM loginVM);
    Task<UserDataVM> GetUserData(string email);
    Task<IEnumerable<string>> GetRolesByEmail(string email);
}

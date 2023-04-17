using API.Models;
using API.ViewModels;

namespace API.Repositories.Contracts;

public interface IAccountRepository : IGeneralRepository<int, Account>
{
    Task Register(RegisterVM registerVM);
    Task<bool> Login(LoginVM loginVM);
    Task<UserDataVM> GetUserData(string email);
}

using API.Contexts;
using API.Models;
using API.Repositories.Contracts;
using API.ViewModels;

namespace API.Repositories.Data;

public class AccountRepository : GeneralRepository<int, Account, MyContext>, IAccountRepository
{
    private readonly IUniversityRepository _universityRepository;
    private readonly IEducationRepository _educationRepository;
    private readonly IEmployeeRepository _employeeRepository;


    public AccountRepository(
        MyContext context,
        IUniversityRepository universityRepository,
        IEducationRepository educationRepository,
        IEmployeeRepository employeeRepository
        ) : base(context)
    {
        _universityRepository = universityRepository;
        _educationRepository = educationRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task Register(RegisterVM registerVM)
    {
        using var transaction = _context.Database.BeginTransaction();
        try {
            var university = new University {
                Name = registerVM.UniversityName
            };

            if (await _universityRepository.IsNameExist(registerVM.UniversityName)) {

            } else {
                await _universityRepository.InsertAsync(university);
            }

            var education = new Education {
                Major = registerVM.Major,
                Degree = registerVM.Degree,
                Gpa = registerVM.GPA,
                UniversityId = university.Id
            };
            await _educationRepository.InsertAsync(education);

            // Employee
            // Account
            // Profiling
            // AccountRole

            await transaction.CommitAsync();
        } catch {
            await transaction.RollbackAsync();
        }
    }

    public async Task<bool> Login(LoginVM loginVM)
    {
        var getEmployees = await _employeeRepository.GetAllAsync();
        var getAccounts = await GetAllAsync();

        var getUserData = getEmployees.Join(getAccounts,
                                            e => e.Nik,
                                            a => a.EmployeeNik,
                                            (e, a) => new LoginVM {
                                                Email = e.Email,
                                                Password = a.Password
                                            })
                                      .FirstOrDefault(ud => ud.Email == loginVM.Email);

        return getUserData is not null && loginVM.Password == getUserData.Password;
    }

    public Task<UserDataVM> GetUserData(string email)
    {
        throw new NotImplementedException();
    }
}

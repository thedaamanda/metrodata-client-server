using API.Contexts;
using API.Models;
using API.Handler;
using API.ViewModels;
using API.Repositories.Contracts;

namespace API.Repositories.Data;

public class AccountRepository : GeneralRepository<string, Account, MyContext>, IAccountRepository
{
    private readonly IUniversityRepository _universityRepository;
    private readonly IEducationRepository _educationRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IAccountRoleRepository _accountRoleRepository;
    private readonly IProfilingRepository _profilingRepository;

    public AccountRepository(
        MyContext context,
        IUniversityRepository universityRepository,
        IEducationRepository educationRepository,
        IEmployeeRepository employeeRepository,
        IAccountRoleRepository accountRoleRepository,
        IProfilingRepository profilingRepository
        ) : base(context)
    {
        _universityRepository = universityRepository;
        _educationRepository = educationRepository;
        _employeeRepository = employeeRepository;
        _accountRoleRepository = accountRoleRepository;
        _profilingRepository = profilingRepository;
    }

    public async Task<int> Register(RegisterVM registerVM)
    {
        await using var transaction = _context.Database.BeginTransaction();
        try {
            var university = await _universityRepository.InsertAsync(new University {
                Name = registerVM.UniversityName
            });

            var education = await _educationRepository.InsertAsync(new Education {
                Major = registerVM.Major,
                Degree = registerVM.Degree,
                Gpa = registerVM.GPA,
                UniversityId = university!.Id
            });

            var employee = await _employeeRepository.InsertAsync(new Employee {
                Nik = registerVM.NIK,
                FirstName = registerVM.FirstName,
                LastName = registerVM.LastName,
                BirthDate = registerVM.BirthDate,
                Gender = registerVM.Gender,
                PhoneNumber = registerVM.PhoneNumber,
                Email = registerVM.Email,
                HiringDate = DateTime.Now
            });

            await InsertAsync(new Account {
                EmployeeNik = employee!.Nik,
                Password = Hashing.HashPassword(registerVM.Password)
            });

            await _profilingRepository.InsertAsync(new Profiling {
                EmployeeNik = employee.Nik,
                EducationId = education!.Id
            });

            await _accountRoleRepository.InsertAsync(new AccountRole {
                AccountNik = employee.Nik,
                RoleId = registerVM.RoleId
            });

            await transaction.CommitAsync();
            return 1;
        } catch {
            await transaction.RollbackAsync();
            return 0;
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

        return getUserData is not null && Hashing.ValidatePassword(loginVM.Password, getUserData.Password);
    }

    public async Task<UserDataVM> GetUserData(string email)
    {
        var getEmployees = await _employeeRepository.GetAllAsync();
        var getAccounts = await GetAllAsync();

        var getUserData = getEmployees.Join(getAccounts,
                                            e => e.Nik,
                                            a => a.EmployeeNik,
                                            (e, a) => new UserDataVM {
                                                FullName = e.FirstName + " " + e.LastName,
                                                Email = e.Email
                                            })
                                      .FirstOrDefault(ud => ud.Email == email);

        return getUserData;
    }

    public async Task<IEnumerable<string>> GetRolesByEmail(string email)
    {
        var getNIK = await _employeeRepository.GetByEmail(email);
        var getRoles = await _accountRoleRepository.GetRolesByNIK(getNIK!.Nik);

        return getRoles;
    }
}

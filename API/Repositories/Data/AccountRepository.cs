using API.Contexts;
using API.Models;
using API.Handler;
using API.ViewModels;
using API.Repositories.Contracts;

namespace API.Repositories.Data;

public class AccountRepository : GeneralRepository<int, Account, MyContext>, IAccountRepository
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

            var employee = new Employee {
                Nik = registerVM.NIK,
                FirstName = registerVM.FirstName,
                LastName = registerVM.LastName,
                BirthDate = registerVM.BirthDate,
                Gender = registerVM.Gender,
                PhoneNumber = registerVM.PhoneNumber,
                Email = registerVM.Email,
                HiringDate = DateTime.Now
            };
            await _employeeRepository.InsertAsync(employee);

            var account = new Account {
                EmployeeNik = employee.Nik,
                Password = Hashing.HashPassword(registerVM.Password)
            };
            await InsertAsync(account);

            var accountRole = new AccountRole {
                AccountNik = registerVM.NIK,
                RoleId = 2
            };
            await _accountRoleRepository.InsertAsync(accountRole);

            var profiling = new Profiling {
                EmployeeNik = registerVM.NIK,
                EducationId = education.Id,
            };
            await _profilingRepository.InsertAsync(profiling);

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

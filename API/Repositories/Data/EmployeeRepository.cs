using API.Contexts;
using API.Models;
using API.ViewModels;
using API.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class EmployeeRepository : GeneralRepository<string, Employee, MyContext>, IEmployeeRepository
{
    private readonly IProfilingRepository _profilingRepository;
    private readonly IEducationRepository _educationRepository;
    private readonly IUniversityRepository _universityRepository;

    public EmployeeRepository(
        MyContext context,
        IProfilingRepository profilingRepository,
        IEducationRepository educationRepository,
        IUniversityRepository universityRepository
        ) : base(context)
    {
        _profilingRepository = profilingRepository;
        _educationRepository = educationRepository;
        _universityRepository = universityRepository;
    }

    public async Task<Employee?> GetByEmail(string email)
    {
        return await _context.Set<Employee>().FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<IEnumerable<EmployeeDetailVM>> GetEmployeeWithEducationAndUniversity()
    {
        var getEmployees = await GetAllAsync();
        var getProfiling = await _profilingRepository.GetAllAsync();
        var getEducations = await _educationRepository.GetAllAsync();
        var getUniversities = await _universityRepository.GetAllAsync();

        var getDetailEmployees = getEmployees.Join(
            getProfiling,
            employee => employee.Nik,
            profiling => profiling.EmployeeNik,
            (employee, profiling) => new EmployeeDetailVM {
                NIK = employee.Nik,
                FirstName = employee.FirstName,
                LastName = employee.LastName!,
                BirthDate = employee.BirthDate,
                Gender = employee.Gender,
                PhoneNumber = employee.PhoneNumber!,
                Email = employee.Email,
                HiringDate = employee.HiringDate,
                Education = profiling.Education!,
                University = profiling.Education!.University!
            }
        );

        return getDetailEmployees;
    }
}

using API.Models;

namespace API.ViewModels;

public class EmployeeGpaVM
{
    public string NIK { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public GenderEnum Gender { get; set; }
    public DateTime HiringDate { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public decimal AvgGpa { get; set; }
    public decimal Gpa { get; set; }
    public string Major { get; set; }
    public string University { get; set; }
}

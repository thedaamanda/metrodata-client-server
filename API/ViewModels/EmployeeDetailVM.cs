using API.Models;

namespace API.ViewModels;

public class EmployeeDetailVM
{
    public string NIK { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public GenderEnum Gender { get; set; }
    public DateTime HiringDate { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public Education Education { get; set; }
    public University University { get; set; }
}

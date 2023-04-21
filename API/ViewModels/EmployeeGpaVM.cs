using API.Models;

namespace API.ViewModels;

public class EmployeeGpaVM
{
    public string Major { get; set; }
    public string University { get; set; }
    public decimal AvgGpa { get; set; }
    public IEnumerable<EmployeeDetailVM> Employees { get; set; }
}

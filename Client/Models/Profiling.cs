using System.Text.Json.Serialization;

namespace Client.Models;

public partial class Profiling
{
    public string EmployeeNik { get; set; } = null!;

    public int EducationId { get; set; }

    [JsonIgnore]
    public virtual Education? Education { get; set; }

    [JsonIgnore]

    public virtual Employee? EmployeeNikNavigation { get; set; }
}

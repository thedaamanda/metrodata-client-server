using System.Text.Json.Serialization;

namespace Client.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<AccountRole> AccountRoles { get; set; } = new List<AccountRole>();
}

﻿using System.Text.Json.Serialization;

namespace API.Models;

public partial class Account
{
    public string EmployeeNik { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    [JsonIgnore]
    public virtual Employee EmployeeNikNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<AccountRole> AccountRoles { get; set; } = new List<AccountRole>();
}

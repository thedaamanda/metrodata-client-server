﻿using System.Text.Json.Serialization;

namespace API.Models;

public partial class Employee
{
    public string Nik { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public DateTime BirthDate { get; set; }

    public GenderEnum Gender { get; set; }

    public DateTime HiringDate { get; set; }

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    [JsonIgnore]
    public virtual Account? Account { get; set; }

    [JsonIgnore]
    public virtual Profiling? Profiling { get; set; }
}

public enum GenderEnum
{
    Male,
    Female
}

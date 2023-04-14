using System;
using System.Collections.Generic;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Contexts;

public partial class MyContext : DbContext
{
    public MyContext()
    {
    }

    public MyContext(DbContextOptions<MyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Education> Educations { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<University> TbMUniversities { get; set; }

    public virtual DbSet<AccountRole> AccountRoles { get; set; }

    public virtual DbSet<Profiling> Profilings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.EmployeeNik);

            entity.ToTable("tb_m_accounts");

            entity.Property(e => e.EmployeeNik)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("employee_nik");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");

            entity.HasOne(d => d.EmployeeNikNavigation).WithOne(p => p.Account).HasForeignKey<Account>(d => d.EmployeeNik);
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.ToTable("tb_m_educations");

            entity.HasIndex(e => e.UniversityId, "IX_tb_m_educations_university_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Degree)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("degree");
            entity.Property(e => e.Gpa)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("gpa");
            entity.Property(e => e.Major)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("major");
            entity.Property(e => e.UniversityId).HasColumnName("university_id");

            entity.HasOne(d => d.University).WithMany(p => p.Educations).HasForeignKey(d => d.UniversityId);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Nik);

            entity.ToTable("tb_m_employees");

            entity.HasIndex(e => new { e.Email, e.PhoneNumber }, "IX_tb_m_employees_email_phone_number")
                .IsUnique()
                .HasFilter("([phone_number] IS NOT NULL)");

            entity.Property(e => e.Nik)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("nik");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.HiringDate).HasColumnName("hiring_date");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("tb_m_roles");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<University>(entity =>
        {
            entity.ToTable("tb_m_universities");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<AccountRole>(entity =>
        {
            entity.ToTable("tb_tr_account_roles");

            entity.HasIndex(e => e.AccountNik, "IX_tb_tr_account_roles_account_nik");

            entity.HasIndex(e => e.RoleId, "IX_tb_tr_account_roles_role_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountNik)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("account_nik");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.AccountNikNavigation).WithMany(p => p.AccountRoles).HasForeignKey(d => d.AccountNik);

            entity.HasOne(d => d.Role).WithMany(p => p.AccountRoles).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<Profiling>(entity =>
        {
            entity.HasKey(e => e.EmployeeNik);

            entity.ToTable("tb_tr_profilings");

            entity.HasIndex(e => e.EducationId, "IX_tb_tr_profilings_education_id").IsUnique();

            entity.Property(e => e.EmployeeNik)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("employee_nik");
            entity.Property(e => e.EducationId).HasColumnName("education_id");

            entity.HasOne(d => d.Education).WithOne(p => p.Profiling).HasForeignKey<Profiling>(d => d.EducationId);

            entity.HasOne(d => d.EmployeeNikNavigation).WithOne(p => p.Profiling).HasForeignKey<Profiling>(d => d.EmployeeNik);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

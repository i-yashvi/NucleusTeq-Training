package com.yashvi.ExpenseTracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yashvi.ExpenseTracker.enums.DepartmentName;
import com.yashvi.ExpenseTracker.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name= "users", uniqueConstraints = {
@UniqueConstraint(columnNames = {"department_name", "role"})
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    @NotBlank(message = "Full name is required!")
    private String fullName;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@nucleusteq\\.com$",
            message = "Email must be a company email (@nucleusteq.com)")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Password is required!")
    @Size(min = 8, message = "Password must be at least 8 characters long!")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Role is required!")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Department is required!")
    private DepartmentName departmentName;

    // No-Args Constructor
    public User() {}

    // All-Args Constructor (including ID)
    public User(Long userId, String fullName, String email, String password, Role role, DepartmentName departmentName) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.departmentName = departmentName;
    }

    // Partial Constructor (without ID for new users)
    public User(String fullName, String email, String password, Role role, DepartmentName departmentName) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.departmentName = departmentName;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public DepartmentName getDepartmentName() { return departmentName; }
    public void setDepartmentName(DepartmentName departmentName) {
        this.departmentName = departmentName;
    }

}
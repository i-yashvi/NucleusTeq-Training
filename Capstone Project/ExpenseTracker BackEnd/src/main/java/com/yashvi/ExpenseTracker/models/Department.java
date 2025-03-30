package com.yashvi.ExpenseTracker.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yashvi.ExpenseTracker.enums.DepartmentName;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deptId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    @NotNull(message = "Department name is required!")
    private DepartmentName departmentName;

    @Column(nullable = false)
    @NotNull(message = "Assigned amount is required!")
    private double assignedBudget; // Renamed from departmentBudget

    @Column(nullable = false)
    private double currentBudget;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "Start date is required!")
    private LocalDate startDate;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "End date is required!")
    private LocalDate endDate;

    // No-arg constructor (Required by JPA)
    public Department() {}

    // All-Args Constructor with ID (for fetching or updating existing records)
    public Department (Long deptId, DepartmentName departmentName, Double assignedBudget, Double currentBudget, LocalDate startDate, LocalDate endDate) {
        this.deptId = deptId;
        this.departmentName = departmentName;
        this.assignedBudget = assignedBudget;
        this.currentBudget = currentBudget;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Partial Constructor without ID (for creating new budgets)
    public Department (DepartmentName departmentName, Double assignedBudget, Double currentBudget, LocalDate startDate, LocalDate endDate) {
        this.departmentName = departmentName;
        this.assignedBudget = assignedBudget;
        this.currentBudget = currentBudget;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Department(DepartmentName departmentName) {
        this.departmentName = departmentName;
        this.assignedBudget = 0.0;
        this.currentBudget = 0.0;
        this.startDate = LocalDate.now();
        this.endDate = LocalDate.now().plusYears(1);
    }

    public Long getDeptId() { return deptId; }

    public DepartmentName getDepartmentName() { return departmentName; }
    public void setDepartmentName(DepartmentName departmentName) { this.departmentName = departmentName; }

    public double getAssignedBudget() { return assignedBudget; }
    public void setAssignedBudget(double assignedBudget) { this.assignedBudget = assignedBudget; }

    public double getCurrentBudget() { return currentBudget; }
    public void setCurrentBudget(double currentBudget) { this.currentBudget = currentBudget; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

}
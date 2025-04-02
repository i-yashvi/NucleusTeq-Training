package com.yashvi.ExpenseTracker.service;

import com.yashvi.ExpenseTracker.enums.DepartmentName;
import com.yashvi.ExpenseTracker.exceptions.ResourceNotFoundException;
import com.yashvi.ExpenseTracker.models.Department;
import com.yashvi.ExpenseTracker.repository.DepartmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Get a department
    public Department getDepartment(Long deptId) {
        return departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + deptId));
    }

    // Delete a department
    @Transactional
    public void deleteDepartment(Long deptId) {
        Department department = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + deptId));

        departmentRepository.delete(department);
    }

    // Fetches the current budget of a department
    public double getCurrentBudgetById(Long deptId) {
        return departmentRepository.findById(deptId)
                .map(Department::getCurrentBudget)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found!"));
    }

    // Fetches the assigned budget of a department
    public double getAssignedBudgetById(Long deptId) {
        return departmentRepository.findById(deptId)
                .map(Department::getAssignedBudget)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found!"));
    }

    public Double getCurrentBudgetByName(DepartmentName departmentName) {
        return departmentRepository.findByDepartmentName(departmentName)
                .map(Department::getCurrentBudget)
                .orElse(null);  // Returns null if department is not found
    }

    public Double getAssignedBudgetByName(DepartmentName departmentName) {
        return departmentRepository.findByDepartmentName(departmentName)
                .map(Department::getAssignedBudget)
                .orElse(null);  // Returns null if department is not found
    }

    public LocalDate getEndDateByName(DepartmentName departmentName) {
        return departmentRepository.findByDepartmentName(departmentName)
                .map(Department::getEndDate)
                .orElse(null);  // Returns null if department is not found
    }

    // Create or Update a Department's Budget
    @Transactional
    public void createOrUpdateDepartment(Department department) throws IOException  {
        Optional<Department> existingDeptOpt = departmentRepository.findByDepartmentName(department.getDepartmentName());

        if (existingDeptOpt.isPresent()) {
            Department existingDept = existingDeptOpt.get();

            // Update existing department budget
            existingDept.setAssignedBudget(department.getAssignedBudget());
            existingDept.setStartDate(department.getStartDate());
            existingDept.setEndDate(department.getEndDate());

            // Update current budget only if start date is today or in the past
            if (!department.getStartDate().isAfter(LocalDate.now())) {
                existingDept.setCurrentBudget(department.getAssignedBudget());
            }

            departmentRepository.save(existingDept);
        } else {
            // Create a new department entry with its budget
            if (!department.getStartDate().isAfter(LocalDate.now())) {
                department.setCurrentBudget(department.getAssignedBudget());
            }
            departmentRepository.save(department);
        }
    }

    // Deduct expense amount when an expense is marked as PAID
    @Transactional
    public void deductExpenseAmount(Long deptId, double expenseAmount) {
        Department department = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + deptId));

        if (department.getCurrentBudget() >= expenseAmount) {
            department.setCurrentBudget(department.getCurrentBudget() - expenseAmount);
            departmentRepository.save(department);
        } else {
            throw new IllegalStateException("Insufficient budget to approve this expense.");
        }
    }

}
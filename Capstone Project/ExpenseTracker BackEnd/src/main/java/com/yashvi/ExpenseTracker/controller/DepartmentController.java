package com.yashvi.ExpenseTracker.controller;

import com.yashvi.ExpenseTracker.enums.DepartmentName;
import com.yashvi.ExpenseTracker.models.Department;
import com.yashvi.ExpenseTracker.repository.DepartmentRepository;
import com.yashvi.ExpenseTracker.service.DepartmentService;
import org.hibernate.validator.internal.util.privilegedactions.LoadClass;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentService departmentService, DepartmentRepository departmentRepository) {
        this.departmentService = departmentService;
        this.departmentRepository = departmentRepository;
    }

    // Get all departments
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentRepository.findAll());
    }

    // Get a department
    @GetMapping("/{deptId}")
    public ResponseEntity<Department> getDepartment(@PathVariable Long deptId) {
        Department department = departmentService.getDepartment(deptId);
        return ResponseEntity.ok(department);
    }

    // Create a new Department
    @PostMapping("/create")
    public ResponseEntity<?> addDepartment(@RequestBody Department department) {
        Optional<Department> existingDept = departmentRepository.findByDepartmentName(department.getDepartmentName());

        if (existingDept.isPresent()) {
            return ResponseEntity.badRequest().body("Department already exists!");
        }

        Department newDepartmentName = new Department(department.getDepartmentName());
        departmentRepository.save(newDepartmentName);
        return ResponseEntity.ok(department);

    }

    // Delete a department
    @DeleteMapping("/{deptId}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long deptId) {
        departmentService.deleteDepartment(deptId);
        return ResponseEntity.ok("Department deleted successfully!");
    }

    // Get current budget of a department
    @GetMapping("/currentBudget/id/{deptId}")
    public ResponseEntity<Double> getCurrentBudgetById(@PathVariable Long deptId) {
        double currentBudget = departmentService.getCurrentBudgetById(deptId);
        return ResponseEntity.ok(currentBudget);
    }

    // Get assigned budget of a department
    @GetMapping("/assignedBudget/id/{deptId}")
    public ResponseEntity<Double> getAssignedBudgetById(@PathVariable Long deptId) {
        double assignedBudget = departmentService.getAssignedBudgetById(deptId);
        return ResponseEntity.ok(assignedBudget);
    }

    // Get current budget of a department
    @GetMapping("/currentBudget/name/{departmentName}")
    public ResponseEntity<Double> getCurrentBudgetByDepartment(@PathVariable String departmentName) {
        try {
            DepartmentName deptName = DepartmentName.valueOf(departmentName.toUpperCase());
            Double currentBudget = departmentService.getCurrentBudgetByName(deptName);
            return (currentBudget != null) ? ResponseEntity.ok(currentBudget) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get assigned budget of a department
    @GetMapping("/assignedBudget/name/{departmentName}")
    public ResponseEntity<Double> getAssignedBudgetByDepartment(@PathVariable String departmentName) {
        try {
            DepartmentName deptName = DepartmentName.valueOf(departmentName.toUpperCase());
            Double assignedBudget = departmentService.getAssignedBudgetByName(deptName);
            return (assignedBudget != null) ? ResponseEntity.ok(assignedBudget) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get end-date of a department's budget
    @GetMapping("/endDate/{departmentName}")
    public ResponseEntity<LocalDate> getEndDateByDepartment(@PathVariable String departmentName) {
        try {
            DepartmentName deptName = DepartmentName.valueOf(departmentName.toUpperCase());
            LocalDate endDate = departmentService.getEndDateByName(deptName);
            return (endDate != null) ? ResponseEntity.ok(endDate) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Create or update a department
    @PostMapping("/assignBudget")
    public ResponseEntity<String> createOrUpdateDepartment(@RequestBody Department department) {
        try {
            departmentService.createOrUpdateDepartment(department);
            return ResponseEntity.ok("Budget added successfully.");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to add department budget: " + e.getMessage());
        }
    }

    // Deduct expense amount from current budget when an expense is marked as PAID
    @PutMapping("/deductExpense/{deptId}")
    public ResponseEntity<String> deductExpense(@PathVariable Long deptId, @RequestParam double expenseAmount) {
        departmentService.deductExpenseAmount(deptId, expenseAmount);
        return ResponseEntity.ok("Expense deducted successfully.");
    }

}

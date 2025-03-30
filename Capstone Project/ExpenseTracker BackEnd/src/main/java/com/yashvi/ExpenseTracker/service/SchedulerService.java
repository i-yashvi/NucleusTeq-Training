package com.yashvi.ExpenseTracker.service;

import com.yashvi.ExpenseTracker.models.Department;
import com.yashvi.ExpenseTracker.repository.DepartmentRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SchedulerService {

    private final DepartmentRepository departmentRepository;

    public SchedulerService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Runs every day at midnight (00:00:00) and resets expired budgets
    @Scheduled(cron = "0 0 0 * * ?")
    public void resetExpiredBudgets() {
        LocalDate today = LocalDate.now();

        // Reset current budget to 0 if end date has passed
        List<Department> expiredDepartments = departmentRepository.findByEndDateBefore(today);
        for (Department department : expiredDepartments) {
            if (department.getCurrentBudget() > 0 || department.getAssignedBudget() > 0) { // Avoid unnecessary updates
                department.setCurrentBudget(0.0);
                department.setAssignedBudget(0.0);
                departmentRepository.save(department);
            }
        }

        // Set current budget to assigned budget if today is the start date
        List<Department> startingDepartments = departmentRepository.findByStartDate(today);
        for (Department department : startingDepartments) {
            department.setCurrentBudget(department.getAssignedBudget());
            departmentRepository.save(department);
        }
    }

}
package com.yashvi.ExpenseTracker.repository;

import com.yashvi.ExpenseTracker.enums.DepartmentName;
import com.yashvi.ExpenseTracker.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByDepartmentName(DepartmentName deptName);
    List<Department> findByEndDateBefore(LocalDate today);  // Fetch expired budgets
    List<Department> findByStartDate(LocalDate today);
    Optional<Department> findById(Long deptId);
}

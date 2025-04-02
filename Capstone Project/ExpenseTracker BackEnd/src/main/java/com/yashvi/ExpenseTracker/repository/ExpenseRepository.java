package com.yashvi.ExpenseTracker.repository;

import com.yashvi.ExpenseTracker.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT COALESCE(SUM(e.expenseAmount), 0) FROM Expense e WHERE e.user.userId = :userId AND e.expenseStatus <> 'PAID'")
    Double getTotalExpenseAmountExcludingPaid(@Param("userId") Long userId);
    // Fetch expenses for a specific user (for Employee dashboard)
    Expense findByExpenseId(Long expenseId);
    // Fetch expenses for a specific user (for Employee dashboard)
    List<Expense> findByUser_UserId(Long userId);
    // Fetch expenses for a specific department (for Manager dashboard)
    List<Expense> findByDepartment_DeptId(Long deptId);
    // Fetch approved expenses (for Finance Team dashboard)
    @Query("SELECT e FROM Expense e WHERE (e.expenseStatus = 'APPROVED' OR e.expenseStatus = 'PAID') OR e.user.role = 'MANAGER'")
    List<Expense> findApprovedExpensesForFinanceTeam();

}
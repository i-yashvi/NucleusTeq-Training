package com.yashvi.ExpenseTracker.service;

import com.yashvi.ExpenseTracker.enums.Status;
import com.yashvi.ExpenseTracker.enums.Type;
import com.yashvi.ExpenseTracker.models.Department;
import com.yashvi.ExpenseTracker.models.Expense;
import com.yashvi.ExpenseTracker.models.User;
import com.yashvi.ExpenseTracker.repository.DepartmentRepository;
import com.yashvi.ExpenseTracker.repository.ExpenseRepository;
import com.yashvi.ExpenseTracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final DepartmentService departmentService;
    private final DepartmentRepository departmentRepository;

    // Constructor-based dependency injection
    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository, DepartmentRepository departmentRepository, DepartmentService departmentService) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.departmentService = departmentService;
    }

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get an expense
    public Expense getExpense(Long expenseId) {
        return expenseRepository.findByExpenseId(expenseId);
    }

    // Get sum of expenses made by user
    public Double getTotalExpenseAmountExcludingPaid(Long userId) {
        return expenseRepository.getTotalExpenseAmountExcludingPaid(userId);
    }

    // Fetch expenses for an Employee (based on user)
    public List<Expense> getExpensesForUser(Long userId) {
        return expenseRepository.findByUser_UserId(userId);
    }

    // Fetch expenses for a Manager (based on department)
    public List<Expense> getExpensesForManager(Long deptId) {
        return expenseRepository.findByDepartment_DeptId(deptId);
    }

    // Fetch expenses for Finance Team
    public List<Expense> getExpensesForFinanceTeam() {
        return expenseRepository.findApprovedExpensesForFinanceTeam();
    }


    // Add new expense
    public void addExpense(User userId, Department deptId, String expenseName, Double expenseAmount,
                           LocalDate expenseDate, Type expenseType, MultipartFile expenseReceipt)
            throws IOException {
        //System.out.println(expenseReceipt.getClass().getSimpleName());
        byte[] receiptBytes = (expenseReceipt != null && !expenseReceipt.isEmpty()) ? expenseReceipt.getBytes() : null;

        Expense expense = new Expense( userId, deptId, expenseName, expenseAmount, expenseType, expenseDate, receiptBytes, Status.PENDING);
        //System.out.println(receiptBytes.getClass().getSimpleName());
        //System.out.println(receiptBytes.length);
        expenseRepository.save(expense);
    }


    public byte[] getExpenseReceipt(Long expenseId) {
        return expenseRepository.findById(expenseId)
                .map(Expense::getExpenseReceipt)
                .orElse(null);
    }


    public void editExpense(Long expenseId, User userId, Department deptId, String expenseName, Double expenseAmount,
                                              Type expenseType, LocalDate expenseDate, MultipartFile expenseReceipt) throws IOException {
        Optional<Expense> existingExpense = expenseRepository.findById(expenseId);

        if (existingExpense.isEmpty()) {
            ResponseEntity.badRequest().body("Expense not found!");
        }

        Expense expense = existingExpense.get();

        if (expense.getExpenseStatus() != Status.PENDING) {
            ResponseEntity.badRequest().body("Only PENDING expenses can be edited!");
        }

        // Update expense details
        expense.setExpenseName(expenseName);
        expense.setExpenseAmount(expenseAmount);
        expense.setExpenseType(expenseType);
        expense.setExpenseDate(expenseDate);

        // Update receipt only if a new file is uploaded
        try {
            if (expenseReceipt != null && !expenseReceipt.isEmpty()) {
                expense.setExpenseReceipt(expenseReceipt.getBytes());
            }
        } catch (IOException e) {
            ResponseEntity.badRequest().body("Error processing receipt file.");
        }

        expenseRepository.save(expense);
        ResponseEntity.ok("Expense updated successfully!");
    }


    // Delete Expense (Only if status is PENDING, REJECTED, or PAID)
    public ResponseEntity<String> deleteExpense(Long expenseId) {
        Optional<Expense> existingExpense = expenseRepository.findById(expenseId);

        if (existingExpense.isEmpty()) {
            return ResponseEntity.badRequest().body("Expense not found!");
        }

        Expense expense = existingExpense.get();
        Status status = expense.getExpenseStatus();

        // Allow deletion only if status is PENDING, REJECTED, or PAID
        if (status == Status.PENDING || status == Status.REJECTED || status == Status.PAID) {
            expenseRepository.deleteById(expenseId);
            return ResponseEntity.ok("Expense deleted successfully!");
        } else {
            return ResponseEntity.badRequest().body("Only PENDING, REJECTED, or PAID expenses can be deleted!");
        }
    }

    // Update Expense Status (PENDING → APPROVED/REJECTED | APPROVED → PAID)
    public ResponseEntity<String> updateExpenseStatus(Long expenseId, Status newStatus) {
        Optional<Expense> existingExpense = expenseRepository.findById(expenseId);

        if (existingExpense.isEmpty()) {
            return ResponseEntity.badRequest().body("Expense not found!");
        }

        Expense expense = existingExpense.get();

        // Define valid transitions
        if (expense.getExpenseStatus() == Status.PENDING && (newStatus == Status.APPROVED || newStatus == Status.REJECTED)) {
            expense.setExpenseStatus(newStatus);
        } else if (expense.getExpenseStatus() == Status.APPROVED && newStatus == Status.PAID) {
            // Deduct expense amount from department budget when status changes to PAID
            departmentService.deductExpenseAmount(expense.getDepartment().getDeptId(), expense.getExpenseAmount());
            expense.setExpenseStatus(Status.PAID);
        } else {
            return ResponseEntity.badRequest().body("Invalid status transition!");
        }

        expenseRepository.save(expense);
        return ResponseEntity.ok("Expense status updated successfully!");
    }

}
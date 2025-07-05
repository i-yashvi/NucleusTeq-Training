package com.yashvi.ExpenseTracker.controller;

import com.yashvi.ExpenseTracker.enums.Status;
import com.yashvi.ExpenseTracker.enums.Type;
import com.yashvi.ExpenseTracker.models.Department;
import com.yashvi.ExpenseTracker.models.Expense;
import com.yashvi.ExpenseTracker.models.User;
import com.yashvi.ExpenseTracker.repository.ExpenseRepository;
import com.yashvi.ExpenseTracker.service.ExpenseService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseService expenseService, ExpenseRepository expenseRepository) {
        this.expenseService = expenseService;
        this.expenseRepository = expenseRepository;
    }

    // Get all expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    // Get an expense
    @GetMapping("/{expenseId}")
    public ResponseEntity<Expense> getExpense(@PathVariable Long expenseId) {
        return ResponseEntity.ok(expenseService.getExpense(expenseId));
    }

    // Fetch expenses for an Employee
    @GetMapping("/employee/{userId}")
    public ResponseEntity<List<Expense>> getExpensesForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(expenseService.getExpensesForUser(userId));
    }

    // Get sum of expenses made by user
    @GetMapping("/sum/{userId}")
    public ResponseEntity<Double> getTotalExpenseAmountExcludingPaid(@PathVariable Long userId) {
        Double totalExpenseAmount = expenseService.getTotalExpenseAmountExcludingPaid(userId);
        return ResponseEntity.ok(totalExpenseAmount);
    }

    // Fetch expenses for a Manager
    @GetMapping("/manager/{deptId}")
    public ResponseEntity<List<Expense>> getExpensesForManager(@PathVariable Long deptId) {
        return ResponseEntity.ok(expenseService.getExpensesForManager(deptId));
    }

    // Fetch expenses for Finance Team
    @GetMapping("/finance-team")
    public ResponseEntity<List<Expense>> getExpensesForFinanceTeam() {
        return ResponseEntity.ok(expenseService.getExpensesForFinanceTeam());
    }

    // Add New Expense
    @PostMapping("/add/{userId}/{deptId}")
    public ResponseEntity<String> addExpense(
            @PathVariable User userId,
            @PathVariable Department deptId,
            @RequestParam String expenseName,
            @RequestParam Double expenseAmount,
            @RequestParam LocalDate expenseDate,
            @RequestParam Type expenseType,
            @RequestParam(required = false) MultipartFile expenseReceipt
    ) {
        try {
            expenseService.addExpense(userId, deptId, expenseName, expenseAmount, expenseDate, expenseType, expenseReceipt);
            return ResponseEntity.ok("Expense added successfully.");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to add expense: " + e.getMessage());
        }
    }

    @GetMapping("/receipt/{expenseId}")
    public ResponseEntity<byte[]> getExpenseReceipt(@PathVariable Long expenseId) {
        byte[] receiptData = expenseService.getExpenseReceipt(expenseId);

        if (receiptData == null || receiptData.length == 0) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF); // Adjust if using images
        headers.setContentDisposition(ContentDisposition.inline() // Open in browser
                .filename("receipt_" + expenseId + ".pdf")
                .build());

        return ResponseEntity.ok().headers(headers).body(receiptData);
    }

    // Edit Expense (Allowed only if status is PENDING)
    @PutMapping("/edit/{userId}/{deptId}/{expenseId}")
    public ResponseEntity<String> editExpense(
            @PathVariable Long expenseId,
            @PathVariable User userId,
            @PathVariable Department deptId,
            @RequestParam String expenseName,
            @RequestParam Double expenseAmount,
            @RequestParam Type expenseType,
            @RequestParam LocalDate expenseDate,
            @RequestParam(required = false) MultipartFile expenseReceipt) {

        try {
            expenseService.editExpense(expenseId, userId, deptId, expenseName, expenseAmount, expenseType, expenseDate, expenseReceipt);
            return ResponseEntity.ok("Expense added successfully.");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to add expense: " + e.getMessage());
        }
    }

    // Delete Expense (Allowed only if status is PENDING, REJECTED, or PAID)
    @DeleteMapping("/delete/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        return expenseService.deleteExpense(expenseId);
    }

    // Update Expense Status (PENDING → APPROVED/REJECTED | APPROVED → PAID)
    @PatchMapping("/update-status/{expenseId}")
    public ResponseEntity<String> updateExpenseStatus(@PathVariable Long expenseId, @RequestBody Map<String, String> requestBody) {
        String newStatusStr = requestBody.get("newStatus");

        if (newStatusStr == null) {
            return ResponseEntity.badRequest().body("Missing newStatus in request body!");
        }

        try {
            Status newStatus = Status.valueOf(newStatusStr.toUpperCase()); // Convert to Enum
            return expenseService.updateExpenseStatus(expenseId, newStatus);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value!");
        }
    }

}

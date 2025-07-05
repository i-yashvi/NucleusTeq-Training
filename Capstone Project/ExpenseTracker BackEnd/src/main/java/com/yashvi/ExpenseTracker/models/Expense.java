package com.yashvi.ExpenseTracker.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yashvi.ExpenseTracker.enums.Status;
import com.yashvi.ExpenseTracker.enums.Type;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseId;

    @Column(nullable = false)
    @NotBlank(message = "Expense name is required!")
    private String expenseName;

    @Column(nullable = false)
    @NotNull(message = "Amount is required!")
    private Double expenseAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Type is required!")
    private Type expenseType;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    @NotNull(message = "Date is required!")
    private LocalDate expenseDate;

    //@Lob // Specifies that this is a Large Object
    @Column(columnDefinition = "bytea") // PostgreSQL binary storage
    private byte[] expenseReceipt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status expenseStatus;

    // No-Args Constructor (Required by Hibernate)
    public Expense() {}

    // Constructor without ID (For new expenses)
    public Expense(User user, Department department, String expenseName, Double expenseAmount, Type expenseType, LocalDate expenseDate, byte[] expenseReceipt, Status expenseStatus) {
        this.user = user;
        this.department = department;
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
        this.expenseType = expenseType;
        this.expenseDate = expenseDate;
        this.expenseReceipt = expenseReceipt;
        this.expenseStatus = expenseStatus;
    }

    public Expense(String expenseName, Double expenseAmount, Type expenseType, LocalDate expenseDate, byte[] expenseReceipt, Status expenseStatus) {
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
        this.expenseType = expenseType;
        this.expenseDate = expenseDate;
        this.expenseReceipt = expenseReceipt;
    }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public Long getExpenseId() { return expenseId; }

    public String getExpenseName() { return expenseName; }
    public void setExpenseName(String expenseName) { this.expenseName = expenseName; }

    public Double getExpenseAmount() { return expenseAmount; }
    public void setExpenseAmount(Double expenseAmount) { this.expenseAmount = expenseAmount; }

    public Type getExpenseType() { return expenseType; }
    public void setExpenseType(Type expenseType) { this.expenseType = expenseType; }

    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }

    public byte[] getExpenseReceipt() { return expenseReceipt; }
    public void setExpenseReceipt(byte[] expenseReceipt) { this.expenseReceipt = expenseReceipt; }

    public Status getExpenseStatus() { return expenseStatus; }
    public void setExpenseStatus(Status expenseStatus) {
        this.expenseStatus = expenseStatus;
    }

}
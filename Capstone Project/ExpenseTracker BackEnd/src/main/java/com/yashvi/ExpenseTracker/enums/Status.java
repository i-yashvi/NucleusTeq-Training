package com.yashvi.ExpenseTracker.enums;

public enum Status {
    PENDING,    // Default status for new expenses
    APPROVED,   // Set by Manager when approving the expense
    REJECTED,   // Set by Manager when rejecting the expense
    PAID        // Set by Finance Team when expense is marked as paid
}

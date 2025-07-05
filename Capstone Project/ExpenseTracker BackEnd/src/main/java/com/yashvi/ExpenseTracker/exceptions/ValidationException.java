package com.yashvi.ExpenseTracker.exceptions;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
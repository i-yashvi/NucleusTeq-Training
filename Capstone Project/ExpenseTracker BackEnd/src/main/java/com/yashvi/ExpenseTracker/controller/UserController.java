package com.yashvi.ExpenseTracker.controller;

import com.yashvi.ExpenseTracker.enums.Role;
import com.yashvi.ExpenseTracker.exceptions.UserAlreadyExistsException;
import com.yashvi.ExpenseTracker.exceptions.ValidationException;
import com.yashvi.ExpenseTracker.models.User;
import com.yashvi.ExpenseTracker.repository.UserRepository;
import com.yashvi.ExpenseTracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://127.0.0.1:5500") // Allow frontend
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    // Fetch all registered users
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            // Extract first validation error message
            String errorMessage = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .filter(Objects::nonNull) // Ensure no null values
                    .findFirst()
                    .orElse("Invalid input data");

            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        try {
            if (user.getRole() == Role.MANAGER) {
                boolean managerExists = userRepository.existsByDepartmentNameAndRole(user.getDepartmentName(), Role.MANAGER);
                if (managerExists) {
                    return ResponseEntity.badRequest().body("A manager already exists for this department!");
                }
            }
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(Collections.singletonMap("message", "Signup successful"));
        } catch (UserAlreadyExistsException | ValidationException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        Map<String, Object> response = userService.loginUser(
                loginRequest.get("email"),
                loginRequest.get("password")
        );
        return ResponseEntity.ok(response);
    }

    // Delete a user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
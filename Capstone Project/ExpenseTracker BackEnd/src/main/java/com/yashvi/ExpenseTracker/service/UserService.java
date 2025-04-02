package com.yashvi.ExpenseTracker.service;

import com.yashvi.ExpenseTracker.exceptions.InvalidCredentialsException;
import com.yashvi.ExpenseTracker.exceptions.UserAlreadyExistsException;
import com.yashvi.ExpenseTracker.models.Department;
import jakarta.validation.ValidationException;
import com.yashvi.ExpenseTracker.models.User;
import com.yashvi.ExpenseTracker.repository.DepartmentRepository;
import com.yashvi.ExpenseTracker.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    //@Autowired //Injects dependencies
    public UserService(UserRepository userRepository, DepartmentRepository departmentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Fetch all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Register a new user
    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("Email is already registered.");
        }
        if (user.getPassword().length() < 8) {
            throw new ValidationException("Password must be at least 8 characters long!");
        }

        // Check if department exists
        departmentRepository.findByDepartmentName(user.getDepartmentName())
                .orElseGet(() -> {
                    // If department doesn't exist, create a new one with only deptName
                    Department newDepartmentName = new Department(user.getDepartmentName());
                    return departmentRepository.save(newDepartmentName);
                });

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login user authentication
    public Map<String, Object> loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new InvalidCredentialsException("Invalid email or password!");
        }
        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password!");
        }

        // Fetch deptId using departmentName
        Long deptId = departmentRepository.findByDepartmentName(user.getDepartmentName()).get().getDeptId();

        // Prepare response with required fields
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getUserId());
        response.put("userName", user.getFullName());
        response.put("deptId", deptId);
        response.put("deptName", user.getDepartmentName().name());
        response.put("role", user.getRole().name());

        return response;
    }


    // Delete a user by ID
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ValidationException("User not found with ID: " + userId);
        }
        userRepository.deleteById(userId);
    }
}

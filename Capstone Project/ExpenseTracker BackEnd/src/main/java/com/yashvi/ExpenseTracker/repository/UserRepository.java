package com.yashvi.ExpenseTracker.repository;

import com.yashvi.ExpenseTracker.enums.DepartmentName;
import com.yashvi.ExpenseTracker.enums.Role;
import com.yashvi.ExpenseTracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    boolean existsByDepartmentNameAndRole(DepartmentName departmentName, Role role);
}

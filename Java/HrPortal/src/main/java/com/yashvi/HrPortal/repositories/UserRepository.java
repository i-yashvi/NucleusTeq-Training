package com.yashvi.HrPortal.repositories;

import com.yashvi.HrPortal.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);
}


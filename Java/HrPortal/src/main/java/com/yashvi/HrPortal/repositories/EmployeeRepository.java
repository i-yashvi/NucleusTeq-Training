package com.yashvi.HrPortal.repositories;

import com.yashvi.HrPortal.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

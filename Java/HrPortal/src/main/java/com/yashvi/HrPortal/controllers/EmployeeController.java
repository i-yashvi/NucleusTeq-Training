package com.yashvi.HrPortal.controllers;

import com.yashvi.HrPortal.models.Employee;
import com.yashvi.HrPortal.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Show all employees
    @GetMapping
    public String listEmployees(Model model) {
        List<Employee> employeeList = employeeService.getAllEmployees();
        model.addAttribute("employees", employeeList);
        return "employees"; // This should be your employees.html
    }

    // Show add employee form
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employee", new Employee());
        return "add-employee";
    }

    // Handle add
    @PostMapping("/add")
    public String addEmployee(@ModelAttribute Employee employee) {
        employeeService.saveEmployee(employee);
        return "redirect:/employees";
    }

    // Show update form
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        Employee emp = employeeService.getEmployeeById(id);

        if (emp == null) {
            throw new RuntimeException("Employee not found with ID: " + id);
        }

        model.addAttribute("employee", emp);
        return "edit-employee";  // Ensure this is the correct Thymeleaf template
    }

    // Handle update
    @PostMapping("/update")
    public String updateEmployee(@RequestParam("id") Long id, @ModelAttribute("employee") Employee employee) {
        System.out.println("Received Employee ID: " + employee.getId());
        System.out.println("Received Employee Data: " + employee); // Debugging

        if (employee.getId() == null) {
            throw new IllegalArgumentException("Employee ID cannot be null for an update.");
        }

        employee.setId(id);
        employeeService.updateEmployee(employee);
        return "redirect:/employees";
    }

    // Handle delete
    @GetMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "redirect:/employees";
    }

}
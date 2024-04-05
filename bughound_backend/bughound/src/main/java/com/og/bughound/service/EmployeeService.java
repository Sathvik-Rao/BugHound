package com.og.bughound.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.og.bughound.model.Employee;
import com.og.bughound.model.EmployeeForm;
import com.og.bughound.model.Team;
import com.og.bughound.repo.EmployeeRepo;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    private final TeamService teamService;

    public EmployeeService(EmployeeRepo employeeRepo, TeamService teamService) {
        this.employeeRepo = employeeRepo;
        this.teamService = teamService;

    }

    public Employee getEmployee(String username) {

        if (isValidEmployeeName(username)) {
            username = username.trim();
            return employeeRepo.findByUsername(username);
        }
        return null;
    }

    public Employee getEmployeeById(Long employeeId) {

        return employeeId == null ? null : employeeRepo.findById(employeeId).orElse(null);
    }

    public List<Employee> startsWithEmployeeUsername(String query) {
        return query == null ? null
                : employeeRepo.findByUsernameIgnoreCaseStartingWith(query);
    }

    public List<Employee> getEmployeesByTeam(Long teamId) {
        if (teamId == null) {
            return null;
        }
        return employeeRepo.findByTeamId(teamId);
    }

    @Transactional
    public void deleteEmployee(Long employeeId) {
        if (employeeId != null) {
            employeeRepo.deleteById(employeeId);
        }
    }

    @Transactional
    public Employee saveEmployee(EmployeeForm employeeForm) {

        if (employeeForm == null) {
            return null;
        }

        Employee employee;
        if (employeeForm.getEmployeeId() == null) {
            employee = new Employee();
        } else {
            employee = employeeRepo.findById(employeeForm.getEmployeeId()).orElseGet(Employee::new);
        }

        if (employeeForm.getTeamName() != null && !employeeForm.getTeamName().trim().isEmpty()) {
            Team team = teamService.getTeam(employeeForm.getTeamName());
            if (team != null) {
                employee.setTeamId(team.getTeamId());
            }
        }

        if (employeeForm.getName() != null && !employeeForm.getName().trim().isEmpty()) {
            employee.setName(employeeForm.getName());
        }

        if (employeeForm.getUsername() != null && !employeeForm.getUsername().trim().isEmpty()) {
            employee.setUsername(employeeForm.getUsername());
        } else {
            throw new IllegalArgumentException("Username cannot be empty or null");
        }

        if (employeeForm.getPassword() != null && !employeeForm.getPassword().trim().isEmpty()) {
            employee.setPassword(employeeForm.getPassword());
        } else {
            throw new IllegalArgumentException("Password cannot be empty or null");
        }

        if (employeeForm.getRole() != null && !employeeForm.getRole().trim().isEmpty()) {
            employee.setRole(employeeForm.getRole());
        } else {
            throw new IllegalArgumentException("Role cannot be empty or null");
        }

        if (employeeForm.getDesignation() != null && !employeeForm.getDesignation().trim().isEmpty()) {
            employee.setDesignation(employeeForm.getDesignation());
        }

        return employeeRepo.save(employee);
    }

    public EmployeeForm convertToEmployeeForm(Employee employee) {
        if (employee == null) {
            return null;
        }
        EmployeeForm employeeForm = new EmployeeForm();

        employeeForm.setEmployeeId(employee.getEmployeeId());
        employeeForm.setTeamName(
                employee.getTeamId() == null ? null : teamService.getTeamById(employee.getTeamId()).getTeamName());
        employeeForm.setName(employee.getName());
        employeeForm.setUsername(employee.getUsername());
        employeeForm.setPassword(employee.getPassword());
        employeeForm.setRole(employee.getRole());
        employeeForm.setDesignation(employee.getDesignation());

        return employeeForm;
    }

    public boolean isValidEmployeeName(String username) {
        return username != null && !username.trim().isEmpty();
    }
}

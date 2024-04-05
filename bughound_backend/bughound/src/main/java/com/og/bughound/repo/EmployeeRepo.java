package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.og.bughound.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    Employee findByUsername(String username);

    List<Employee> findByUsernameIgnoreCaseStartingWith(String username);

    List<Employee> findByTeamId(Long teamId);
}

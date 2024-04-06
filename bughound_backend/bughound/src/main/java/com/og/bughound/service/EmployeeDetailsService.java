package com.og.bughound.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.og.bughound.model.Employee;
import com.og.bughound.model.EmployeePrincipal;
import com.og.bughound.repo.EmployeeRepo;

@Service
public class EmployeeDetailsService implements UserDetailsService {
    private final EmployeeRepo employeeRepo;

    public EmployeeDetailsService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepo.findByUsername(username);
        if (employee == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new EmployeePrincipal(employee);
    }

}

package com.og.bughound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Employee\"")
public class Employee {

    @Id
    @Column(name = "\"Employee_ID\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @Column(name = "\"Team_ID\"")
    private Long teamId;

    @Column(name = "\"Name\"", length = 100)
    private String name;

    @Column(name = "\"Username\"", length = 100)
    private String username;

    @Column(name = "\"Password\"", length = 100)
    private String password;

    @Column(name = "\"Role\"", length = 100)
    private String role;

    @Column(name = "\"Designation\"", length = 100)
    private String designation;

    public Employee() {
    }

    public Employee(Long employeeId, Long teamId, String name, String username, String password, String role,
            String designation) {
        this.employeeId = employeeId;
        this.teamId = teamId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.designation = designation;
    }

    public Long getEmployeeId() {
        return this.employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getTeamId() {
        return this.teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    @Override
    public String toString() {
        return "{" +
                " employeeId='" + getEmployeeId() + "'" +
                ", teamId='" + getTeamId() + "'" +
                ", name='" + getName() + "'" +
                ", username='" + getUsername() + "'" +
                ", password='" + getPassword() + "'" +
                ", role='" + getRole() + "'" +
                ", designation='" + getDesignation() + "'" +
                "}";
    }

}

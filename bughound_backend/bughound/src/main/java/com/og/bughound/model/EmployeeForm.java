package com.og.bughound.model;

public class EmployeeForm {

    private Long EmployeeId;
    private String teamName;
    private String name;
    private String username;
    private String password;
    private String role;
    private String designation;

    public EmployeeForm() {
    }

    public EmployeeForm(Long EmployeeId, String teamName, String name, String username, String password, String role,
            String designation) {
        this.EmployeeId = EmployeeId;
        this.teamName = teamName;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.designation = designation;
    }

    public Long getEmployeeId() {
        return this.EmployeeId;
    }

    public void setEmployeeId(Long EmployeeId) {
        this.EmployeeId = EmployeeId;
    }

    public String getTeamName() {
        return this.teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
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
                " EmployeeId='" + getEmployeeId() + "'" +
                ", teamName='" + getTeamName() + "'" +
                ", name='" + getName() + "'" +
                ", username='" + getUsername() + "'" +
                ", password='" + getPassword() + "'" +
                ", role='" + getRole() + "'" +
                ", designation='" + getDesignation() + "'" +
                "}";
    }

}

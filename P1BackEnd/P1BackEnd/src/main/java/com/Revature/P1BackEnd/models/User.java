package com.Revature.P1BackEnd.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Table(name = "users")
@Component
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false, unique = true, columnDefinition = "text check (length(username) > 5)")
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "text default 'user'")
    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reimbursement> reimbursements;

    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public User(int userId, String username, String password, String role, List<Reimbursement> reimbursements) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.reimbursements = reimbursements;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Reimbursement> getReimbursements() {
        return reimbursements;
    }

    public void setReimbursements(List<Reimbursement> reimbursements) {
        this.reimbursements = reimbursements;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", reimbursements=" + reimbursements +
                '}';
    }
}

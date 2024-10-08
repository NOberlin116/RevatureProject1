package com.Revature.P1BackEnd.controllers;


import com.Revature.P1BackEnd.models.DTOs.IncomingReimbDTO;
import com.Revature.P1BackEnd.models.Reimbursement;
import com.Revature.P1BackEnd.models.User;
import com.Revature.P1BackEnd.services.ReimbService;
import com.Revature.P1BackEnd.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbs")
@CrossOrigin
public class ReimbController {

    private ReimbService rs;
    private UserService us;

    @Autowired
    public ReimbController(ReimbService rs, UserService us) {
        this.rs = rs;
        this.us = us;
    }

    @PostMapping
    public ResponseEntity<Object> addReimbursement(@RequestBody IncomingReimbDTO newReimb) {
        Reimbursement r = rs.addReimbursement(newReimb);

        if (r == null) {
            return ResponseEntity.status(400).body("Could not find User with ID: " + newReimb.getUserId());
        }
        return ResponseEntity.status(201).body(r);
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(rs.getALlReimbursements());
    }

    @DeleteMapping("/{reimbId}")
    public ResponseEntity<Object> deleteReimbById(@PathVariable int reimbId) {
        //TODO: wrap in try/catch assuming service throws exceptions

        rs.deleteReimbursementById(reimbId);
        return ResponseEntity.ok("Reimbursement with ID: " + reimbId + " was deleted.");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(rs.getReimbursementsByUserId(userId));
    }

    @PutMapping("/{reimbId}/status")
    public ResponseEntity<Reimbursement> updateReimbursementStatus (
            @PathVariable int reimbId,
            @RequestParam String status
    ) {
        Reimbursement reimb = rs.updateReimbStatus(reimbId, status);
        if (reimb != null) {
            return ResponseEntity.ok(reimb);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/reimbs")
    public List<Reimbursement> getReimbursements(@RequestParam String status, @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return rs.getReimbursementsByUserIdAndStatus(userId, status);
        } else {
            return rs.getAllReimbursementsByStatus(status);
        }
    }

}

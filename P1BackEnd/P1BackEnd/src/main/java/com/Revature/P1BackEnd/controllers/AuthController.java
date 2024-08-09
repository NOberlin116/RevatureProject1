package com.Revature.P1BackEnd.controllers;

import com.Revature.P1BackEnd.models.DTOs.LoginDTO;
import com.Revature.P1BackEnd.models.DTOs.OutgoingUserDTO;
import com.Revature.P1BackEnd.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private AuthService as;

    @Autowired
    public AuthController(AuthService as) {
        this.as = as;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDTO lDTO, HttpSession session) {
        OutgoingUserDTO outUser = as.login(lDTO, session);

        if (outUser == null) {
            return ResponseEntity.status(401).body("Invalid Login Credentials! Try Again");
        }
        return ResponseEntity.accepted().body(outUser);
    }

}

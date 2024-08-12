package com.Revature.P1BackEnd.controllers;

import com.Revature.P1BackEnd.models.User;
import com.Revature.P1BackEnd.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private UserService us;

    @Autowired
    public UserController(UserService us) {
        this.us = us;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User newUser){

        //TODO: try/catch based on service method exception throws

        User u = us.registerUser(newUser);

        return ResponseEntity.status(201).body(u);

    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        //TODO: have this send back an outgoingUserDTO instead, so password isn't sent.


        List<User> users = us.getAllUsers();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(us.getUserByUsername(username));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Object> updateUsername(@RequestBody String username, @PathVariable int userId){

        User updatedUser = us.updateUser(username, userId);

        if(updatedUser == null){
            return ResponseEntity.status(400).body("User not found with ID: " + userId);
        } else {
            return ResponseEntity.ok(updatedUser);
        }

    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable int userId) {
        us.deleteUserAndReimbs(userId);
    }
}

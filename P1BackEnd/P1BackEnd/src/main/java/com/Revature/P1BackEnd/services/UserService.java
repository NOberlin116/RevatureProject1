package com.Revature.P1BackEnd.services;

import com.Revature.P1BackEnd.DAOs.ReimbDAO;
import com.Revature.P1BackEnd.DAOs.UserDAO;
import com.Revature.P1BackEnd.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private ReimbDAO rDAO;
    private ReimbService rs;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User registerUser(User newUser) {
        //TODO: error handling
        User u = userDAO.save(newUser);     //.save() allows us to insert into DB
        return u;
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public User getUserByUsername(String username) {
        //TODO: error handling for user not found, blank username, etc.
        return userDAO.findByUsername(username);
    }

    public User updateUser(String newUsername, int userId) {
        //TODO: error handling, check valid inputs
        Optional<User> existingUser = userDAO.findById(userId);

        if (existingUser.isPresent()) {
            User u = existingUser.get();
            u.setUsername(newUsername);
            return userDAO.save(u);     //can also use .save() to update DB
        }
        else {
            //TODO: probably throw an exception
            return null;
        }
    }
    @Transactional
    public void deleteUserAndReimbs(int userId) {
        rDAO.deleteByUserUserId(userId);
        userDAO.deleteById(userId);
    }
}

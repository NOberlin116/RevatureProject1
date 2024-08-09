package com.Revature.P1BackEnd.services;

import com.Revature.P1BackEnd.DAOs.AuthDAO;
import com.Revature.P1BackEnd.models.DTOs.LoginDTO;
import com.Revature.P1BackEnd.models.DTOs.OutgoingUserDTO;
import com.Revature.P1BackEnd.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private AuthDAO aDAO;

    @Autowired
    public AuthService(AuthDAO aDAO) {
        this.aDAO = aDAO;
    }

    public OutgoingUserDTO login(LoginDTO lDTO, HttpSession session){

        User u = aDAO.findByUsernameAndPassword(lDTO.getUsername(), lDTO.getPassword());

        if (u == null){
            return null;
            //TODO: exception would be better
        }
        else {

            OutgoingUserDTO outUser = new OutgoingUserDTO(u.getUserId(), u.getUsername(), u.getRole());

            //initializes http session and sets attribute values
            session.setAttribute("userId", u.getUserId());
            session.setAttribute("username", u.getUsername());
            session.setAttribute("role", u.getRole());
            //store values to uniquely identify the user in the backend and verify user's role

            return outUser;
        }

    }

}

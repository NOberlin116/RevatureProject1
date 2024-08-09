package com.Revature.P1BackEnd.DAOs;

import com.Revature.P1BackEnd.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDAO extends JpaRepository<User, Integer> {

    //Just needed for login, to verify login creds are valid check for username = ? and password = ?
    public User findByUsernameAndPassword(String username, String password);

}

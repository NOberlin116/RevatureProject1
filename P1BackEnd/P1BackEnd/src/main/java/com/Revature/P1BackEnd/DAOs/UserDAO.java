package com.Revature.P1BackEnd.DAOs;

import com.Revature.P1BackEnd.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {

    //spring data can implement this for us, just need to define the abstract
    //named "findByXyz" and spring does the rest.
    public User findByUsername(String username);

}

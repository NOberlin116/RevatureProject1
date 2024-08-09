package com.Revature.P1BackEnd.DAOs;

import com.Revature.P1BackEnd.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbDAO extends JpaRepository<Reimbursement, Integer> {

    //finds all reimbs by user id, named as such for spring data
    public List<Reimbursement> findByUserUserId(int userId);

}

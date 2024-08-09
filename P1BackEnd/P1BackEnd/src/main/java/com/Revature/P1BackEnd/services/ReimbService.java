package com.Revature.P1BackEnd.services;

import com.Revature.P1BackEnd.DAOs.ReimbDAO;
import com.Revature.P1BackEnd.DAOs.UserDAO;
import com.Revature.P1BackEnd.models.DTOs.IncomingReimbDTO;
import com.Revature.P1BackEnd.models.Reimbursement;
import com.Revature.P1BackEnd.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbService {

    private ReimbDAO rDAO;
    private UserDAO uDAO;

    @Autowired
    public ReimbService(ReimbDAO rDAO, UserDAO uDAO) {
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }

    public Reimbursement addReimbursement(IncomingReimbDTO newReimb) {

        //TODO: error handling

        //0 for reimbId since its generated, and null for userId and add it next
        Reimbursement reimb = new Reimbursement(0, newReimb.getDescription(), newReimb.getAmount(),
                                                newReimb.getStatus(), null);
        Optional<User> u = uDAO.findById(newReimb.getUserId());

        if (u.isPresent()) {
            reimb.setUser(u.get());
            Reimbursement r = rDAO.save(reimb);
            return r;
        }
        else {
            return null;
        }
    }

    public List<Reimbursement> getALlReimbursements() {
        return rDAO.findAll();
    }

    public void deleteReimbursementById(int id) {
        Reimbursement reimbursement = rDAO.findById(id).get();
        reimbursement.getUser().getReimbursements().remove(reimbursement);
        rDAO.deleteById(id);
    }

    public List<Reimbursement> getReimbursementsByUserId(int userId) {
        //TODO: error handling, valid inputs, etc.
        return rDAO.findByUserUserId(userId);
    }

    //from P1DemoBackend
    //Example method using @Transactional - for when you need a method to run as a SQL transaction

//    @Transactional
//    public Car tradeCar(int x int y int z){
//
//        dao.updatecar
//
//        dao.updatecarsomeotherway
//
//        dao.sendcarsomewhereelse
//
//        dao.deletecar
//
//        dao.savenewcar //What if this fails here? Without @Transactional, you'd lose a car for nothing
//
//    }

}

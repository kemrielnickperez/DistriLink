package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.repositories.DealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DealerService {

    @Autowired
    DealerRepository dealerRepository;

    public Dealer registerDealer(Dealer dealer){

        return dealerRepository.save(dealer);
    }

    public List<Dealer> getAllDealers(){

        return dealerRepository.findAll();
    }

    /*public Optional<Dealer> getDealerByID(int dealerid){
        return dealerRepository.findById(dealerid);
    }*/
    public Optional<Dealer> getDealerByID(String dealerid){

        return dealerRepository.findById(dealerid);
    }
}

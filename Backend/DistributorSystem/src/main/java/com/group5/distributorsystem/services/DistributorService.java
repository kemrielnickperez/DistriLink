package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.repositories.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistributorService {

    @Autowired
    DistributorRepository distributorRepository;

    public Distributor registerDistributor(Distributor distributor){

        return distributorRepository.save(distributor);
    }

    public List<Distributor> getAllDistributors (){
        return  distributorRepository.findAll();
    }


    public Distributor getDistributorByID(String distributorid){
        return distributorRepository.findById(distributorid).get();
    }
}

package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.ArchivedDealer;
import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.repositories.ArchivedDealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArchivedDealerService {

    @Autowired
    ArchivedDealerRepository archivedDealerRepository;

    public List<ArchivedDealer> getAllArchivedDealer(){
        return archivedDealerRepository.findAll();
    }

    public List<Dealer> getAllArchivedDealersByDistributorID(String distributorid) {
        return archivedDealerRepository.findAllByDistributor_Distributorid(distributorid);
    }
}

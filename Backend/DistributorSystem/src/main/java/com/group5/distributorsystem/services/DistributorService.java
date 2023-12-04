package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.models.DistributorDocument;
import com.group5.distributorsystem.repositories.DistributorDocumentRepository;
import com.group5.distributorsystem.repositories.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DistributorService {

    @Autowired
    DistributorRepository distributorRepository;

    @Autowired
    DistributorDocumentRepository distributorDocumentRepository;


    public Distributor registerDistributor(Distributor distributor, List<String> documentIds, List<String> documentNames, List<String> documentTypes, List<MultipartFile> documentContents) {


        Distributor updatedDistributor = distributorRepository.save(distributor);


        for (int i = 0; i < documentIds.size(); i++) {
            DistributorDocument document = new DistributorDocument();
            document.setDocumentid(documentIds.get(i));
            document.setName(documentNames.get(i));
            document.setType(documentTypes.get(i));
            document.setDistributor(updatedDistributor);
            try {
                document.setContent(documentContents.get(i).getBytes());
            } catch (IOException e) {
                // Handle the exception (e.g., log an error).
                System.err.println("Error reading file bytes for attachment: " + document.getName());
                e.printStackTrace();
                continue;
            }
            updatedDistributor.getDocumentids().add(document.getDocumentid());
            distributorDocumentRepository.save(document);

        }


        return distributorRepository.save(updatedDistributor);
    }

    /* public Distributor registerDistributor(Distributor distributor){

        return distributorRepository.save(distributor);
    }
*/
    public List<Distributor> getAllDistributors (){
        return  distributorRepository.findAll();
    }


    public Distributor getDistributorByID(String distributorid){
        return distributorRepository.findById(distributorid).get();
    }
}

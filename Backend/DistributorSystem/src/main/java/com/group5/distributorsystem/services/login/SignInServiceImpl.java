package com.group5.distributorsystem.services.login;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.repositories.DealerRepository;
import com.group5.distributorsystem.repositories.DistributorRepository;
import com.group5.distributorsystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SignInServiceImpl implements SignInService{

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DistributorRepository distributorRepository;

    @Override
    public Map<String, Object> findEntityInfoById(String userId){
        Map<String, Object> result = new HashMap<>();

        Dealer dealer = (Dealer) dealerRepository.findById(userId).orElse(null);
        Employee employee = (Employee) employeeRepository.findById(userId).orElse(null);

        if(dealer != null){
            result.put("userId", dealer.getDealerid());
            result.put("tableName", "Dealer");
        } else if (employee != null) {
            result.put("userId", employee.getEmployeeid());
            result.put("tableName", "Employee");
        } else {
            result.put("userId", null);
            result.put("tableName", "Error");
        }

        return result;
    }


    @Override
    public Map<String, Object> findEntityInfoById(Map<String, String> loginData) {
        Map<String, Object> result = new HashMap<>();

        String userId = loginData.get("userId");
        String password = loginData.get("password");


        Distributor distributor = distributorRepository.findById(userId).orElse(null);
        Dealer dealer = dealerRepository.findById(userId).orElse(null);
        Employee employee = employeeRepository.findById(userId).orElse(null);

        if (dealer != null && dealer.getPassword().equals(password) && dealer.getConfirmed().equals(true)) {
            result.put("userId", dealer.getDealerid());
            result.put("tableName", "Dealer");
        } else if (distributor != null && distributor.getPassword().equals(password)) {
            result.put("userId", distributor.getDistributorid());
            result.put("tableName", "Distributor");
        } else if (employee != null && employee.getPassword().equals(password)) {
            if (employee.isIs_salesassociate()==true){
                result.put("userId", employee.getEmployeeid());
                result.put("tableName", "Sales Associate");
            } else if(employee.isIs_cashier()==true){
                result.put("userId", employee.getEmployeeid());
                result.put("tableName", "Cashier");
            }
        } else {
            result.put("userId", null);
            result.put("tableName", "Error");
        }

        return result;
    }
}

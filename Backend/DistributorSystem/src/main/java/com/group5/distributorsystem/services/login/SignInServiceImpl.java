package com.group5.distributorsystem.services.login;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.repositories.DealerRepository;
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

        Dealer dealer = dealerRepository.findById(userId).orElse(null);
        Employee employee = employeeRepository.findById(userId).orElse(null);

        if (dealer != null && dealer.getPassword().equals(password) && dealer.getConfirmed().equals(true)) {
            result.put("userId", dealer.getDealerid());
            result.put("tableName", "Dealer");
        } else if (employee != null && employee.getPassword().equals(password)) {
            result.put("userId", employee.getEmployeeid());
            result.put("tableName", "Employee");
        } else {
            result.put("userId", null);
            result.put("tableName", "Error");
        }

        return result;
    }
}

package com.group5.distributorsystem.services.login;

import java.util.Map;

public interface SignInService {
    Map<String, Object> findEntityInfoById(String userId);

    Map<String, Object> findEntityInfoById(Map<String, String> loginData);

}


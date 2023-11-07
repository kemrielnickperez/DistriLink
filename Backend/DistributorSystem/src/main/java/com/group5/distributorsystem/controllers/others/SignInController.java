package com.group5.distributorsystem.controllers.others;

import com.group5.distributorsystem.services.login.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/signin")
public class SignInController {

    @Autowired
    private SignInService signInService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> findEntityInfo(@RequestBody Map<String, String> userIdMap){
        try {
            String userId = userIdMap.get("userId");
            Map<String, Object> result = signInService.findEntityInfoById(userId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> findEntityInfoLogin(@RequestBody Map<String, String> loginData) {
        try {
            Map<String, Object> result = signInService.findEntityInfoById(loginData);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

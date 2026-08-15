package com.finance.smartFinancialTracker.controller;

import com.finance.smartFinancialTracker.dto.*;
import com.finance.smartFinancialTracker.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController{
    private AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/signUp")
    public SignUpResponse signUp(@RequestBody SignUpRequest request){
        return authService.signUp(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        ResponseEntity<LoginResponse> ok = ResponseEntity.ok(new LoginResponse(token));
        return ok;
    }

}

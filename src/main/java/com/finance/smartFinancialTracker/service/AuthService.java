package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.SignUpRequest;
import com.finance.smartFinancialTracker.dto.SignUpResponse;


public interface AuthService {
    String login(String email, String password);
    SignUpResponse signUp(SignUpRequest request);
}

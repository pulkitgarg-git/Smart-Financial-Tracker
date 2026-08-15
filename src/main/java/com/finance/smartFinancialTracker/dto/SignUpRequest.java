package com.finance.smartFinancialTracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    String fullName;
    String email;
    String password;

}

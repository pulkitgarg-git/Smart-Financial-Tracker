package com.finance.smartFinancialTracker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpResponse {
    private Long id;
    private String fullName;
    private String email;
}


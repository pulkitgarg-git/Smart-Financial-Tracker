package com.finance.smartFinancialTracker.utility;

import org.springframework.security.core.context.SecurityContextHolder;

public class GetCurrentEmail {
    public String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
}


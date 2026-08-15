package com.finance.smartFinancialTracker.dto;

import com.finance.smartFinancialTracker.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
        BigDecimal amount,
        String category,
        String description,
        LocalDate date,
        TransactionType type
) {}
package com.finance.smartFinancialTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategorySummaryResponse {
    private String category;
    private BigDecimal amount;
}

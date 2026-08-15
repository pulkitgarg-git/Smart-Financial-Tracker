package com.finance.smartFinancialTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MonthlySummaryResponse {
    private int year;
    private int month;
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;
}

package com.finance.smartFinancialTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionSummaryResponse {
    private double totalIncome;
    private double totalExpense;
    private double balance;
}

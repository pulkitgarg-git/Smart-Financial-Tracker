package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.CategorySummaryResponse;
import com.finance.smartFinancialTracker.dto.MonthlySummaryResponse;
import com.finance.smartFinancialTracker.dto.TransactionSummaryResponse;
import com.finance.smartFinancialTracker.enums.TransactionType;

import java.time.LocalDate;
import java.util.List;

public interface TransactionSummaryService {

    TransactionSummaryResponse getSummary();

    TransactionSummaryResponse getSummary(LocalDate date);

    MonthlySummaryResponse getMonthlySummary(int year, int month);

    List<CategorySummaryResponse> getCategorySummaries(TransactionType type);
}

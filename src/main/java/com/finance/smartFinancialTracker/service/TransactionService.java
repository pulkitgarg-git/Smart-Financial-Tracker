package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.TransactionRequest;
import com.finance.smartFinancialTracker.dto.TransactionResponse;
import com.finance.smartFinancialTracker.enums.TransactionType;

import java.util.List;

public interface TransactionService{
    void addTransaction(TransactionRequest request);
    List<TransactionResponse> getTransactions(TransactionType type);
}

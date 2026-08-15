package com.finance.smartFinancialTracker.controller;

import com.finance.smartFinancialTracker.dto.TransactionRequest;
import com.finance.smartFinancialTracker.dto.TransactionResponse;
import com.finance.smartFinancialTracker.enums.TransactionType;
import com.finance.smartFinancialTracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;


    @PostMapping("/addTrans")
    public ResponseEntity<?> addTransaction(@RequestBody TransactionRequest request){
        transactionService.addTransaction(request);
        return ResponseEntity.ok("Transaction Added Successfully");
    }

    @GetMapping
    public List<TransactionResponse> getTransactions(@RequestParam(required = false) TransactionType type){
        return transactionService.getTransactions(type);
    }
}


package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.TransactionRequest;
import com.finance.smartFinancialTracker.dto.TransactionResponse;
import com.finance.smartFinancialTracker.entity.Transaction;
import com.finance.smartFinancialTracker.enums.TransactionType;
import com.finance.smartFinancialTracker.repository.TransactionRepository;
import com.finance.smartFinancialTracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.finance.smartFinancialTracker.entity.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Override
    public void addTransaction(TransactionRequest request){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User does not exists"));

        Transaction tx = new Transaction();
        tx.setAmount(request.amount());
        tx.setCategory(request.category());
        tx.setDescription(request.description());
        tx.setTransactionDate(request.date().atStartOfDay());
        tx.setType(request.type());
        tx.setUser(user);

        transactionRepository.save(tx);
    }

    @Override
    public List<TransactionResponse> getTransactions(TransactionType type){
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        List<Transaction> transactions;

        if(type!=null){
            transactions = transactionRepository.findByUser_EmailAndType(email,type);
        }else{
            transactions = transactionRepository.findByUser_Email(email);
        }

        return transactions.stream().map(tx -> TransactionResponse.builder()
                .id(tx.getId())
                .amount(tx.getAmount())
                .type(tx.getType())
                .category(tx.getCategory())
                .description(tx.getDescription())
                .date(tx.getTransactionDate())
                .build()
        ).toList();
    }
}

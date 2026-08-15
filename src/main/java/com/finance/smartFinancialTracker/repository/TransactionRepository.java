package com.finance.smartFinancialTracker.repository;

import com.finance.smartFinancialTracker.entity.Transaction;
import com.finance.smartFinancialTracker.entity.User;
import com.finance.smartFinancialTracker.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
//    List<Transaction> findByUserAndType(User user, TransactionType type);
    List<Transaction> findByUser_EmailAndType(String email, TransactionType type);
    List<Transaction> findByUser_Email(String email);

}

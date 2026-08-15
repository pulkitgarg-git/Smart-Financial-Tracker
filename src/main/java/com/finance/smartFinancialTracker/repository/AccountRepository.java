package com.finance.smartFinancialTracker.repository;

import com.finance.smartFinancialTracker.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
}

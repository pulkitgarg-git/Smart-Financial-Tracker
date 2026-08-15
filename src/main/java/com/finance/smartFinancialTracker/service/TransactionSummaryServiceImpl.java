package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.CategorySummaryResponse;
import com.finance.smartFinancialTracker.dto.MonthlySummaryResponse;
import com.finance.smartFinancialTracker.dto.TransactionSummaryResponse;
import com.finance.smartFinancialTracker.entity.User;
import com.finance.smartFinancialTracker.enums.TransactionType;
import com.finance.smartFinancialTracker.repository.TransactionSummaryRepository;
import com.finance.smartFinancialTracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionSummaryServiceImpl implements TransactionSummaryService {
    private final TransactionSummaryRepository summaryRepo;
    private final UserRepository userRepository;

    @Override
    public TransactionSummaryResponse getSummary() {
        User user = currentUser();
        double income = toDouble(summaryRepo.sumAmountByUserAndType(user.getId(), TransactionType.INCOME));
        double expense = toDouble(summaryRepo.sumAmountByUserAndType(user.getId(), TransactionType.EXPENSE));
        double balance = income - expense;
        return new TransactionSummaryResponse(income, expense, balance);
    }

    @Override
    public TransactionSummaryResponse getSummary(LocalDate date) {
        User user = currentUser();
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        double income = toDouble(summaryRepo.sumAmountByUserAndTypeForDateRange(
                user.getId(), TransactionType.INCOME, start, end));
        double expense = toDouble(summaryRepo.sumAmountByUserAndTypeForDateRange(
                user.getId(), TransactionType.EXPENSE, start, end));
        double balance = income - expense;
        return new TransactionSummaryResponse(income, expense, balance);
    }

    @Override
    public MonthlySummaryResponse getMonthlySummary(int year, int month) {
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException("month must be between 1 and 12");
        }
        User user = currentUser();
        LocalDate first = LocalDate.of(year, month, 1);
        LocalDateTime start = first.atStartOfDay();
        LocalDateTime end = first.plusMonths(1).atStartOfDay();
        BigDecimal income = summaryRepo.sumAmountByUserAndTypeForDateRange(
                user.getId(), TransactionType.INCOME, start, end);
        BigDecimal expense = summaryRepo.sumAmountByUserAndTypeForDateRange(
                user.getId(), TransactionType.EXPENSE, start, end);
        BigDecimal inc = income != null ? income : BigDecimal.ZERO;
        BigDecimal exp = expense != null ? expense : BigDecimal.ZERO;
        BigDecimal balance = inc.subtract(exp);
        return new MonthlySummaryResponse(year, month, inc, exp, balance);
    }

    @Override
    public List<CategorySummaryResponse> getCategorySummaries(TransactionType type) {
        User user = currentUser();
        return summaryRepo.sumByCategory(user.getId(), type).stream()
                .map(row -> {
                    String category = row[0] != null ? (String) row[0] : "Uncategorized";
                    BigDecimal amount = row[1] instanceof BigDecimal b ? b : BigDecimal.ZERO;
                    return new CategorySummaryResponse(category, amount);
                })
                .toList();
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private static double toDouble(BigDecimal value) {
        return value != null ? value.doubleValue() : 0d;
    }
}

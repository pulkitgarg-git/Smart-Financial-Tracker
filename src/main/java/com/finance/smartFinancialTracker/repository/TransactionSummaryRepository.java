package com.finance.smartFinancialTracker.repository;

import com.finance.smartFinancialTracker.entity.Transaction;
import com.finance.smartFinancialTracker.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;

public interface TransactionSummaryRepository extends JpaRepository<Transaction, Long> {
    @Query(
            "SELECT COALESCE(SUM(t.amount), 0) " +
                    "FROM Transaction t " +
                    "WHERE t.user.id = :userId " +
                    "AND t.type = :type"
    )
    BigDecimal sumAmountByUserAndType(@Param("userId") Long userId,
                                      @Param("type") TransactionType type);

    @Query(
            "SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
                    "WHERE t.user.id = :userId AND t.type = :type " +
                    "AND t.transactionDate >= :start AND t.transactionDate < :end"
    )
    BigDecimal sumAmountByUserAndTypeForDateRange(
            @Param("userId") Long userId,
            @Param("type") TransactionType type,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    @Query(
            "SELECT t.category, COALESCE(SUM(t.amount), 0) FROM Transaction t "
                    + "WHERE t.user.id = :userId AND t.type = :type GROUP BY t.category"
    )
    List<Object[]> sumByCategory(@Param("userId") Long userId, @Param("type") TransactionType type);

}

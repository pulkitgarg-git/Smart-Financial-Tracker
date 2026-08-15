package com.finance.smartFinancialTracker.dto;

import com.finance.smartFinancialTracker.enums.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private TransactionType type;
    private String category;
    private String description;
    private LocalDateTime date;
}

package com.finance.smartFinancialTracker.controller;

import com.finance.smartFinancialTracker.dto.CategorySummaryResponse;
import com.finance.smartFinancialTracker.dto.MonthlySummaryResponse;
import com.finance.smartFinancialTracker.dto.TransactionSummaryResponse;
import com.finance.smartFinancialTracker.enums.TransactionType;
import com.finance.smartFinancialTracker.service.TransactionSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions/summary")
@RequiredArgsConstructor
public class TransactionSummaryController {

    private final TransactionSummaryService transactionSummaryService;

    @GetMapping
    public TransactionSummaryResponse getSummary() {
        return transactionSummaryService.getSummary();
    }

    @GetMapping("/overall")
    public TransactionSummaryResponse getSummaryForDate(@RequestParam LocalDate date) {
        return transactionSummaryService.getSummary(date);
    }

    @GetMapping("/monthly")
    public MonthlySummaryResponse getMonthly(
            @RequestParam int year,
            @RequestParam int month) {
        return transactionSummaryService.getMonthlySummary(year, month);
    }

    @GetMapping("/categories")
    public List<CategorySummaryResponse> getCategories(
            @RequestParam TransactionType type) {
        return transactionSummaryService.getCategorySummaries(type);
    }
}

package com.finance.smartFinancialTracker;

import com.finance.smartFinancialTracker.config.DatabaseUrlInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartFinancialTrackerApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SmartFinancialTrackerApplication.class);
		app.addInitializers(new DatabaseUrlInitializer());
		app.run(args);
	}

}

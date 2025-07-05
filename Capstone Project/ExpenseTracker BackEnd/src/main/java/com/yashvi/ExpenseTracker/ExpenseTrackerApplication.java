package com.yashvi.ExpenseTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling // Required to enable scheduled tasks
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}

}

package com.group5.distributorsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DistributorSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DistributorSystemApplication.class, args);
	}

}

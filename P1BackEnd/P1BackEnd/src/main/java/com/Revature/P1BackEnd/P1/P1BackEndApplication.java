package com.Revature.P1BackEnd.P1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.Revature.P1BackEnd.models")
@ComponentScan("com.Revature.P1BackEnd")
@EnableJpaRepositories("com.Revature.P1BackEnd.DAOs")
public class P1BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(P1BackEndApplication.class, args);
	}

}

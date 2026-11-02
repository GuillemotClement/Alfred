package api.alfredapi.core.health.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.alfredapi.core.health.DTO.response.CheckHealthResponse;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;


@RestController 
@RequestMapping("/api/check-health")
@RequiredArgsConstructor 
public class HealthController {

  @GetMapping()
  public CheckHealthResponse checkHealth() {
    // TODO: create a service for handle format time retourned
    DateTimeFormatter formatter = 
      DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm:ss")
        .withZone(ZoneId.of("Europe/Paris"));

    String date = formatter.format(Instant.now());

    return new CheckHealthResponse(
      "Alfred API is running",
      date
    );
  }
  
}

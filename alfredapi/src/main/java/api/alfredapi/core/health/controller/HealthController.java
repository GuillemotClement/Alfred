package api.alfredapi.core.health.controller;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.alfredapi.core.health.dto.response.CheckHealthResponse;

@RestController
@RequestMapping("/api/check-health")
public class HealthController {

  @GetMapping()
  public CheckHealthResponse checkHealth() {
    // TODO: create a service for handle format time retourned
    DateTimeFormatter formatter = DateTimeFormatter
      .ofPattern("dd/MM/yyyy - HH:mm:ss")
      .withZone(ZoneId
        .of("Europe/Paris"));

    String date = formatter
      .format(Instant
        .now());

    return new CheckHealthResponse("Alfred API is running", date);
  }

}

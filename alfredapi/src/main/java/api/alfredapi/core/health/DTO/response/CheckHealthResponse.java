package api.alfredapi.core.health.DTO.response;

import java.time.Instant;

public record CheckHealthResponse(
  String message,
  String dateFr
) {
  
}

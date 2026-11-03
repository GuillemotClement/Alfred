package api.alfredapi.features.user.dto.response;

import java.time.Instant;

import api.alfredapi.features.user.entity.UserRole;

public record UserResponse(
  Long id,
  String email,
  String username,
  Instant createdAt,
  Instant updatedAt,
  UserRole role
) {

}

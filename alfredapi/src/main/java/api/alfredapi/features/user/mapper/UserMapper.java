package api.alfredapi.features.user.mapper;

import org.mapstruct.Mapper;

import api.alfredapi.features.user.dto.response.UserResponse;
import api.alfredapi.features.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
  // User toEntity(RegisterUserRequest request);
  UserResponse toResponse(User user);
}

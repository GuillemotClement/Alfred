package api.alfredapi.features.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import api.alfredapi.features.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  // Optional<User> findByEmail(String email);

  // Optional<User> findByUsername(String username);

  boolean existsByEmail(String email);

  boolean existsByUsername(String username);
}

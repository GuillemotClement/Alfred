package api.alfredapi.features.user.service;

import java.util.Locale;

import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import api.alfredapi.features.user.dto.request.RegisterUserRequest;
import api.alfredapi.features.user.entity.User;
import api.alfredapi.features.user.repository.UserRepository;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  private final CompromisedPasswordChecker compromisedPasswordChecker;

  @Transactional
  public User createUser(RegisterUserRequest request) {
    log
      .info("Création d'un nouvel utilisateur");

    // normalisation des données
    String normalizedEmail = request
      .email()
      .strip()
      .toLowerCase(Locale.ROOT);
    String normalizedUsername = request
      .username()
      .toLowerCase(Locale.ROOT);

    // check email and username
    if (userRepository
      .existsByEmail(normalizedEmail)) {
      throw new ValidationException("Email déjà utilisé");
    }

    if (userRepository
      .existsByUsername(normalizedUsername)) {
      throw new ValidationException("Nom d'utilisateur déjà utilisé");
    }

    // check if password is compromis
    if (compromisedPasswordChecker
      .check(request
        .password())
      .isCompromised()) {
      throw new ValidationException("Ce mot de passe figure dans une fuite de données. Choississez-en un autre.");
    }

    // hashing password
    String hashedPassword = passwordEncoder
      .encode(request
        .password());

    User user = new User();
    user
      .setEmail(normalizedEmail);
    user
      .setUsername(normalizedUsername);
    user
      .setHashedPassword(hashedPassword);

    User savedUser = userRepository
      .save(user);

    log
      .info("Utilisateur créer avec succès");
    return savedUser;
  }
}

package api.alfredapi.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.crypto.password.PasswordEncoder;

import api.alfredapi.features.user.dto.request.RegisterUserRequest;
import api.alfredapi.features.user.entity.User;
import api.alfredapi.features.user.entity.UserRole;
import api.alfredapi.features.user.repository.UserRepository;
import api.alfredapi.features.user.service.UserService;
import jakarta.validation.ValidationException;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
  @Mock
  private UserRepository userRepository;
  @Mock
  private PasswordEncoder passwordEncoder;
  @Mock
  private CompromisedPasswordChecker compromisedPasswordChecker;

  @InjectMocks
  private UserService userService;

  @Test
  void shouldCreateNewUser() {
    // ARRANGE
    // prepare la request recus par le service contenant les données utilisateur
    RegisterUserRequest request = new RegisterUserRequest("test@mail.com", "gizmo", "passwordesttropdark");

    // mock du resultat de l'encoder
    when(passwordEncoder
      .encode(request
        .password()))
          .thenReturn("passwordValid");

    // mock du résultat du check si le mot de passe est compromis
    when(compromisedPasswordChecker
      .check(request
        .password()))
          .thenReturn(new CompromisedPasswordDecision(false));

    // mock de l'appel au repository
    when(userRepository
      .save(any(User.class)))
        .thenAnswer(invocation -> invocation
          .getArgument(0));

    // ACT
    // appel de la méthode tester
    User result = userService
      .createUser(request);

    // ASSERT
    // récupère l'objet User que le service a transmis a save()
    ArgumentCaptor<User> captor = ArgumentCaptor
      .forClass(User.class);
    // permet de vérifier que l'appel a la methode a bien ete realiser, et recupere
    // l'argument recu
    verify(userRepository)
      .save(captor
        .capture());

    User userToSave = captor
      .getValue();

    assertEquals(request
      .email(), userToSave
        .getEmail());
    assertEquals(request
      .username(), userToSave
        .getUsername());
    assertEquals("passwordValid", userToSave
      .getHashedPassword());

    // attendu, recu
    assertEquals(UserRole.USER, userToSave
      .getRole());
    assertFalse(userToSave
      .getEmailVerified());
    assertTrue(userToSave
      .getIsEnabled());

    assertSame(userToSave, result);
  }

  @Test
  void shouldRejectAlreadyUsedEmail() {
    // ARRANGE
    // prepare la request recus par le service contenant les données utilisateur
    RegisterUserRequest request = new RegisterUserRequest("test@mail.com", "gizmo", "passwordesttropdark");

    when(userRepository
      .existsByEmail(request
        .email()))
          .thenReturn(true);

    // ACT + ASSERT
    ValidationException exception = assertThrows(ValidationException.class, () -> userService
      .createUser(request));

    assertEquals("Email déjà utilisé", exception
      .getMessage());

    verify(userRepository, never())
      .save(any(User.class));
  }

  @Test
  void shouldRejectAlreadyUsedUsername() {
    // ARRANGE
    // prepare la request recus par le service contenant les données utilisateur
    RegisterUserRequest request = new RegisterUserRequest("test@mail.com", "gizmo", "passwordesttropdark");

    when(userRepository
      .existsByUsername(request
        .username()))
          .thenReturn(true);

    // ACT + ASSERT
    ValidationException exception = assertThrows(ValidationException.class, () -> userService
      .createUser(request));

    assertEquals("Nom d'utilisateur déjà utilisé", exception
      .getMessage());

    verify(userRepository, never())
      .save(any(User.class));
  }

  @Test
  void shouldRejectCompromisedPassword() {
    // ARRANGE
    // prepare la request recus par le service contenant les données utilisateur
    RegisterUserRequest request = new RegisterUserRequest("test@mail.com", "gizmo", "passwordesttropdark");

    when(compromisedPasswordChecker
      .check(request
        .password()))
          .thenReturn(new CompromisedPasswordDecision(true));

    // ACT + ASSERT
    ValidationException exception = assertThrows(ValidationException.class, () -> userService
      .createUser(request));

    assertEquals("Ce mot de passe figure dans une fuite de données. Choississez-en un autre.", exception
      .getMessage());

    verify(userRepository, never())
      .save(any(User.class));
  }

  @Test
  void usernameAndEmailShouldBeNormalize() {
    RegisterUserRequest request = new RegisterUserRequest("  MaSuperAdresse@mail.com  ", "GiZmo",
      "passwordesttropdark");

    String normalizedEmail = "masuperadresse@mail.com";
    String normalizedUsername = "gizmo";

    // mock du résultat du check si le mot de passe est compromis
    when(compromisedPasswordChecker
      .check(request
        .password()))
          .thenReturn(new CompromisedPasswordDecision(false));

    // ACT
    // appel de la méthode tester
    userService
      .createUser(request);

    // ASSERT
    // récupère l'objet User que le service a transmis a save()
    ArgumentCaptor<User> captor = ArgumentCaptor
      .forClass(User.class);
    // permet de vérifier que l'appel a la methode a bien ete realiser, et recupere
    // l'argument recu
    verify(userRepository)
      .save(captor
        .capture());

    // test qu'on fait les checks email et username avec les valeurs normaliser
    verify(userRepository)
      .existsByEmail(normalizedEmail);
    verify(userRepository)
      .existsByUsername(normalizedUsername);

    User userToSave = captor
      .getValue();

    assertEquals(normalizedEmail, userToSave
      .getEmail());
    assertEquals(normalizedUsername, userToSave
      .getUsername());
  }
}

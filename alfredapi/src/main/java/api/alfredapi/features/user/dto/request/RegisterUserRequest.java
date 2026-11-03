package api.alfredapi.features.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterUserRequest(
  @NotBlank(message = "Un email est obligatoire")
  @Email(message = "Un email valide est obligatoire")
  @Size(
    min = 2,
    max = 254,
    message = "L'email doit faire entre {min} et {max} caractères"
  )
  String email,

  @NotBlank(message = "Un nom d'utilisateur est obligatoire")
  @Size(
    min = 3,
    max = 30,
    message = "Le nom d'utilisateur doit être compris entre {min} et {max} caractères"
  )
  @Pattern(
    regexp = "^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$",
    message = "Uniquement a à z, ou chiffres, tirets ou underscores, avec une lettre ou un chiffre au début et à la fin"
  )
  String username,

  @NotBlank(message = "Un mot de passe est obligatoire")
  @Size(
    min = 15,
    max = 128,
    message = "Le mot de passe doit être compris entre {min} et {max} caractères"
  )
  String password
) {

}

package api.alfredapi.features.user.entity;

import api.alfredapi.core.persistence.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// auditableEntity permet d'automatiser la creation du champ id, createdAt et
// updatedAt
public class User extends AuditableEntity {
  @Column(nullable = false, unique = true, length = 254)
  private String email;

  @Column(nullable = false, unique = true, length = 30)
  private String username;

  @Column(nullable = false, length = 255, name = "hashed_password")
  private String hashedPassword;

  @Column(nullable = false, name = "email_verified")
  private Boolean emailVerified = false;

  @Column(nullable = false, name = "is_enabled")
  private Boolean isEnabled = true;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserRole role = UserRole.USER;
}

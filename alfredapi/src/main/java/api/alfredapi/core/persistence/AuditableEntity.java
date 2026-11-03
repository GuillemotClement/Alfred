package api.alfredapi.core.persistence;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;

@Getter
@MappedSuperclass
public abstract class AuditableEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @PrePersist // Appelé avant l'insertion
  protected void onCreate() {
    Instant now = Instant
      .now();

    createdAt = now;
    updatedAt = now;
  }

  @PreUpdate // Appelé avant la mise à jour
  protected void onUpdate() {
    updatedAt = Instant
      .now();
  }
}

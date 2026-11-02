# Instructions backend

Appliquer les instructions du `AGENTS.md` racine. Le développeur reste responsable de l'implémentation ; ne pas modifier le code sans demande explicite.

Avant de conseiller, revoir ou modifier le backend, lire les [conventions d'architecture validées](../.doc/architecture/backend.md), référence pour ces choix.

- Organiser le code dans `features/<domaine>`, avec les couches internes décrites dans la référence ; créer les packages au besoin, en minuscules.
- Un domaine peut regrouper plusieurs entités liées au même métier, comme `Article` et `ArticleCategory`.
- Réserver `core` aux préoccupations techniques transversales identifiées.
- Faire communiquer les domaines par des points d'entrée explicites, sans accès direct aux repositories d'un autre domaine.
- Laisser Flyway gérer le schéma et conserver Hibernate en `ddl-auto: validate`.
- Placer les migrations dans `src/main/resources/db/migration/`, sous la forme `V{x}__{feature_action}.sql`, avec une numérotation globale.
- Ne pas modifier une migration déjà appliquée dans un environnement partagé ; ajouter une nouvelle migration.
- Ne pas présenter le découpage comme une implémentation complète du DDD. La place précise des règles métier et les agrégats restent à définir avec le développeur.

Versions déclarées dans `pom.xml` au 2 novembre 2026 : Java 25 et Spring Boot 4.1.2. PostgreSQL et Adminer sont déclarés dans le Compose racine. Vérifier les fichiers actuels avant tout conseil ; ces déclarations ne prouvent pas les versions installées ni le bon fonctionnement de l'application.

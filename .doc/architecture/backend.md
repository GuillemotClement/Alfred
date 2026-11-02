# Architecture du backend

Statut : choix validés avec le développeur le 2 novembre 2026.

## Organisation par domaine

Le backend est situé dans `alfredapi/`. Il suit une architecture par domaine métier avec des couches internes, compatible avec une démarche DDD. Ce découpage ne constitue pas à lui seul une implémentation complète du DDD.

Sous le package racine Java, l'organisation cible est :

```text
features/
  article/
    controller/
    service/
    repository/
    entity/
    mapper/
    dto/
      request/
      response/
core/
```

Les packages Java sont en minuscules et créés au besoin. Cette arborescence décrit une convention cible, pas des fonctionnalités déjà implémentées.

Un domaine peut contenir plusieurs entités : `Article` et `ArticleCategory` peuvent appartenir à `article`. Une table ne nécessite pas un domaine distinct. Être dans le même domaine ne signifie pas former un seul agrégat DDD.

## Responsabilités

| Package | Responsabilité |
| --- | --- |
| `controller` | Recevoir les requêtes HTTP, déclencher la validation et retourner les réponses |
| `dto/request` | Définir les données reçues par l'API |
| `dto/response` | Définir les données retournées par l'API |
| `mapper` | Convertir les représentations sans porter de règles métier |
| `service` | Orchestrer les cas d'utilisation et délimiter les transactions |
| `entity` | Représenter les entités persistées ; leur comportement métier sera précisé selon les cas d'utilisation |
| `repository` | Accéder aux données du domaine |
| `core` | Regrouper les préoccupations techniques transversales identifiées, par exemple la configuration et la gestion commune des erreurs |

Les domaines communiquent par des points d'entrée explicites, sans accès direct aux repositories des autres domaines. `core` ne doit pas devenir un dossier générique pour toute logique partagée ni accueillir par défaut les règles métier.

La répartition précise des règles métier entre entités et services, ainsi que les frontières des agrégats, reste à définir au fil des premiers cas d'utilisation. Aucune séparation systématique entre modèle métier et modèle JPA n'est décidée à ce stade.

## Migrations et persistance

- Flyway est responsable de la création et de l'évolution du schéma.
- Les migrations SQL sont dans `alfredapi/src/main/resources/db/migration/`.
- Convention : `V{x}__{feature_action}.sql`, avec deux underscores après la version.
- La numérotation est globale à toute la base, pas propre à chaque domaine.
- Exemples : `V1__article_create_table.sql`, `V2__article_add_category.sql`.
- Une migration déjà appliquée dans un environnement partagé est conservée ; une évolution passe par une nouvelle migration.
- Hibernate utilise `spring.jpa.hibernate.ddl-auto: validate` pour vérifier la correspondance avec les entités sans modifier le schéma.

## Instructions pour les agents

Les consignes spécifiques sont dans [alfredapi/AGENTS.md](../../alfredapi/AGENTS.md). Toute évolution de ces décisions doit être discutée avec le développeur avant leur modification.

[Retour au README](../../README.md)

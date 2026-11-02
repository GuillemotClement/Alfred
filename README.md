# Alfred

Alfred est un projet d’application de gestion de foyer, développé avant tout dans un objectif éducatif : apprendre Angular et Spring Boot en construisant progressivement une application complète.

Le projet sert également à apprendre à travailler avec des agents IA : clarifier un besoin, réfléchir à une architecture, comprendre des concepts, analyser du code et préparer des revues. Le développeur reste responsable de l’implémentation et des décisions ; les agents l’accompagnent pour développer son raisonnement et son autonomie.

## But du projet

Alfred a pour ambition de centraliser l’organisation et le suivi du quotidien d’un foyer dans une même application.

Le **foyer est l’élément central** : il peut rassembler plusieurs utilisateurs et regrouper leurs informations communes. Selon les besoins, les éléments pourront être rattachés à un foyer ou à un utilisateur pour un usage personnel. La manière de rejoindre un foyer reste à définir.

### Usages envisagés

Ces objectifs décrivent la direction du projet ; ils ne constituent pas une liste de fonctionnalités déjà disponibles.

- **Articles du foyer** : inventorier les biens, suivre leur prix d’achat et, lorsqu’ils sont mis en vente, leur prix de vente.
- **Événements** : suivre les événements prévus pour le foyer.
- **Dépenses** : suivre les dépenses du quotidien.
- **Véhicules** : centraliser leur suivi.
- **Projets et budgets** : suivre les projets et le budget associé à chacun.
- **Stocks alimentaires** : connaître les aliments disponibles dans le foyer.
- **Cuisine et menus** : organiser la cuisine et générer des menus en fonction des périodes de l’année, en tenant compte des légumes de saison.
- **Jardin** : aider à choisir les légumes à planter et les périodes adaptées selon la localisation du foyer.

Le périmètre et les règles de chaque domaine seront précisés progressivement au fil de l’apprentissage et du développement.

## Technologies

### Frontend présent dans le dépôt

Les versions ci-dessous sont celles déclarées dans `front/package.json`.

| Technologie        | Version déclarée | Usage                                            |
| ------------------ | ---------------- | ------------------------------------------------ |
| Angular            | ^22.1.0          | Interface utilisateur, composants et routage     |
| TypeScript         | ~6.0.2           | Langage du frontend                              |
| Signals et RxJS    | RxJS ~7.8.0      | Réactivité et gestion des flux asynchrones       |
| Tailwind CSS       | ^4.1.12          | Mise en forme de l’interface                     |
| daisyUI            | ^5.7.50          | Composants CSS                                   |
| Lucide             | ^1.66.0          | Icônes                                           |
| Vitest             | ^4.0.8           | Tests unitaires via Angular CLI                  |
| ESLint et Prettier | —                | Analyse statique et formatage                    |
| pnpm               | 11.21.0          | Gestion des dépendances et lancement des scripts |

GitHub Actions vérifie actuellement le formatage, le lint et la compilation du frontend avec Node.js 24. Les tests sont configurés dans le projet, mais ne sont pas encore exécutés par ce workflow.

### Backend

Le backend est présent dans `alfredapi/`. Son `pom.xml` déclare **Java 25** et **Spring Boot 4.1.2**, avec Spring MVC, Spring Data JPA, Spring Security et Flyway. Ces versions déclarées ne prouvent pas les versions installées ni le bon fonctionnement de l’application.

Les conventions d’architecture validées sont les suivantes :

- Organisation par domaine métier dans `features/<domaine>`, avec plusieurs entités possibles dans un domaine, par exemple `Article` et `ArticleCategory` dans `article`.
- Couches internes créées au besoin : `controller`, `service`, `repository`, `entity`, `mapper`, `dto/request` et `dto/response` ; packages Java en minuscules.
- `core` réservé aux préoccupations techniques transversales ; échanges entre domaines par des points d’entrée explicites, sans accès direct aux repositories des autres domaines.
- Architecture par domaine avec des couches internes, compatible avec une démarche DDD ; les règles métier et les agrégats seront précisés selon les cas d’utilisation.
- Schéma géré par Flyway, Hibernate en `ddl-auto: validate`. Migrations dans `alfredapi/src/main/resources/db/migration/`, nommées `V{x}__{feature_action}.sql`, avec une numérotation globale. Une migration déjà appliquée dans un environnement partagé évolue par une nouvelle migration.

Voir les [choix d’architecture détaillés](.doc/architecture/backend.md) et les [instructions pour les agents du backend](alfredapi/AGENTS.md).

### Base de données

| Technologie  | Version déclarée | Usage                                  |
| ------------ | ---------------- | -------------------------------------- |
| `PostgreSQL` | `18.6 Alpine`    | Stockage des données                   |
| `Adminer`    | `6.2.0`          | Administration de la base de données |

---

## Commandes

### Docker

Prérequis : Docker installé avec Docker Compose v2 (`docker compose version`), moteur Docker démarré avec prise en charge des conteneurs Linux, ports `5432` et `8080` disponibles. Les commandes suivantes sont lancées depuis la racine du projet.

```shell
# Démarrer PostgreSQL et Adminer en arrière-plan
docker compose up -d

# Arrêter et supprimer les conteneurs, en conservant les données
docker compose down

# Supprimer les conteneurs ET définitivement toutes les données du volume
docker compose down -v
```

Le démarrage télécharge les images si nécessaire. Attendre que PostgreSQL soit prêt avant de se connecter ; `docker compose ps` permet de consulter son état et `docker compose logs db` ses journaux.

**Arrêt courant :** `docker compose down` conserve le volume et les données. Relancer `docker compose up -d` pour retrouver la base.

**Remise à zéro volontaire :** `docker compose down -v` supprime définitivement les données. Vérifier le nom du volume concerné et tester cette procédure uniquement sur une base de test. Relancer ensuite `docker compose up -d` pour initialiser une base vide avec les paramètres courants.

---

## Utilisation

### Adminer

Ouvrir [Adminer local](http://localhost:8080) et renseigner les paramètres suivants, à adapter si la configuration a été personnalisée :

| Champ | Valeur par défaut |
| --- | --- |
| Système | PostgreSQL |
| Serveur | `db` |
| Utilisateur | `pg` |
| Mot de passe | `pg` |
| Base de données | `alfred` |

Adminer utilise le nom du service Docker `db`. Depuis un outil installé sur la machine hôte, utiliser `localhost` et le port `5432`.

## Variables d’environnement

Le fichier `docker-compose.yml` fournit des valeurs par défaut pour le développement local. Le démarrage fonctionne sans fichier `.env`.

Pour personnaliser la configuration, créer un fichier `.env` à la racine du projet :

```dotenv
POSTGRES_USER=pg
POSTGRES_PASSWORD=pg
POSTGRES_DB=alfred
POSTGRES_DATA_PATH=/var/lib/postgresql
POSTGRES_VOLUME_NAME=postgres_data
```

| Variable | Rôle |
| --- | --- |
| `POSTGRES_USER` | Utilisateur PostgreSQL créé à l’initialisation |
| `POSTGRES_PASSWORD` | Mot de passe local de cet utilisateur |
| `POSTGRES_DB` | Base créée à l’initialisation |
| `POSTGRES_DATA_PATH` | Chemin de montage du volume dans le conteneur ; conserver `/var/lib/postgresql` pour PostgreSQL 18 |
| `POSTGRES_VOLUME_NAME` | Nom du volume Docker persistant |

Les valeurs ci-dessus sont les valeurs par défaut et des exemples locaux. Ne pas versionner de secret réel ni ajouter au suivi Git un fichier `.env` qui en contient. Le dépôt ne fournit actuellement pas d’exclusion Git globale pour ce fichier.

Pour plusieurs copies du projet, choisir un `POSTGRES_VOLUME_NAME` distinct pour chacune : le nom par défaut est partagé sur le même moteur Docker. Supprimer ce volume affecterait toutes les copies qui l’utilisent.

Les variables `POSTGRES_USER`, `POSTGRES_PASSWORD` et `POSTGRES_DB` initialisent une base vide. Les modifier ne change pas les identifiants ni la base déjà stockés dans un volume existant.

## Notes techniques

- [Angular : installation, démarrage, génération et outils de développement](.doc/angular/commandes.md).
- [Spring Boot : commandes de référence](.doc/spring-boot/commandes.md).

## Exécuter la CI en local

Avec [act](https://github.com/nektos/act) et un moteur Docker disponible, depuis la racine du projet :

```bash
act
```

Le fichier `.actrc` configure l’image Ubuntu utilisée pour cette exécution locale.

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

| Technologie | Version déclarée | Usage |
| --- | --- | --- |
| Angular | ^22.1.0 | Interface utilisateur, composants et routage |
| TypeScript | ~6.0.2 | Langage du frontend |
| Signals et RxJS | RxJS ~7.8.0 | Réactivité et gestion des flux asynchrones |
| Tailwind CSS | ^4.1.12 | Mise en forme de l’interface |
| daisyUI | ^5.7.50 | Composants CSS |
| Lucide | ^1.66.0 | Icônes |
| Vitest | ^4.0.8 | Tests unitaires via Angular CLI |
| ESLint et Prettier | — | Analyse statique et formatage |
| pnpm | 11.21.0 | Gestion des dépendances et lancement des scripts |

GitHub Actions vérifie actuellement le formatage, le lint et la compilation du frontend avec Node.js 24. Les tests sont configurés dans le projet, mais ne sont pas encore exécutés par ce workflow.

### Backend et base de données prévus

- **Java et Spring Boot** : développement du backend et de l’API.
- **PostgreSQL** : stockage des données.
- **Adminer** : administration de la base de données.

Le backend et la configuration de la base de données ne sont pas encore présents dans le dépôt. Leurs versions et leurs instructions d’installation seront précisées lors de leur ajout.

## Notes techniques

- [Angular : installation, démarrage, génération et outils de développement](.doc/angular/commandes.md).
- [Spring Boot : commandes de référence pour le futur backend](.doc/spring-boot/commandes.md).

## Exécuter la CI en local

Avec [act](https://github.com/nektos/act) et un moteur Docker disponible, depuis la racine du projet :

```bash
act
```

Le fichier `.actrc` configure l’image Ubuntu utilisée pour cette exécution locale.

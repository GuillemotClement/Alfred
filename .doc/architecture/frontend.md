# Organisation des fichiers du frontend

Statut : proposition à valider.

## Principe

Organiser le frontend par domaines fonctionnels (`features`). Une feature peut contenir plusieurs pages : par exemple, `recipes` regroupe la liste, le détail et la création d’une recette.

Cette organisation rapproche les fichiers qui évoluent ensemble et permet de retrouver le code à partir d’un besoin fonctionnel.

## Structure proposée

Les noms métier ci-dessous sont illustratifs.

```text
app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── auth.interceptor.ts
│   └── layout/
├── shared/
│   ├── components/
│   │   ├── button/
│   │   └── modal/
│   ├── directives/
│   └── pipes/
├── features/
│   └── recipes/
│       ├── pages/
│       │   ├── recipe-list/
│       │   ├── recipe-detail/
│       │   └── recipe-create/
│       ├── components/
│       │   └── recipe-card/
│       ├── recipe.service.ts
│       ├── recipe.model.ts
│       └── recipes.routes.ts
├── app.config.ts
└── app.routes.ts
```

## Responsabilités

- `core/` contient les mécanismes communs à l’application : session utilisateur, guards, interceptors et structure générale de navigation. Les pages de connexion peuvent appartenir à une feature `auth`.
- `shared/` contient les composants, directives et pipes réutilisables entre plusieurs features, sans dépendance à un domaine métier particulier.
- `features/` contient les domaines fonctionnels. Chaque domaine rassemble ses pages, ses composants métier, ses services, ses modèles et ses routes.
- `pages/` contient un dossier par écran accessible par une route.
- `components/` dans une feature contient ses composants métier, éventuellement utilisés par plusieurs de ses pages.
- Le fichier de routes d’une feature décrit ses écrans ; `app.routes.ts` organise les points d’entrée et leur chargement différé.

## Règles de simplicité et d’évolution

- Garder les fichiers service, modèle et routes à la racine de la feature tant que leur nombre reste limité. Créer des sous-dossiers lorsqu’ils facilitent réellement la navigation.
- Ne pas imposer un seul service ou modèle par feature : séparer les fichiers selon leurs responsabilités lorsque le besoin apparaît.
- Placer initialement un composant dans sa feature. Le déplacer vers `shared/` lorsqu’un besoin de réutilisation entre plusieurs domaines apparaît et que son rôle est générique.
- Éviter de faire de `core/` ou `shared/` des dossiers de rangement par défaut : la logique métier reste dans les features.
- Créer uniquement les dossiers utiles au code présent ; l’arborescence illustre une organisation, pas une liste de dossiers obligatoires.

Cette proposition documente l’organisation cible ; elle ne décrit pas une réorganisation déjà effectuée du code.

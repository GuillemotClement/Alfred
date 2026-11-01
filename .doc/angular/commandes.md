# Commandes Angular

[Retour au README](../../README.md) · [Documentation](../README.md)

## Démarrer le frontend Angular

Prérequis : Node.js 24, comme dans la CI, et pnpm 11.21.0.

Depuis la racine du dépôt :

```bash
cd front
pnpm install --frozen-lockfile
pnpm exec ng serve
```

L’application est ensuite accessible sur [localhost:4200](http://localhost:4200/). Le serveur recharge automatiquement la page après une modification des sources.

### Commandes Angular CLI

À exécuter dans `front/`. Les commandes ci-dessous utilisent `ng`. Pour lancer le CLI installé dans le projet sans installation globale, les préfixer par `pnpm exec` : par exemple, `ng serve` devient `pnpm exec ng serve`.

| Commande | Description |
| --- | --- |
| `ng serve` | Lancer le serveur de développement |
| `ng build` | Compiler l’application pour la production |
| `ng build --watch --configuration development` | Recompiler à chaque modification en développement |
| `ng test` | Lancer les tests unitaires |
| `ng lint` | Analyser le code avec la configuration ESLint du projet |
| `ng version` | Afficher les versions d’Angular et du CLI |
| `ng --help` | Afficher l’aide du CLI |

### Générer des éléments Angular

Les chemins sont des exemples, à adapter à l’organisation de l’application. `ng g` est le raccourci de `ng generate`.

| Commande | Élément généré et usage |
| --- | --- |
| `ng generate component shared/components/bouton` | Composant : partie de l’interface avec son template et ses styles |
| `ng generate service core/services/api` | Service : logique réutilisable, accès aux données ou appels API |
| `ng generate directive shared/directives/surlignage` | Directive : comportement appliqué à un élément du template |
| `ng generate pipe shared/pipes/duree` | Pipe : transformation d’une valeur pour son affichage |
| `ng generate guard core/guards/auth` | Guard : contrôle de la navigation vers une route |
| `ng generate interceptor core/interceptors/auth` | Intercepteur : traitement des requêtes et réponses HTTP |
| `ng generate interface shared/models/foyer` | Interface TypeScript : description de la structure d’un objet |
| `ng generate class shared/models/adresse` | Classe TypeScript : données et comportements d’un objet |
| `ng generate enum shared/models/statut` | Enum TypeScript : ensemble de valeurs nommées |
| `ng generate module exemple` | NgModule : regroupement par module, si une partie de l’application en a besoin |

Exemples de raccourcis et d’options :

```bash
# Générer un composant avec le CLI local
pnpm exec ng g c shared/components/bouton

# Générer un service avec le CLI local
pnpm exec ng g s core/services/api

# Prévisualiser la génération sans créer de fichiers
pnpm exec ng g c shared/components/bouton --dry-run

# Consulter les options d’un générateur
pnpm exec ng generate component --help
```

La génération d’un service, d’un guard ou d’un intercepteur ne suffit pas à le connecter à l’application : son utilisation ou son enregistrement reste à réaliser selon le besoin.

Référence : [générateurs du CLI Angular](https://angular.dev/cli/generate).

### Formatage

Prettier utilise les scripts pnpm du projet :

| Commande | Description |
| --- | --- |
| `pnpm format` | Formater les fichiers de `src/` |
| `pnpm format:check` | Vérifier le formatage sans modifier les fichiers |

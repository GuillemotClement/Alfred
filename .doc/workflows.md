# Workflows de développement Alfred

Les commandes `$skill` se saisissent dans Codex, pas dans le terminal. Les flèches indiquent un ordre conseillé : chaque étape se lance sur ta demande. Tu développes et corriges toi-même.

| Je veux… | Commande ou workflow |
| --- | --- |
| Discuter d'une fonctionnalité | `$product-owner` — A |
| Réfléchir à une architecture | `$software-architect` — A ou H |
| Être accompagné sur du Java | `$tech-mentor` — B ou H |
| Être accompagné sur Angular | `$frontend-mentor` — B ou G |
| Concevoir une interface | `$ui-ux-designer` — G |
| Préparer des tests | `$qa-engineer` — B ou H |
| Faire une revue technique | `$code-review` — B ou C |
| Préparer un commit | `$git-commit` — B ou C |
| Préparer une PR | `$pr-description` — C |
| Documenter les évolutions d'une PR | `$pr-update` — D |
| Vérifier une PR avant merge | `$pr-review` — E |
| Corriger une PR après review | Workflow F |

Ces onze skills existent dans `.agents/skills/`. Une nouvelle session peut être nécessaire pour découvrir un nouveau skill. GitHub nécessite un accès en lecture aux issues, PR et checks ; outils GitHub prioritaires, `gh` authentifié en repli. L'agent signale les accès ou preuves manquants.

Les numéros #12 et #15 sont illustratifs. Spring Boot, PostgreSQL et Flyway sont des exemples backend, pas la preuve de leur installation : vérifier le dépôt avant de conseiller leurs commandes.

## Règles communes

- **Accompagnement** par défaut : indices et explications. « Passe en mode autonomie » : aide sur sollicitation. « Passe en mode évaluation » : exercice et critères avant évaluation. Une réponse directe reste possible sur demande.
- Préparer un message ou une description ne crée ni commit ni PR. Effectue les actions Git toi-même ou demande-les explicitement avec leur périmètre.
- Avant publication GitHub : lire la proposition complète, demander une reformulation si nécessaire, puis valider la version finale et sa cible. Aucun merge automatique.
- Demander l'enregistrement des spécifications dans `.doc/features/` et des décisions dans `.doc/architecture/`. Une demande de maquette autorise sa documentation visuelle dans `.doc/design/`. Le suivi pédagogique ne change que sur demande de bilan ou de mise à jour.

## A — Conceptualiser une nouvelle fonctionnalité

**Objectif et moment :** partir d'une idée pour définir et planifier le besoin avant de coder.

**Ordre :** `$product-owner` → `$software-architect` → `$ui-ux-designer` si nécessaire.

**Exemple Alfred et commandes :**

1. `$product-owner Je souhaite ajouter la gestion des tâches dans Alfred. Clarifions les utilisateurs, le MVP et les exclusions, puis prépare les user stories, critères d'acceptation et tests à prévoir. Recherche les doublons GitHub et présente les issues sans les créer.`
2. Après discussion : `$product-owner Enregistre le besoin validé dans .doc/features/taches.md et présente le lot complet d'issues pour validation.`
3. `$software-architect Voici mon modèle de tâches et mon découpage envisagé. Challenge les responsabilités, les données et les contrats ; documente la décision validée dans .doc/architecture/.`
4. Si nécessaire : `$ui-ux-designer Propose des maquettes de gestion des tâches avec les états vide et erreur dans .doc/design/pages/tasks/.`

**Résultat :** besoin, critères observables, backlog proposé, décisions et éventuelles maquettes aux emplacements indiqués. GitHub porte le suivi opérationnel, sans duplication complète des spécifications.

**Validations :** besoin et décisions importantes, puis titres, corps, labels et relations exacts des issues avant création. Valider une idée n'autorise pas la création d'issues. Choisir une maquette avant le frontend.

## B — Développer une issue GitHub

**Objectif et moment :** implémenter progressivement une fonctionnalité déjà définie.

**Ordre :** `$software-architect` si nécessaire → `$tech-mentor` ou `$frontend-mentor` → `$qa-engineer` → `$code-review` → `$git-commit`.

**Exemple Alfred et commandes :**

1. `$tech-mentor Je souhaite développer l'issue #12 d'initialisation du backend Spring Boot. Lis l'issue et les documents liés, vérifie le dépôt actuel et aide-moi à identifier la première étape.`
2. Vérifier `git status` et la branche de départ, choisir une base à jour, puis créer soi-même une branche dans le terminal : `git switch -c feat/12-init-backend`. Éviter de mélanger du travail en cours. Si la création est déléguée à Codex, son préfixe par défaut est `codex/`.
3. `$software-architect Voici les dépendances et la structure que j'envisage pour #12. Challenge ma proposition sans implémenter.` (si utile)
4. `$tech-mentor Accompagne-moi étape par étape sur #12 ; je rédige le code.` Pour Angular : `$frontend-mentor Aide-moi à développer l'issue à partir de la maquette validée ; je code moi-même.`
5. `$qa-engineer Aide-moi à définir les tests de #12 à partir des critères, puis examine ceux que j'ai écrits.`
6. `$code-review Relis mon diff par rapport à la branche cible choisie, sans modifier les fichiers.`
7. `$git-commit Propose un message pour les changements vérifiés de #12.`

**Résultat :** implémentation et tests écrits par toi, première revue technique, message Conventional Commit proposé.

**Validations :** choix techniques importants ; commit et push uniquement par toi ou sur demande explicite. Le mentor laisse le développement sous ton contrôle. Vérifier les scripts présents avant de choisir les commandes de tests.

## C — Créer une Pull Request

**Objectif et moment :** présenter une partie cohérente du développement, terminée et vérifiée.

**Ordre :** `$code-review` → `$git-commit` → `$pr-description`.

**Exemple Alfred et commandes :**

1. `$code-review J'ai terminé l'initialisation du backend Spring Boot. Relis tout le diff par rapport à dev, si c'est bien la cible de cette livraison.`
2. Corriger et vérifier, puis `$git-commit Propose un découpage et les messages correspondant au diff réel.`
3. Dans le terminal : examiner `git diff` et `git status`, sélectionner avec `git add <fichiers>`, contrôler `git diff --cached`, puis `git commit -m "<message validé>"` et `git push -u origin <branche>`. Remplacer les valeurs entre chevrons. Pour déléguer, préciser fichiers, message, branche et remote.
4. `$pr-description Prépare le titre et la description de ma PR vers dev, avec les vérifications réellement exécutées et la référence à l'issue #12. Ne crée pas la PR.`
5. Employer `Closes #12` seulement si l'issue est entièrement traitée ; sinon expliquer le lien sans annoncer de clôture. Créer la PR dans GitHub avec source/cible vérifiées, ou demander explicitement sa création avec le titre et le corps relus.

**Résultat :** commits poussés et description fidèle ; PR ouverte uniquement à l'étape explicite de création.

**Validations :** contenu des commits, destination du push, titre/corps/source/cible de la PR. Générer une description n'ouvre pas de PR et ne lance pas les tests.

## D — Ajouter un commentaire d'évolution sur une PR

**Objectif et moment :** expliquer les changements depuis le dernier suivi, après de nouveaux commits poussés.

**Commande principale :** `$pr-update`.

**Exemple Alfred et commandes :**

1. Après ajout de Flyway et correction de PostgreSQL, effectuer les commits/push autorisés, puis saisir `$pr-update`.
2. Le skill retrouve la PR de la branche et lit tous les commentaires de conversation. Le dernier suivi valide contient `<!-- alfred-pr-update: commit=<FULL_COMMIT_SHA> -->`.
3. Il compare le SHA documenté S à la tête distante H : diff des instantanés et commits S..H. Sans suivi au premier usage, S est le point de divergence vérifié avec la cible : le premier commentaire couvre toute la PR. Une origine ambiguë, un marqueur endommagé ou non ancêtre nécessite une référence validée, sans repli silencieux.
4. Lire commentaire complet et plage. Pour reformuler : `$pr-update Reformule le brouillon en expliquant l'impact de Flyway.`
5. Après présentation finale : « Je valide ce commentaire pour cette PR et cette plage. Publie-le. »

**Résultat :** brouillon Markdown, puis commentaire et URL après accord. Son marqueur H devient le départ du prochain suivi ; aucun nouveau commit signifie aucun nouveau commentaire.

**Validations :** texte complet, PR et plage avant publication. Les commits doivent être poussés ; le travail local est exclu. Si la tête ou le suivi évolue, nouvelle proposition à valider. `$pr-update` ne modifie pas la description principale préparée par `$pr-description` et ne crée aucun commit/push.

## E — Effectuer une review avant merge

**Objectif et moment :** vérifier une PR terminée contre les exigences et les preuves disponibles avant de décider du merge.

**Commande principale :** `$pr-review`, sans argument obligatoire.

**Exemple Alfred et commandes :**

1. `$pr-review` ou `$pr-review Examine la PR #15 associée à l'issue #12 et vérifie tous ses critères d'acceptation.`
2. Le skill retrouve la PR depuis la branche, vérifie cible et SHA puis lit tout le diff. Plusieurs PR : choix demandé ; aucune : revue locale proposée. Il suit les références explicites aux issues ; sans issue identifiable, il demande sa référence.
3. Il construit la matrice des critères : VALIDÉ, PARTIEL, NON VALIDÉ ou NON VÉRIFIABLE, avec preuves et réserves. Implémenté, testé et réellement vérifié restent distincts.
4. Il examine code, tests et CI sur les références annoncées et exécute les vérifications pertinentes si possible. Il distingue réussites, échecs, absences et non-exécutions.
5. Il classe les constats en BLOQUANT, IMPORTANT ou SUGGESTION, puis justifie son verdict : PRÊT POUR MERGE, CORRECTIONS RECOMMANDÉES, MERGE BLOQUÉ ou VALIDATION INCOMPLÈTE.

**Résultat :** rapport Markdown intégral dans le chat : critères, constats localisés, tests/CI, risques et actions prioritaires. Corriger avec F puis relancer `$pr-review` sur la nouvelle tête.

**Validations :** aucune publication implicite. Dire « Prépare la publication de ce rapport sur la PR #15 », puis valider le contenu exact et la cible présentés. Après vérification de fraîcheur, le skill publie et fournit le lien. Un avis favorable n'est pas une approbation formelle GitHub. Le merge reste une action humaine distincte que le skill ne réalise jamais.

## F — Corriger une PR après review

**Objectif et moment :** résoudre les problèmes identifiés et vérifier la nouvelle version.

**Ordre :** `$pr-review` → `$tech-mentor` ou `$frontend-mentor` → `$qa-engineer` → `$git-commit` → `$pr-update` → `$pr-review`.

**Exemple Alfred et commandes :**

1. `$pr-review` : relever le scénario et la preuve du problème de variables d'environnement.
2. `$tech-mentor Aide-moi à comprendre le constat sur les variables d'environnement et à déterminer la correction ; je la réalise.` Pour Angular, utiliser `$frontend-mentor`.
3. Corriger soi-même, puis `$qa-engineer Quels scénarios de configuration absente ou invalide doivent prouver cette correction ? Analyse ensuite mes tests.` Exécuter les vérifications adaptées.
4. `$git-commit Propose le message pour cette correction vérifiée.` Créer et pousser le commit soi-même ou sur demande explicite.
5. `$pr-update` : relire le commentaire et sa plage, puis valider la publication.
6. `$pr-review` : réexaminer toute la PR sur le nouveau SHA, y compris les régressions.

**Résultat :** problème compris, correction testée, suivi documenté et rapport actualisé.

**Validations :** commit/push explicitement demandés s'ils sont délégués ; commentaire complet validé avant publication. L'ancien verdict ne valide pas le nouveau commit.

## G — Concevoir une interface

**Objectif et moment :** choisir l'interface avant de développer en Angular.

**Ordre :** `$product-owner` si nécessaire → `$ui-ux-designer` → `$frontend-mentor`.

**Exemple Alfred et commandes :**

1. `$product-owner Clarifions les informations et actions nécessaires à la page de gestion des projets Alfred.` (si besoin)
2. `$ui-ux-designer Propose deux directions pour la page des projets avec responsive et états vide, chargement et erreur. Conserve les maquettes dans .doc/design/pages/projects/.`
3. Comparer hiérarchie, lisibilité et parcours puis choisir une direction. Conserver de vrais visuels légers et versionnables : SVG pour les éléments simples, WebP ou PNG optimisé pour les pages complexes. Garder les variantes utiles, le README de page et le catalogue `.doc/design/README.md`.
4. `$frontend-mentor Analyse la maquette validée des projets. Aide-moi à proposer les composants Angular, leurs responsabilités et leurs états ; je développerai progressivement.`

**Résultat :** maquettes consultables, choix documentés, découpage proposé puis développement par toi.

**Validations :** besoin et maquette choisie ; confirmation avant écrasement d'une maquette validée. Aucun passage automatique à Angular. Le designer signale l'absence d'outil visuel adapté.

## H — Initialiser un nouveau module backend

**Objectif et moment :** structurer un module Spring Boot utile après vérification du backend présent.

**Ordre :** `$product-owner` si besoin → `$software-architect` → `$tech-mentor` → `$qa-engineer` → `$code-review`.

**Exemple Alfred et commandes :**

1. `$product-owner Définissons le périmètre minimal de gestion des articles Alfred, les règles et critères d'acceptation ; prépare les issues sans les créer.`
2. `$software-architect Voici mon modèle Article et les responsabilités envisagées. Challenge les données, endpoints REST, validations et frontières transactionnelles sans surengineering.`
3. `$tech-mentor Vérifie le backend existant puis accompagne-moi pour développer ce module. Je rédige contrôleur, service, accès aux données et migration Flyway si cet outil est retenu.` Commencer par un parcours vertical simple, expliquer contraintes SQL, migrations et erreurs, éviter les couches inutiles.
4. `$qa-engineer Partons des critères pour choisir les tests de validation, service, API et persistance nécessaires. Je les écrirai.` Vérifier la stack avant de choisir JUnit, Mockito ou Testcontainers.
5. `$code-review Relis le diff du module articles, ses migrations, contrats et tests sans modifier les fichiers.`

**Résultat :** données et responsabilités justifiées, module développé par toi, scénarios pertinents et revue technique. Si le backend n'existe pas, traiter d'abord son initialisation comme un périmètre explicite.

**Validations :** périmètre, modèle et choix importants ; création d'issues après validation de leur contenu exact. Ne pas ajouter automatiquement d'infrastructure inutile ni démarrer de services externes sans autorisation.

Pour les détails : [guide des skills](guide-skills.md), [guide général](alfred-guide-skills.md), [aide-mémoire](commandes-skills-alfred.md).

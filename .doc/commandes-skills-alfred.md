# Alfred — Aide-mémoire des commandes Codex

> Commandes à utiliser dans Codex **si les skills correspondants sont installés** dans `.agents/skills/`. Les exemples ci-dessous sont des formulations de demandes, pas des commandes de terminal. Les résultats indiqués sont les livrables attendus ; les actions GitHub nécessitent ta validation.

| Commande | Pourquoi l'utiliser | Résultat attendu |
|---|---|---|
| `$product-owner` | Clarifier une idée, définir le besoin, préparer le backlog. | User stories, critères d'acceptation, propositions d'issues GitHub ; création **après validation**. |
| `$tech-mentor` | Apprendre à développer et résoudre un problème sans déléguer l'implémentation. | Questions ciblées, explications, indices et retour pédagogique. |
| `$software-architect` | Étudier la structure d'une fonctionnalité ou un choix technique. | Analyse des compromis, proposition d'architecture, éventuellement ADR dans `.doc/architecture/`. |
| `$ui-ux-designer` | Imaginer l'apparence d'une page ou d'un composant. | Maquettes visuelles SVG/WebP/PNG dans `.doc/design/`, si un outil de rendu est disponible. |
| `$frontend-mentor` | Apprendre à transformer une maquette en composants Angular. | Découpage conseillé, responsabilités des composants, pistes HTML/CSS/Angular, sans code complet par défaut. |
| `$qa-engineer` | Définir quoi tester et comment. | Scénarios, cas limites et stratégie de tests, avec accompagnement à l'écriture. |
| `$code-review` | Contrôler une implémentation. | Observations classées par gravité, explications et pistes de correction ; aucune modification automatique. |
| `$git-commit` | Préparer un commit propre. | Analyse des changements et proposition de message ; commit seulement après validation. |
| `$pr-description` | Préparer la présentation initiale d'une Pull Request. | Description Markdown de la PR (résumé, tests, issues), à valider avant publication. |
| `$pr-update` | Documenter les évolutions d'une PR depuis son **dernier commentaire de suivi**. | Comparaison du dernier commit documenté avec le HEAD de la PR, commentaire Markdown affiché pour validation, puis publication sur la PR **uniquement après accord**. |

## Exemples prêts à copier

`$pr-review` — vérifier une PR avant merge : issues et critères, code, tests et CI. Résultat : rapport Markdown avec preuves, constats priorisés et verdict, affiché sans publication.

Exemple : `$pr-review Examine la PR #15 associée à l'issue #12.` Sans argument, le skill retrouve la PR de la branche courante. Une publication nécessite une demande puis la validation explicite du contenu exact et de sa cible ; aucun merge automatique.

Voir les [workflows détaillés](workflows.md) pour l'ordre des étapes.

| Commande à saisir dans Codex | Résultat attendu |
|---|---|
| `$product-owner Je veux initialiser le backend Spring Boot. Définissons le périmètre puis prépare les issues GitHub sans les créer.` | Proposition d'issues avec critères d'acceptation. |
| `$software-architect Aide-moi à choisir les dépendances et la structure du backend. Ne crée aucun fichier.` | Décisions techniques argumentées. |
| `$tech-mentor Accompagne-moi pour configurer Flyway. Je veux écrire le code moi-même.` | Aide progressive. |
| `$ui-ux-designer Propose une maquette desktop et mobile pour la liste des projets.` | Fichiers de maquettes dans `.doc/design/pages/projects/`, selon les outils disponibles. |
| `$frontend-mentor Analyse la maquette des projets et aide-moi à découper les composants Angular.` | Plan de composants et explications. |
| `$qa-engineer Aide-moi à définir les tests de l'initialisation Spring Boot.` | Cas de test pertinents. |
| `$code-review Examine les changements de ma branche par rapport à dev sans modifier les fichiers.` | Rapport de revue. |
| `$git-commit Propose un commit pour mes modifications, mais attends ma validation.` | Message Conventional Commits proposé. |
| `$pr-description Prépare la description de ma PR vers dev. Affiche-la avant toute publication.` | Description Markdown prête à relire. |
| `$pr-update` | Commentaire sur les changements depuis le dernier suivi, **affiché sans publication**. |
| `Je valide le commentaire pr-update. Publie-le sur la PR indiquée.` | Commentaire GitHub publié et lien retourné, après vérifications. |

## Modes pédagogiques

Ces modes sont des **instructions en langage naturel**, pas nécessairement des skills `$...` :

| Demande | Effet attendu |
|---|---|
| `Passe en mode accompagnement.` | Indices, questions et explications progressives (mode par défaut). |
| `Passe en mode autonomie.` | L'agent intervient principalement sur demande. |
| `Passe en mode évaluation. Évalue mes connaissances sur Spring Boot.` | Exercice ou questions, évaluation des réponses et pistes de progression. |

## Règle de publication

**Préparer ≠ publier.** Pour les issues GitHub, les commits, les PR et les commentaires de PR, Codex doit montrer le résultat proposé et attendre une autorisation explicite avant d'effectuer l'action. Pour `$pr-update`, le point de départ est le SHA enregistré dans le dernier commentaire de suivi valide ; s'il est introuvable ou invalide, Codex doit demander comment définir la plage de comparaison.

# Roadmap pédagogique

Objectif : progresser de junior avancé vers confirmé. Aucun acquis n'est présumé ; tous les domaines sont initialement non évalués. Adapter priorités et exercices sur demande explicite de bilan ou de mise à jour, à partir des preuves du [suivi](progress.md).

Le frontend est présent dans front/ ; les exercices Java/Spring, PostgreSQL et Docker sont des objectifs, sans supposer leur implémentation actuelle. Les exercices ci-dessous sont des propositions à choisir, pas une autorisation de créer du code.

| Domaine | Fondamentaux | Intermédiaire | Avancé / confirmé |
| --- | --- | --- | --- |
| Java / Spring Boot | Types, collections, exceptions, contrats, injection de dépendances | REST, validation, services, transactions, JPA et erreurs | Concurrence, limites transactionnelles, chargement JPA et diagnostic de performance |
| Angular / TypeScript | Types stricts, composants standalone, templates, Signals | computed, inputs/outputs, services, routing, formulaires et RxJS | Frontières de réactivité, états asynchrones, erreurs, performance et maintenabilité |
| SQL / PostgreSQL | Clés, contraintes, cardinalités, jointures | Agrégations, migrations, transactions et index | Plans EXPLAIN, isolation, concurrence et choix d'index mesurés |
| Architecture logicielle | Responsabilités, cohésion, couplage et contrats | Domaines, API REST, SOLID et ADR contextualisés | Évolution des frontières, compromis sécurité/performance et simplification d'une conception |
| Tests et qualité | Comportements observables et assertions | Tests unitaires/intégration, mocks, API, Angular/Vitest | Stratégie fondée sur les risques, Testcontainers si adapté, tests déterministes et diagnostic de régressions |
| Sécurité applicative | Validation, authentification vs autorisation, secrets | Contrôle d'accès serveur, sessions/tokens, CSRF, CORS, XSS et injection | Modèle de menaces, autorisation objet, tests négatifs et défense en profondeur |
| DevOps / CI/CD | Git, dépendances reproductibles, lecture de CI | Jobs GitHub Actions, qualité, tests et conteneurs | Permissions minimales, artefacts reproductibles, observabilité, déploiement et rollback |
| UI/UX Design | Hiérarchie, contraste, typographie et espacements | Parcours, états, cohérence des composants et responsive | Comparaison de directions, validation d'usage et évolution raisonnée d'une identité |
| Frontend UI Engineering | HTML sémantique, cascade, unités, Flexbox et Grid | Variables CSS, media queries, composants Angular proportionnés | Fidélité à la maquette, contenus extrêmes, accessibilité interactive et diagnostic de layout |

## Exercices et critères observables

| Domaine | Progression pratique proposée | Critères d'évaluation |
| --- | --- | --- |
| Java / Spring Boot | Expliquer un invariant métier → concevoir une API de foyer avec validation → analyser une transaction concurrente | Justifier les responsabilités, reproduire les erreurs, expliquer rollback et cohérence ; tests adaptés |
| Angular / TypeScript | Expliquer le signal existant → proposer un filtre dérivé et des états asynchrones → comparer une approche Signals/RxJS | Types précis, état dérivé sans duplication, gestion des erreurs et justification des choix |
| SQL / PostgreSQL | Modéliser foyers et membres → écrire jointures et contraintes → comparer un plan avant/après index | Intégrité garantie, requêtes correctes, effets de concurrence expliqués et optimisation mesurée |
| Architecture logicielle | Découper une fonctionnalité → comparer deux conceptions → rédiger un ADR et réexaminer une décision | Contrats explicites, risques identifiés, compromis justifiés et absence de complexité inutile |
| Tests et qualité | Définir un comportement et un contre-exemple → choisir les niveaux de tests → diagnostiquer un test fragile | Assertions utiles, échecs reproductibles, isolation et absence de dépendance injustifiée aux détails internes |
| Sécurité applicative | Distinguer identité et droits → concevoir le contrôle d'accès à un foyer → vérifier un accès croisé interdit | Autorisation côté serveur, cas négatifs, absence de fuite et hypothèses de menace explicites |
| DevOps / CI/CD | Expliquer le workflow frontend actuel → proposer l'intégration des tests → concevoir un déploiement réversible | Lecture exacte du YAML, commandes justifiées, permissions adaptées et scénario de rollback vérifiable |
| UI/UX Design | Comparer deux hiérarchies → concevoir une page de foyer desktop/mobile → évaluer un parcours | Lisibilité, cohérence, décisions expliquées, états couverts et distinction entre hypothèse et choix validé |
| Frontend UI Engineering | Expliquer une grille → reproduire une maquette choisie → analyser zoom, clavier et contenu long | Découpage pertinent, responsive sans débordement, sémantique correcte, focus utilisable et styles maintenables |

La réussite d'un exercice prouve seulement ce qui a été observé, avec le niveau d'aide reçu. La maîtrise exige des réutilisations autonomes dans des contextes distincts. Choisir un exercice à la fois selon les priorités du développeur, sans calendrier imposé.

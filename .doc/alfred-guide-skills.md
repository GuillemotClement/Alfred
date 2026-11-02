# Alfred — Guide des skills Codex

> **Statut :** guide d'utilisation de la configuration **prévue** pour Alfred. Les skills doivent d'abord être créés et validés dans le dépôt par Codex ; ce document ne prouve pas qu'ils sont déjà installés.
>
> **Principe :** **je suis le développeur**. Codex conseille, challenge, explique et évalue. Il n'écrit pas le code à ma place, sauf demande explicite.

## 1. Vue d'ensemble

| Skill | Quand l'utiliser | Résultat attendu |
|---|---|---|
| `product-owner` | Une idée de fonctionnalité, un besoin flou, un backlog | Besoin clarifié, user stories, critères d'acceptation et backlog GitHub Issues |
| `tech-mentor` | Une question technique, un blocage, une montée en compétences | Raisonnement guidé, explications, indices, bilan |
| `software-architect` | Concevoir une fonctionnalité ou faire un choix structurel | Options, compromis, décisions d'architecture |
| `ui-ux-designer` | Imaginer une page ou un composant visuel | Maquettes **SVG, WebP ou PNG** dans `.doc/design/` |
| `frontend-mentor` | Reproduire une maquette avec Angular | Conseils de découpage, HTML/CSS, Signals, responsive |
| `qa-engineer` | Définir ou améliorer les tests | Scénarios pertinents, stratégie et revue des tests |
| `code-review` | Faire relire du code terminé ou un diff | Problèmes priorisés et pistes de correction |
| `git-commit` | Préparer un commit propre | Analyse des changements et proposition de commit |
| `pr-description` | Préparer une pull request | Titre, résumé, tests et points d'attention |

Les deux derniers skills correspondent au workflow Git envisagé précédemment : **vérifier leur présence et leur contenu réel** avant utilisation. Les noms `$skill` ci-dessous sont des exemples d'invocation ; ils fonctionnent si Codex découvre les skills dans `.agents/skills/`.

## 2. Modes pédagogiques

| Mode | Comportement | Exemple |
|---|---|---|
| **Accompagnement** (par défaut) | Questions ciblées, indices, explications, pas de solution complète immédiate | « Passe en mode accompagnement et aide-moi à comprendre cette erreur JPA. » |
| **Autonomie** | Tu codes seul ; Codex intervient à la demande | « Passe en mode autonomie. Je veux implémenter cette feature seul. » |
| **Évaluation** | Exercice, critères, correction après réalisation | « Passe en mode évaluation : teste mes connaissances sur les transactions Spring. » |

**Règle pratique :** tu peux toujours dire « Donne-moi la réponse directement » ou « Montre-moi un petit exemple ciblé ». Le mentor ne doit pas rendre les questions simples artificiellement compliquées.

## 3. Utiliser chaque skill

### `product-owner` — définir *quoi* construire

**Quand :** avant de développer une fonctionnalité ou lorsque le besoin est encore vague.

**Prompt :**

> `$product-owner` Je veux ajouter des tâches aux projets Alfred. Pose-moi les questions nécessaires, challenge le périmètre et aide-moi à définir un MVP. Ne code rien.

**Puis, après validation :**

> `$product-owner` Formalise les user stories, règles métier, cas limites et critères d'acceptation. Enregistre la spécification dans `.doc/features/`.

**À vérifier :** les critères doivent être testables et les hypothèses clairement identifiées.

**Gestion du backlog GitHub Issues :** avec un accès GitHub configuré (voir section 8), le Product Owner peut :

- Consulter les issues existantes et rechercher les doublons, y compris parmi les issues fermées, avant de proposer une nouvelle issue.
- Discuter des fonctionnalités, clarifier leur valeur et leur périmètre, préparer des user stories et définir des critères d'acceptation testables.
- Découper les fonctionnalités en tâches, identifier les dépendances et proposer des labels et des priorités justifiées, en tenant compte des conventions du dépôt.
- Créer des issues ou mettre à jour des issues existantes **après validation explicite** du contenu et des changements proposés.
- Suivre l'avancement du backlog à partir des états des issues, des tâches cochées et des informations disponibles ; signaler les blocages et les informations manquantes sans déduire qu'une fonctionnalité est terminée.

Avant une écriture sur GitHub, il présente le dépôt cible, le titre, le corps, les labels et la priorité proposés ; pour une mise à jour, il précise aussi le numéro de l'issue et les modifications prévues. Après l'action validée, il fournit le lien de l'issue et indique le résultat réel.

**Exemple de préparation :**

> `$product-owner` Consulte les issues de `GuillemotClement/Alfred`, recherche les doublons pour la gestion des tâches et prépare les user stories, critères d'acceptation, tâches, labels et priorités. Présente les issues proposées pour validation avant toute création ou mise à jour. Ne code rien.

**Exemple de suivi :**

> `$product-owner` Fais le point sur le backlog de `GuillemotClement/Alfred` : avancement observé, dépendances et blocages. Propose les mises à jour utiles sans les appliquer avant ma validation.

**Limite du rôle :** le Product Owner ne développe pas les fonctionnalités. Il prépare et suit le travail ; tu restes responsable de l'implémentation et des décisions produit importantes. Ces capacités supposent aussi que les instructions du skill aient été mises à jour ; ce guide seul ne les active pas.

### `tech-mentor` — apprendre en développant

**Quand :** tu bloques, tu veux comprendre une notion ou améliorer ton raisonnement.

**Prompt :**

> `$tech-mentor` J'ai un problème avec la gestion des transactions Spring Boot. Demande-moi d'abord comment je raisonne, puis guide-moi avec des indices. Ne me donne pas immédiatement le code.`

**Pour faire le point :**

> `$tech-mentor` Fais un bilan de mes acquis sur les DTO, services et repositories. Ne marque comme maîtrisé que ce que j'ai démontré en autonomie. Mets à jour `.agents/learning/progress.md` après ma validation.`

**À vérifier :** le mentor explique le *pourquoi*, pas seulement le *comment*.

### `software-architect` — concevoir *comment* construire

**Quand :** tu hésites sur un découpage, un modèle SQL, des transactions ou les responsabilités des services.

**Prompt :**

> `$software-architect` Je veux concevoir le module de tâches d'Alfred. Je vais te proposer mon modèle de données et mes services. Challenge mes choix, expose les compromis et évite la sur-ingénierie. Aucun code.`

**Pour documenter une décision :**

> `$software-architect` Rédige un ADR dans `.doc/architecture/` expliquant le choix validé, les alternatives et les conséquences.`

### `ui-ux-designer` — obtenir une **maquette visuelle**

**Quand :** tu ne sais pas à quoi devrait ressembler une page, une carte, une navigation ou un formulaire.

**Prompt :**

> `$ui-ux-designer` Propose trois directions visuelles pour le dashboard Alfred. Je veux des maquettes desktop et mobile, sobres et lisibles. Utilise les conventions déjà validées et enregistre les visuels dans `.doc/design/pages/dashboard/`. Aucun HTML, CSS ou Angular.`

**Pour un composant :**

> `$ui-ux-designer` Crée une maquette de ProjectCard avec nom, description, statut et actions. Enregistre-la dans `.doc/design/components/project-card/`, de préférence en SVG si adapté.`

**Livrables :** de véritables fichiers `.svg`, `.webp` ou `.png`, et un `README.md` court si utile. **Attention :** la génération d'images dépend des outils réellement accessibles à Codex. S'il ne dispose d'aucun outil de rendu, il doit le dire, sans prétendre avoir créé une maquette. Ne pas remplacer le visuel par une interface fonctionnelle sans accord.

### `frontend-mentor` — apprendre à reproduire la maquette

**Quand :** une maquette a été choisie et tu veux réfléchir à sa réalisation en Angular.

**Prompt :**

> `$frontend-mentor` Analyse `.doc/design/pages/dashboard/desktop.webp`. Aide-moi à identifier les composants Angular utiles, leurs inputs/outputs, les états et le responsive. Explique les choix ; je coderai moi-même.`

**En cours de développement :**

> `$frontend-mentor` Voici mon composant ProjectCard. Est-ce que sa responsabilité est bien délimitée ? Conseille-moi sur CSS Grid/Flexbox et les Signals, sans modifier les fichiers.`

**À vérifier :** ne pas créer un composant par balise HTML ; réutiliser seulement ce qui a un intérêt concret.

### `qa-engineer` — apprendre à tester

**Quand :** avant ou après une implémentation, surtout pour le backend.

**Prompt :**

> `$qa-engineer` Je vais tester la création d'un projet Spring Boot. Aide-moi à distinguer tests unitaires et tests d'intégration, à identifier les cas limites et à choisir les assertions. Je rédigerai les tests.`

**Pour relire les tests :**

> `$qa-engineer` Analyse mes tests du service Project. Identifie les comportements non couverts et les tests fragiles. Ne les réécris pas.`

### `code-review` — recevoir une revue pédagogique

**Quand :** après une étape de développement ou avant une PR.

**Prompt :**

> `$code-review` Relis le diff de ma branche par rapport à `dev`. Classe les observations en bloquant, important et suggestion. Cite les fichiers et lignes, explique les conséquences et laisse-moi corriger. Ne modifie rien.`

**Pour une page Angular :**

> `$code-review` Compare mon dashboard à la maquette `.doc/design/pages/dashboard/desktop.webp`. Examine aussi l'accessibilité, le responsive et la structure Angular.`

**À vérifier :** un avis doit être justifié ; une préférence stylistique n'est pas un bug.

### `git-commit` — préparer des commits cohérents

**Quand :** ton travail est terminé et vérifié.

**Prompt :**

> `$git-commit` Analyse mon diff, propose un découpage logique et des messages de commit clairs. Montre-moi ce qui sera inclus avant toute action. Ne pousse rien.`

**À vérifier :** pas de secrets, fichiers temporaires ou changements hors sujet. Le commit ne doit être créé qu'après ton accord.

### `pr-description` — documenter une PR

**Quand :** tu es prêt à ouvrir une PR vers `dev` ou `main`.

**Prompt :**

> `$pr-description` Compare ma branche à `dev` et prépare un titre et une description de PR : objectif, changements, tests exécutés, risques et captures/maquettes pertinentes. N'invente pas les résultats de tests. Ne crée pas la PR sans mon accord.`

**À vérifier :** la description correspond au diff réel et mentionne les tests réellement lancés.

## 4. Où ranger les livrables ?

```text
Alfred/
├── AGENTS.md
├── .agents/
│   ├── skills/
│   │   ├── product-owner/SKILL.md
│   │   ├── tech-mentor/SKILL.md
│   │   ├── software-architect/SKILL.md
│   │   ├── code-review/SKILL.md
│   │   ├── qa-engineer/SKILL.md
│   │   ├── ui-ux-designer/SKILL.md
│   │   ├── frontend-mentor/SKILL.md
│   │   ├── git-commit/SKILL.md
│   │   └── pr-description/SKILL.md
│   └── learning/
│       ├── roadmap.md
│       └── progress.md
├── .doc/
│   ├── README.md
│   ├── features/
│   ├── architecture/
│   └── design/
│       ├── README.md
│       ├── guidelines.md
│       ├── components/
│       │   └── project-card/
│       │       └── project-card.svg
│       └── pages/
│           └── dashboard/
│               ├── desktop.webp
│               ├── mobile.webp
│               └── README.md
├── frontend/
└── backend/
```

- **`.agents/skills/`** : instructions des rôles Codex.
- **`.agents/learning/`** : progression pédagogique, mise à jour sur demande.
- **`.doc/features/`** : besoins, user stories et critères d'acceptation.
- **`.doc/architecture/`** : schémas et décisions techniques (ADR).
- **`.doc/design/`** : maquettes visuelles et conventions UI.
- **`.doc/design/README.md`** : catalogue avec liens relatifs vers les visuels existants.

**Conseil Git :** utiliser SVG pour les éléments simples et WebP/PNG pour les captures complexes. Éviter de versionner plusieurs variantes volumineuses non retenues. Ne pas ignorer `.doc/design/`.

## 5. Workflow complet sur une fonctionnalité

**Exemple : ajouter une liste de tâches dans un projet Alfred.**

1. **Cadrage** — `$product-owner` : consulter le backlog et rechercher les doublons, définir les besoins, le MVP et les critères d'acceptation ; documenter dans `.doc/features/` si demandé, puis créer ou mettre à jour les issues après validation.
2. **Conception** — `$software-architect` : tu proposes ton modèle de données, tes endpoints et tes responsabilités ; l'agent critique les choix.
3. **Design** — `$ui-ux-designer` : créer les maquettes de la page et des composants dans `.doc/design/`.
4. **Préparation Angular** — `$frontend-mentor` : réfléchir aux composants, aux états et au responsive.
5. **Implémentation** — **toi** : écrire Java, SQL, Angular et CSS ; utiliser `$tech-mentor` en cas de blocage.
6. **Tests** — `$qa-engineer` : identifier les scénarios ; **toi** : écrire et exécuter les tests.
7. **Revue** — `$code-review` : analyser le diff ; **toi** : corriger les problèmes.
8. **Livraison** — `$git-commit` puis `$pr-description` : préparer le commit et la PR, avec validation avant les actions Git.
9. **Bilan facultatif** — `$tech-mentor` : faire le point sur les acquis et mettre à jour la progression **sur demande**.

Il n'est **pas nécessaire d'utiliser les neuf skills à chaque fois** : pour un petit correctif CSS, `frontend-mentor` puis `code-review` peuvent suffire.

## 6. Bonnes pratiques pour demander de l'aide

Pour obtenir une réponse utile, préciser idéalement :

1. **Le contexte** : fonctionnalité, dossier, maquette ou fichier concerné.
2. **L'objectif** : ce que tu veux obtenir ou apprendre.
3. **Ton raisonnement** : ce que tu as essayé ou prévu.
4. **Le niveau d'aide** : indices, explication, revue ou réponse directe.
5. **Les limites** : « ne code rien », « ne modifie aucun fichier », « pas de commit ».

**Exemple complet :**

> `$frontend-mentor` Je reproduis la maquette `.doc/design/components/project-card/project-card.svg`. Je pensais créer un composant `ProjectCard` avec un input `project` et un output `delete`. Est-ce pertinent ? Challenge mon découpage et conseille-moi sur le layout CSS. Mode accompagnement, aucune modification de fichier.`

## 7. Démarrage et vérification

1. Demander à Codex de créer les skills et de mettre à jour `AGENTS.md` selon le prompt de configuration.
2. Vérifier que les fichiers `SKILL.md` existent et que leur en-tête YAML est valide.
3. Ouvrir une **nouvelle session Codex** si les skills ne sont pas immédiatement détectés.
4. Tester explicitement `$tech-mentor` avec une question simple.
5. Tester `$ui-ux-designer` sur **un seul composant**, puis vérifier qu'un véritable fichier image est créé dans `.doc/design/`.
6. Tester `$frontend-mentor` en lui demandant d'analyser ce fichier sans coder.
7. Ajuster les instructions des skills si Codex prend trop d'initiatives ou pose trop de questions.

> **Rappel :** l'invocation explicite `$nom-du-skill` est utile, mais la découverte automatique dépend des descriptions des skills et du fonctionnement de Codex. Les règles globales dans `AGENTS.md` servent à garder le comportement pédagogique cohérent.


## 8. Configuration GitHub pour le backlog

**Prérequis communs :** disposer d'un compte GitHub ayant accès à `GuillemotClement/Alfred`, vérifier que les Issues sont activées sur le dépôt et autoriser l'accès réseau dans l'environnement utilisé par Codex. La consultation nécessite un accès en lecture ; les créations et mises à jour nécessitent les permissions correspondantes. L'authentification technique ne remplace pas ta validation des changements.

Deux méthodes sont possibles : **GitHub CLI** ou **une intégration GitHub via un connecteur/plugin ou un serveur MCP**. Une seule suffit si elle expose les opérations nécessaires.

### Méthode 1 — GitHub CLI (`gh`)

Installer `gh` dans l'environnement où Codex exécute ses commandes, puis vérifier son authentification. Pour Alfred sous WSL, si Codex utilise WSL, vérifier `gh` dans WSL : une installation ou une connexion sous Windows ne garantit pas sa disponibilité dans cet environnement.

```sh
gh auth status
gh issue list --repo GuillemotClement/Alfred
gh issue view 12 --repo GuillemotClement/Alfred
```

`gh auth status` vérifie l'état d'authentification et indique les comptes configurés ainsi que le compte actif. Vérifier le compte attendu sur `github.com` et l'absence d'erreur. Si aucune connexion valide n'est disponible, lancer `gh auth login` et suivre le parcours d'authentification, puis relancer `gh auth status`. Ne pas afficher ni copier de jeton dans le chat ou le dépôt.

`gh issue list` liste par défaut les issues ouvertes et permet de vérifier l'accès au dépôt. `gh issue view 12` affiche l'issue numéro 12, si elle existe et est accessible ; ce numéro est un exemple. Une authentification valide ne garantit pas les droits d'écriture.

Pour rechercher aussi les doublons fermés :

```sh
gh issue list --repo GuillemotClement/Alfred --state all --search "gestion des tâches"
```

Références : [vérifier l'authentification](https://cli.github.com/manual/gh_auth_status), [lister les issues](https://cli.github.com/manual/gh_issue_list), [consulter une issue](https://cli.github.com/manual/gh_issue_view).

### Méthode 2 — Intégration GitHub dans Codex

Connecter le compte GitHub via l'intégration disponible dans ton environnement Codex (connecteur/plugin GitHub ou serveur MCP GitHub), puis autoriser l'accès au dépôt `GuillemotClement/Alfred`. Pour un serveur MCP, suivre sa documentation de configuration et d'authentification ; voir aussi la [documentation officielle OpenAI sur MCP](https://learn.chatgpt.com/docs/extend/mcp).

Vérifier les outils réellement disponibles : l'accès au code du dépôt ne garantit pas l'accès aux Issues, et une intégration en lecture seule ne permet pas leur création ou leur mise à jour. Les outils et permissions doivent couvrir les actions souhaitées.

**Vérification sans écriture :**

> Consulte les issues de `GuillemotClement/Alfred` via l'intégration GitHub et résume une issue accessible avec son numéro et son lien. Indique si les outils disponibles permettent aussi de créer et de mettre à jour des issues. Ne modifie rien.

La connexion de cette intégration est distincte de celle de `gh` : `gh auth status` vérifie uniquement GitHub CLI. Si l'intégration ne permet pas une action, Codex le signale et prépare le contenu à valider ; il peut utiliser `gh` si cette méthode est configurée et autorisée. Sans accès fonctionnel, il ne doit pas prétendre avoir consulté ou modifié GitHub.

---

**Objectif final :** utiliser Alfred comme projet fil rouge pour apprendre à concevoir, développer, tester et livrer une application, tout en conservant la maîtrise du code et des décisions.

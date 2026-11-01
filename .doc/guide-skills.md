# Guide des skills — suivi des Pull Requests

Le [guide général existant](alfred-guide-skills.md) conserve les usages des autres rôles. Cette page documente le nouveau workflow pr-update sans dupliquer leurs instructions.

Les [workflows de développement](workflows.md) présentent les parcours complets. L'[aide-mémoire](commandes-skills-alfred.md) permet de retrouver rapidement une invocation.

## Revue complète avant merge : `$pr-review`

`$pr-review` sans argument retrouve la PR de la branche courante, sa cible et ses SHA distants, puis examine tout le diff. Plusieurs PR nécessitent un choix ; sans PR, il propose une revue locale sans prétendre avoir revu une PR.

Il lit les issues explicitement associées (liens, références et mots-clés de clôture), leurs critères et décisions. Il ne déduit pas un lien d'une similarité de sujet ; sans issue identifiable, il demande sa référence. Chaque critère est relié à une preuve et un statut : VALIDÉ, PARTIEL, NON VALIDÉ ou NON VÉRIFIABLE.

`$code-review` se concentre sur la qualité technique d'un diff ; `$pr-review` confronte aussi le besoin aux modifications, aux tests et à la CI. `$qa-engineer` accompagne la stratégie et l'écriture des tests ; `$pr-review` examine les preuves et exécute les vérifications pertinentes lorsque possible, sans corriger le code. Implémenté, testé et réellement vérifié restent distincts.

Le rapport intégral dans le chat classe les problèmes en BLOQUANT, IMPORTANT ou SUGGESTION, cite les emplacements, explique les conséquences et propose des pistes. Verdict justifié : PRÊT POUR MERGE, CORRECTIONS RECOMMANDÉES, MERGE BLOQUÉ ou VALIDATION INCOMPLÈTE. Une CI verte ne remplace pas les preuves absentes.

Exemples : `$pr-review` ; `$pr-review Examine la PR #15 liée à l'issue #12.` Ces numéros sont illustratifs. Après corrections et push autorisés, relancer le skill sur la nouvelle tête.

Lecture seule par défaut : aucune publication, correction, création de commit, push, clôture d'issue ou fusion. Pour publier, demander la préparation de la publication, relire le texte exact et la cible puis les valider explicitement. Le skill revérifie la fraîcheur avant envoi et fournit le lien. Le verdict n'est pas une approbation formelle GitHub ni une garantie d'absence de bugs. Voir son [SKILL.md](../.agents/skills/pr-review/SKILL.md).

## Rôle et invocation

`$pr-update` prépare un commentaire en français sur les évolutions d'une PR. Il ne publie jamais sans validation, ne change pas la description principale et ne modifie ni code, commits, issues ou état de la PR.

Exemples :

- `$pr-update`
- `$pr-update Prépare un commentaire de suivi pour la PR #15.`
- `$pr-update Compare les commits abc123 et def456 pour la PR #15.` (références résolues et vérifiées avant utilisation).
- `$pr-update Reformule le brouillon en précisant les modifications backend.`
- Après présentation complète : « Je valide ce commentaire pour cette PR et cette plage. Publie-le. »

Il s'agit d'un workflow exécuté sur demande, sans surveillance planifiée.

## Détection de la PR

Le skill vérifie dépôt Git courant, remote et branche, puis recherche la PR associée. Il vérifie dépôt et branche source, cible, numéro, état et SHA distant. Plusieurs PR : demander laquelle. Aucune PR : signaler sans création. Une PR fermée/fusionnée nécessite de confirmer le souhait d'un suivi historique.

La tête distante de la PR est la référence d'arrivée. Les fichiers non commités et commits locaux non poussés restent exclus ; aucun push automatique.

## Point de suivi et comparaison

Le skill lit tous les commentaires de conversation, en excluant revues et annotations. Il recherche le dernier suivi contenant exactement une ligne valide :

```html
<!-- alfred-pr-update: commit=<FULL_COMMIT_SHA> -->
```

Le SHA est complet et hexadécimal. Le marqueur est invisible sur GitHub, mais présenté dans le brouillon pour validation. Ce n'est pas une signature d'auteur. Les exemples cités dans les discussions ne constituent pas des points de suivi.

Le commit doit exister localement et être ancêtre de la tête de la PR. Le dernier suivi est déterminé par création, pas par dernière édition. S'il est invalide ou introuvable, le skill ne revient pas silencieusement à un commentaire ancien.

La plage S..H couvre les évolutions après S jusqu'à H inclus, avec lecture du diff réel, de ses statistiques et du log. La synthèse regroupe les modifications utiles plutôt que recopier les messages de commit.

Au premier usage, S est le point de divergence vérifié avec la branche cible. Le skill présente la plage et demande confirmation si son origine est ambiguë.

## Commentaire et validation

Le brouillon présente modifications, détails techniques utiles, tests/vérifications établis et points d'attention, sans section vide. Les tests présents dans le code ne sont pas annoncés comme exécutés. Aucun résultat ni choix technique n'est inventé.

Avant publication, le skill affiche :

1. Dépôt et URL de PR.
2. Plage et SHA complets de départ et d'arrivée.
3. Texte intégral du commentaire, marqueur compris.
4. Demande explicite de validation.

L'invocation du skill ne vaut pas accord. Après toute correction du brouillon, la version finale doit être approuvée.

Après validation, le skill revérifie la cible, sa tête, son état et les derniers commentaires. Si la branche a changé ou un autre suivi a été publié, il signale l'écart et fait valider une nouvelle proposition. Il ne republie pas un commentaire équivalent.

Publication via les outils GitHub en priorité ; gh en repli si disponible/authentifié, avec `gh pr comment --repo <owner/repo> --body-file <fichier>`. Le texte doit rester exactement celui approuvé. Le résultat est vérifié et son URL exacte communiquée. En cas de réponse incertaine, relire avant toute reprise ; aucun nouvel envoi automatique.

## Situations particulières

| Situation | Comportement |
| --- | --- |
| Aucun nouveau commit | Aucun commentaire proposé ou publié |
| Rebase/force-push, repère non ancêtre | Expliquer, proposer une plage de remplacement et attendre validation |
| Objet absent ou historique tronqué | Récupération ciblée si autorisée ; sinon signaler la limite |
| Marqueur malformé ou suivi identifiable sans marqueur | Demander une référence validée, sans inventer de base |
| Toutes les traces du suivi ont été effacées | Détection non garantie ; utiliser une référence fournie par l'utilisateur si connue |
| Commits avec diff cumulé vide | Signaler et demander confirmation avant de proposer un commentaire |
| Résultats GitHub tronqués ou dates manquantes | Compléter la lecture/pagination, sans supposer l'ordre ou l'exhaustivité |
| Branche modifiée pendant la validation | Nouvelle proposition et nouvelle validation |
| Permissions insuffisantes ou gh absent | Conserver le brouillon et expliquer la limitation |

La vérification avant publication ne constitue pas un verrou atomique contre un push concurrent.

## Workflow Git global

Développement par l'utilisateur → vérifications → git-commit pour préparer le message → commit et push effectués seulement sur demande explicite → pr-description pour la description principale si nécessaire → PR existante → pr-update → validation du commentaire → publication → développement suivant → nouveau commit/push autorisés → pr-update.

Le skill pr-update ne réalise jamais les étapes commit/push. Les autres skills conservent leurs responsabilités et règles pédagogiques. Son [fichier d'instructions](../.agents/skills/pr-update/SKILL.md) définit le déroulement opérationnel.

# Guidelines visuelles Alfred

Statut : base visuelle retenue le 2 novembre 2026. Privilégier les valeurs de daisyUI et Tailwind ; adapter seulement si un besoin concret le justifie.

## Contexte observé

Le frontend importe Tailwind CSS et active daisyUI dans `front/src/styles.css`, sans configuration explicite de thème dans ce fichier. Leur utilisation comme base de style est désormais un choix validé.

## Direction retenue

La direction « Essentiel » de la [page d’accueil publique](pages/accueil-public/README.md) sert de référence pour la simplicité, la lisibilité et les espaces. Ses couleurs exactes et ses détails de composants ne sont pas à reproduire : les valeurs du thème daisyUI priment.

## Couleurs

- Conserver le thème daisyUI par défaut, sans palette personnalisée pour le moment.
- Utiliser `primary` pour les actions principales et `primary-content` pour leur contenu.
- Utiliser les rôles `base-100`, `base-200`, `base-300` et `base-content` pour les fonds, surfaces et textes.
- Conserver les rôles sémantiques du thème pour les informations, succès, avertissements et erreurs.
- Préférer les classes sémantiques aux couleurs codées en dur afin de pouvoir changer le thème ultérieurement.

Le nom d’un thème précis et le comportement clair/sombre ne sont pas fixés ici : le choix actuel consiste à conserver le comportement par défaut. Vérifier le rendu effectif lors de l’implémentation.

## Typographie simple

Base proposée pour répondre au souhait de simplicité : utiliser la police système sans empattements fournie par Tailwind via `font-sans`, sans téléchargement de police externe.

- Une seule famille pour les titres, textes, boutons et champs.
- Texte courant : `text-base`, avec une hauteur de ligne confortable.
- Texte secondaire : `text-sm`, sans réduire les informations essentielles.
- Titres : distinguer les niveaux par la taille et une graisse `font-semibold` ou `font-bold`.
- Adapter la taille du titre principal à l’espace disponible sur mobile.

Ces repères restent légers ; aucune échelle typographique personnalisée n’est nécessaire à ce stade.

## Composants et mise en page

- Partir des composants daisyUI existants : boutons, cartes, navigation et champs selon le besoin.
- Conserver leurs états, arrondis et styles par défaut ; éviter de recréer un composant équivalent.
- Utiliser Tailwind pour les conteneurs, grilles, alignements, espacements et adaptations responsive.
- Préférer les valeurs de l’échelle Tailwind aux dimensions arbitraires.
- Ajouter une adaptation locale seulement si le composant standard ne répond pas au besoin ; conserver des états interactifs cohérents.
- Prévoir une disposition en colonne sur mobile et élargir la composition lorsque l’espace le permet.

## Synthèse des décisions

| Sujet | État |
| --- | --- |
| Direction | Essentiel, sobre et lisible — validée |
| Couleurs | Thème daisyUI par défaut et rôle primary — validés |
| Police | Police système avec font-sans — base simple proposée |
| Espacements | Échelle Tailwind |
| Rayons, ombres et composants | Valeurs daisyUI, adaptations au besoin |
| Mise en page et responsive | Tailwind ; détails à préciser par écran |
| Logo et favicon | À concevoir séparément |

## Principes de conception

Proposer une hiérarchie lisible et des alignements cohérents. Prévoir petits écrans, contenus longs et zoom ; documenter les comportements responsive. Considérer contraste, sens non porté par la seule couleur, libellés, focus, navigation clavier et tailles des cibles. Prévoir états vide, chargement, erreur et succès quand pertinents.

Séparer propositions et décisions validées. Documenter les choix au fil des demandes ; ne pas créer un design system complet sans demande explicite. Une maquette statique ne remplace pas la vérification d'accessibilité de l'interface implémentée.

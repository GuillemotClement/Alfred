# Catalogue des maquettes

Aucune maquette n'est encore créée ni validée. Aucun lien d'image n'est ajouté avant l'existence du fichier.

Consulter les [guidelines](guidelines.md) avant de proposer une direction.

## Organisation à la première maquette

- Pages : `pages/<page>/desktop.webp`, `mobile.webp` ou `tablet.webp` selon les variantes utiles.
- Composants : `components/<component>/<nom>.svg`, WebP ou PNG selon le besoin.
- Ne créer que les dossiers correspondant à un livrable réel.

Chaque page importante possède un README précisant objectif, maquettes disponibles, sections, interactions, états et décisions. Afficher les images par chemins Markdown relatifs existants, puis les ajouter à ce catalogue.

Privilégier SVG pour les vecteurs simples, WebP pour les maquettes complexes et PNG lorsque nécessaire. Vérifier visuellement et optimiser raisonnablement les fichiers. Les conserver versionnables dans Git, sans exclusion .gitignore ; aucun commit automatique. Ne pas écraser une maquette validée sans confirmation.

## Outils et limites

ImageGen et les outils Figma sont exposés dans la session de configuration ; leur disponibilité et leur capacité d'export local doivent être revérifiées à chaque demande. Les skills applicables à ces outils doivent être lus avant utilisation. Un SVG simple peut aussi être créé directement puis rendu et inspecté.

Lors de l'inspection locale, Python est disponible ; l'environnement Python par défaut ne contient ni Pillow ni CairoSVG, et aucun exécutable magick/inkscape n'a été trouvé dans le PATH. Cela ne constitue pas un inventaire exhaustif des runtimes disponibles. Aucun rendu de maquette n'a été testé pendant cette configuration.

Un lien Figma ou une description ne remplace pas le fichier image local demandé. Sans outil adapté, exposer la limitation et proposer une alternative ; ne pas produire une page fonctionnelle pour la contourner. Une image seule ne prouve pas l'accessibilité interactive.

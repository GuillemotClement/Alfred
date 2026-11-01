# Commandes Spring Boot

[Retour au README](../../README.md) · [Documentation](../README.md)

## Commandes Spring Boot — référence pour le futur backend

Ces exemples supposent un projet Spring Boot utilisant **Maven**, avec un Maven Wrapper (`mvnw`) et un JDK compatible avec la version choisie de Spring Boot. Le choix de l’outil de build reste à confirmer lors de l’ajout du backend : ces commandes ne sont pas encore exécutables dans ce dépôt.

Depuis le dossier du backend contenant `pom.xml` et `mvnw`, sous Linux, macOS ou WSL :

```bash
# Lancer l’application en développement
./mvnw spring-boot:run

# Exécuter les tests
./mvnw test

# Nettoyer les anciens résultats, exécuter les tests et générer le JAR
./mvnw clean package
```

Sous Windows avec PowerShell, remplacer `./mvnw` par `.\mvnw.cmd`.

Pour initialiser le futur backend, [Spring Initializr](https://start.spring.io/) permet de choisir les versions et les dépendances. Voir également le [guide officiel de démarrage Spring Boot](https://spring.io/guides/gs/spring-boot/).

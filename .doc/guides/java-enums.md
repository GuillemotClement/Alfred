# Les enums Java

Fiche pédagogique pour Alfred. Les exemples ne définissent pas les rôles définitifs du projet et ne modifient pas le code applicatif.

## Pourquoi utiliser un enum ?

Un `enum` définit un type avec une liste fermée de valeurs. Il convient aux possibilités connues dans le code : rôles simples, états ou catégories fixes.

Avec une chaîne, une faute comme `"ADMN"` peut circuler jusqu’à l’exécution. Avec un enum, `Role.ADMN` provoque une erreur de compilation si la constante n’existe pas.

## Déclaration et utilisation

Dans un fichier `Role.java` :

```java
public enum Role {
    USER,
    ADMIN
}
```

Le type utilise `PascalCase` ; ses constantes utilisent `UPPER_SNAKE_CASE`. Le fichier porte le nom du type public.

```java
Role role = Role.USER;
```

`Role` est le type ; `Role.USER` est une valeur autorisée. Pas de `new Role()` ni d’ajout de constante pendant l’exécution. Un champ enum peut cependant être `null` : son type ne le rend pas automatiquement obligatoire.

## Comparaison et switch

La comparaison avec `==` convient :

```java
boolean administrator = role == Role.ADMIN;
```

Même si `role` est nul, cette comparaison renvoie `false` sans exception.

Une expression `switch` peut produire un résultat pour chaque valeur :

```java
String label = switch (role) {
    case USER -> "Utilisateur";
    case ADMIN -> "Administrateur";
};
```

Ici, `role` doit être non nul. Sans `default`, une nouvelle constante oblige à compléter ce switch lors de la recompilation, ce qui évite d’oublier son traitement.

Un rôle ne configure pas les autorisations à lui seul. Dans Alfred, le backend doit attribuer le rôle standard à l’inscription publique, sans accepter un rôle administrateur choisi par le client.

## Méthodes utiles

| Expression | Résultat |
| --- | --- |
| `Role.USER.name()` | Nom exact : `"USER"` |
| `Role.values()` | Tableau des constantes dans l’ordre de déclaration |
| `Role.valueOf("ADMIN")` | Constante `Role.ADMIN` |
| `Role.USER.ordinal()` | Position de déclaration, ici `0` |

`valueOf` exige le nom exact : `"admin"` ou `" ADMIN "` ne correspondent pas. Une valeur inconnue provoque `IllegalArgumentException`, une valeur nulle provoque `NullPointerException`. Traiter les erreurs de conversion des données externes.

Éviter `ordinal()` comme identifiant métier : réordonner les constantes changerait sa signification. Par défaut, `toString()` renvoie aussi le nom, mais peut être redéfinie ; ne pas confondre nom stable et libellé d’affichage.

Référence : [API Enum — Java 25](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Enum.html).

## Propriétés et méthodes personnalisées

Un enum peut porter des données :

```java
public enum Role {
    USER("Utilisateur"),
    ADMIN("Administrateur");

    private final String label;

    private Role(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
```

Le point-virgule termine la liste des constantes quand des membres suivent. Le constructeur initialise chaque constante ; le code appelant utilise simplement `Role.ADMIN.getLabel()`.

Préférer des propriétés immuables : chaque constante est partagée entre ses utilisateurs. Les libellés français sont illustratifs ; pour une interface multilingue, utiliser plutôt les traductions de l’application.

## Placement dans Alfred

Pour les rôles directement associés à l’utilisateur, l’emplacement discuté est :

```text
features/
  user/
    entity/
      User.java
      Role.java
```

Un champ `Role role` représente un rôle par utilisateur. Plusieurs rôles demanderaient un autre modèle, à introduire seulement si nécessaire.

## Enum, API et persistance

Déclarer un enum ne crée pas de colonne SQL ni de contrainte en base. Flyway reste responsable du schéma selon les [conventions backend](../architecture/backend.md).

Pour la persistance, préférer un nom ou code stable à la position numérique. Si les noms Java sont stockés tels quels, renommer une constante demande de traiter les données existantes et les consommateurs de l’API. Le mapping JPA sera choisi explicitement lors de l’implémentation ; il n’est pas configuré par cette fiche.

Un enum Java n’impose pas un type enum natif PostgreSQL. Les règles d’unicité et les champs obligatoires restent également des préoccupations distinctes.

## Enum ou table ?

Un enum convient à une liste petite et pilotée par le code. Préférer une table si un administrateur doit créer des rôles ou changer leurs permissions sans déployer une nouvelle version.

Pour les premiers rôles fixes d’Alfred, un enum reste un choix simple. Les noms USER et ADMIN de cette fiche sont des exemples, pas une décision sur la liste finale.

## Références complémentaires

- [Guide officiel Java : enums](https://dev.java/learn/classes-objects/enums/)
- [Spécification Java 25 : classes enum](https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.9)

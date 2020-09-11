# projet3-OpenclassRooms
Découvrez les codes sources du Projet 3 de la formation Développeur Web Junior, Openclassrooms. Réservation  de vélo en ligne avec une carte interactive de station de vélo.
Concevez une carte interactive de location de vélos
Objectif:
développer "Single page Application" pour la réservation de vélos dans une ville
L'utilisateur doit pouvoir réserver un vélo depuis son navigateur

1. Diaporama

En haut de la page un diaporama de photos et de textes
Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes
Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, ainsi qu’avec les touches gauche et droite de son clavier.

2. Carte des vélos

une carte affichant en temps réel la liste des stations de location de vélos ainsi que leur disponibilité.  

La localisation de toutes les stations de vélos est affichée à l’aide de marqueurs.

La localisation et l'état de chaque station est fourni via la plateforme OpenData de JC Decaux.
La carte doit être générée dynamiquement via un service de cartographie

3. Réservation d'un vélo

 Réserver un vélo disponible à la station sélectionnée en :

indiquant nom et prénom,
signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas.

Une fois la réservation validée,  un vélo est marqué comme réservé à cette station.
Les données de réservation seront stockées dans le navigateur à l’aide de l’API Web Storage et affichées en dessous du panneau.
Une réservation expire automatiquement au bout de 20 minutes 
Il ne peut y avoir qu'une réservation à la fois

Contraintes techniques

Le code JavaScript doit être conçu en Programmation Orientée Objet
une librairie CSS telle que Bootstrap ou pure css,
une bibliothèque telle que jQuery pour manipuler le DOM.

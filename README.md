# Invitation de mariage numérique

Site statique (HTML / CSS / JS, sans framework).

## Personnaliser
Modifiez **`config.json`** : prénoms, biographies, date, heure, lieu, programme, dress code, hébergements, contact, date limite RSVP.
Gardez aussi à jour l'objet `DEFAULT_CONFIG` en haut de `script.js` : il sert de secours si le site est ouvert sans serveur (double-clic sur le fichier).

Couleurs et polices : variables CSS en haut de `styles.css` (`:root`).

## Images (dossier `assets/`)
| Fichier | Rôle |
|---|---|
| `hero.jpg` | Fond de l'accueil (roses et alliances) |
| `marie.jpg`, `mariee.jpg` | Photos des mariés (format portrait conseillé). Si elles manquent, une illustration avec l'initiale s'affiche. |
| `couplePhoto` (config) | Facultatif : photo du couple en haut de l'invitation, fondue vers le bas |
| `music` (config) | Facultatif : ex. `assets/musique.mp3`, ce qui ajoute un bouton musique. Elle démarre à l'ouverture de l'enveloppe. |

## Liens personnalisés
- `index.html?invite=Browny%20Nze` : affiche « Pour Browny Nze » sur l'enveloppe, puis « Bonjour Browny Nze » et le nom prérempli sur le RSVP.
- `rsvp.html?invite=Browny%20Nze` : envoie directement au formulaire.
- `?intro=0` : saute l'enveloppe d'ouverture.

## Recevoir les réponses RSVP
Les réponses sont gardées dans le navigateur de l'invité (`localStorage`), ce qui bloque une deuxième réponse.
**Pour les recevoir vous-mêmes**, créez un formulaire gratuit sur https://formspree.io et collez son URL dans `config.json` → `rsvp.endpoint`.

## Déploiement
Copiez tout le dossier sur n'importe quel hébergeur statique : Netlify, GitHub Pages, OVH…

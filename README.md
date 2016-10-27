# Clipboard app

### Build
pour l'instant la taille du bundle est trop grande, il faudrait enlever babel
au runtime du main process en le pré-compilant, et faire en sorte que electron-builder
ignore les nodes modules sauf les externals dependencies.


### Inspi d'app stylées
**Now.app** : validation de compte par email. quand on clic sur le lien, le server
valid l'email, et l'app se refocus automatiquement avec un message qui dit que tout s'est bien passé.
connection socket entre l'app et le server web, la validation se fait hyper rapidement.

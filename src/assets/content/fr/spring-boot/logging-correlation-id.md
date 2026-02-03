# Logging : correlation-id et logs structurés

## Pourquoi
Quand un incident arrive, le but c’est de reconstituer **un parcours de requête** en 30 secondes :
- quel user / request ?
- quels services ?
- quelles erreurs *avec contexte* ?

## Correlation-id (principe)
- Si le client envoie `X-Correlation-Id`, tu le réutilises.
- Sinon tu en génères un.
- Tu le mets dans un contexte (ex: MDC) et tu le renvoies dans la réponse.

## Logs structurés
Format JSON > format texte :
- recherche facile
- agrégation
- alerting
- dashboards

Exemple de champs utiles :
- `timestamp`, `level`, `service`, `env`
- `correlationId`, `traceId`
- `http.method`, `http.path`, `status`
- `userId` (si non sensible), `tenantId`

## Anti-patterns
- Logguer des secrets (tokens, mots de passe)
- Logguer en info des payloads énormes
- Ne pas logguer les erreurs avec stacktrace

## Exercice
Ajoute un filtre HTTP qui :
1) lit/génère le correlation-id  
2) l’ajoute aux logs  
3) le renvoie au client

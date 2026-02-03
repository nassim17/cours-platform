# Transactional Outbox : relier DB + Kafka sans incohérences

## Quand
Tu veux garantir : **si la DB commit, alors l’événement part** (et inversement).

## Principe
1) Dans la même transaction que tes écritures métiers, tu écris une ligne dans une table `outbox`
2) Un processus publie ensuite les messages outbox vers Kafka
3) Une fois publié, tu marques la ligne comme traitée (ou tu la supprimes)

## Schéma minimal
- `id` (UUID)
- `aggregate_id`
- `type`
- `payload` (JSON)
- `created_at`
- `published_at` / `status`

## 2 implémentations
- **Polling** : un job lit l’outbox régulièrement (simple)
- **CDC** : Debezium lit le binlog/WAL et publie (plus “temps réel”)

## Points d’attention
- Idempotence côté consumer (toujours)
- Monitoring du lag outbox
- Backpressure : si Kafka est down, l’outbox grossit → alerte + rétention

# Transactional Outbox: connect DB + Kafka without inconsistencies

## When
You want: **if the DB commits, the event will be published** (and vice-versa).

## Principle
1) In the same transaction as your business writes, insert a row into an `outbox` table
2) A process publishes outbox messages to Kafka
3) Once published, mark the row as done (or delete it)

## Minimal schema
- `id` (UUID)
- `aggregate_id`
- `type`
- `payload` (JSON)
- `created_at`
- `published_at` / `status`

## Two approaches
- **Polling**: a job reads the outbox periodically (simple)
- **CDC**: Debezium reads binlog/WAL and publishes (more real-time)

## Pitfalls
- Consumer idempotency (always)
- Monitor outbox lag
- Backpressure: if Kafka is down, outbox grows → alert + retention strategy

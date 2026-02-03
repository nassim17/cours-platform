# Transactions: the basics that prevent 80% of bugs

## The classic production failure
You do 2 DB writes + publish an event. In prod you end up with:
- an event published while the DB rolled back
- or DB committed but no event (lost message)

**Key idea**: a DB transaction does not automatically “cover” Kafka.

## Propagation (Spring)
- `REQUIRED`: join existing transaction or create one
- `REQUIRES_NEW`: suspend current transaction and start a new one (powerful, risky)
- `MANDATORY`: must already run inside a transaction (fail fast)

## Isolation (quick shortcut)
- `READ_COMMITTED`: solid default
- `REPEATABLE_READ` / `SERIALIZABLE`: stricter, more locks/contention

## 3 common traps
1. **Self-invocation**: calling `this.txMethod()` bypasses Spring proxy → no `@Transactional`.
2. **Long transactions**: HTTP calls / loops / I/O inside tx = latency + locks.
3. **Retries**: without idempotency you create duplicates.

## Takeaway
- Transaction = consistency **inside the DB**
- Event = consistency **between systems**
- To bridge both: see the **Transactional Outbox** pattern (Kafka course).

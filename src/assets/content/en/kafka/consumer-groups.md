# Consumer groups & partitions: the mental model

## The simple idea
- A topic has **N partitions**
- In a **consumer group**, a partition is consumed by **at most 1 consumer** in the group

So:
- you scale up to **N consumers** (beyond that, some are idle)
- ordering is guaranteed **per partition**, not globally

## Rebalance
When a consumer joins/leaves:
- partitions are reassigned
- you can see pauses
- long processing makes it worse

## Delivery semantics (quick shortcut)
- At least once (common): duplicates can happen → handle idempotency
- Exactly once: possible but constrained; not end-to-end magic

## Good habit
Treat duplicates as normal, not as an “impossible bug”.

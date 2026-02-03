# Consumer groups & partitions : le mental model

## L’idée simple
- Un topic a **N partitions**
- Dans un **consumer group**, une partition est consommée par **au plus 1 consumer** du groupe

Donc :
- tu scales jusqu’à **N consumers** (au-delà, certains sont idle)
- l’ordering est garanti **par partition**, pas sur tout le topic

## Rebalance
Quand un consumer rejoint/quitte :
- Kafka re-répartit les partitions
- ça peut provoquer des pauses
- attention aux traitements longs

## Delivery semantics (raccourci)
- At least once (courant) : tu peux avoir des doublons → gère l’idempotence
- Exactly once : possible mais plus contraignant, pas “magique” en bout en bout

## Bon réflexe
Traite le duplicate comme un cas normal (pas un “bug impossible”).

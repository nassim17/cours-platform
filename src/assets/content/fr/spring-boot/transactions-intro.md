# Transactions : les bases qui évitent 80% des bugs

## Le problème “classique”
Tu fais 2 écritures en base + tu publies un événement. En prod, tu te retrouves avec :
- un événement publié alors que la DB a rollback
- ou la DB commit mais pas d’événement (perte)

**Idée clé** : une transaction DB ne “couvre” pas Kafka.

## Propagation (Spring)
- `REQUIRED` : rejoint la transaction en cours, sinon en crée une
- `REQUIRES_NEW` : **suspend** la transaction courante et en ouvre une nouvelle (utile, mais dangereux si mal utilisé)
- `MANDATORY` : doit déjà être dans une transaction (fail fast)

## Isolation (raccourci utile)
- `READ_COMMITTED` : bon default (évite dirty reads)
- `REPEATABLE_READ` / `SERIALIZABLE` : plus strict, plus de verrous / contention

## 3 pièges fréquents
1. **Self-invocation** : un appel `this.maMethodeTx()` ne passe pas par le proxy Spring → pas de `@Transactional`.
2. **Transactions trop longues** : appels HTTP, boucles, I/O… inside tx = latence + verrous.
3. **Retries** : si tu retries sans idempotence, tu crées des doublons.

## À retenir
- Transaction = cohérence **dans la DB**
- Événement = cohérence **entre systèmes**
- Pour relier les deux : regarde le pattern **Transactional Outbox** (cours Kafka).

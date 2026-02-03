# Logging: correlation-id and structured logs

## Why
During an incident, you want to rebuild a full request path quickly:
- which request/user?
- which services?
- which errors with enough context?

## Correlation-id (principle)
- If the client sends `X-Correlation-Id`, reuse it.
- Otherwise generate one.
- Put it into a context (e.g. MDC) and return it in the response.

## Structured logs
JSON > plain text:
- better search
- aggregation
- alerting
- dashboards

Useful fields:
- `timestamp`, `level`, `service`, `env`
- `correlationId`, `traceId`
- `http.method`, `http.path`, `status`
- `userId` (if not sensitive), `tenantId`

## Anti-patterns
- Logging secrets (tokens, passwords)
- Logging huge payloads at info level
- Missing stacktraces on errors

## Exercise
Implement an HTTP filter that:
1) reads/generates a correlation-id  
2) adds it to logs  
3) returns it to the client

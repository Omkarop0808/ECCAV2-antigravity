# FastAPI & Async Python Engineering Standards

These rules apply to Python and FastAPI backend development.

---

## 1. Architectural Structure

- Construct applications using factory functions (`create_app()`).
- Keep route handlers thin; delegate data access and mutations to dedicated service layers or repositories.
- Use explicit Pydantic v2 schemas for request validation, query parameters, and responses. Never expose raw database entities.
- Manage database connections, transactions, and authentication via FastAPI `Depends()`.

## 2. Asynchronous Execution & Non-Blocking I/O

- Every route handler performing I/O must be declared with `async def`.
- Never execute blocking system calls, synchronous HTTP requests (`requests.get`), or long-running CPU loops directly inside the async event loop. Use `asyncio.to_thread()` or background tasks for heavy compute.
- Always configure explicit timeouts on all outbound network or inter-process communication.

## 3. Dependency Injection & State

```python
@router.get("/telemetry/{event_id}", response_model=TelemetryEventResponse)
async def get_telemetry_event(
    event_id: str,
    repo: EventRepository = Depends(get_repository),
    current_operator: Operator = Depends(get_authenticated_operator),
):
    event = await repo.get_event_by_id(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
```

- Never initialize global database sessions or connection pools inside route handlers.

## 4. API Security & Sanitization

- Redact secrets, auth tokens, passwords, and sensitive internal paths from logs and JSON error payloads.
- Configure CORS with explicit, environment-specific allowed origins. Never combine `allow_origins=["*"]` with `allow_credentials=True`.
- Validate all incoming paths, value names, and registry parameters against path traversal and injection patterns.

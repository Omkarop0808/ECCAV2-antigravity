# React, TypeScript & Operator Console Architecture Standards

These standards govern frontend applications built with React, TypeScript, Vite, and modern UI stacks.

---

## 1. Container vs. Presentational Split

- **Container Components:** Manage state, subscribe to WebSockets, query REST endpoints, and handle lifecycle side effects.
- **Presentational Components:** Pure, functional, strictly typed with TypeScript interfaces. They receive props and render UI with zero side effects.

## 2. State Decision Hierarchy

1. Local UI toggles (modals, open drawers, active tabs) -> `useState` within the component.
2. Sibling communication -> Lift state to the nearest common ancestor or pass callbacks.
3. Global app telemetry (streaming alerts, network connection state) -> External lightweight store or React Context with memoized selector hooks to prevent unnecessary re-renders.
4. Server telemetry cache -> TanStack Query or dedicated service hooks.

## 3. Hook Correctness & Performance

- Never call hooks conditionally or within loops.
- Avoid derived state inside `useEffect`. Compute values during render or wrap in `useMemo` when computationally expensive:

```tsx
// BAD: Redundant effect triggering extra render pass
useEffect(() => {
  setFilteredAlerts(alerts.filter(a => a.severity === filter));
}, [alerts, filter]);

// GOOD: Computed during render with memoization
const filteredAlerts = useMemo(() => {
  return alerts.filter(a => a.severity === filter);
}, [alerts, filter]);
```

- Always clean up WebSocket connections, WebGL animation frames, and timer intervals in the `useEffect` return callback.

## 4. Component Micro-Optimization

- Wrap high-frequency list items (e.g. live packet stream, alert feed rows) in `React.memo` with custom comparison functions if needed.
- Use `key` props derived from stable unique identifiers (`uuid`, `event_id`), never array indices.

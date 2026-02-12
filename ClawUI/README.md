# ClawUI — Planning & new UI work

ClawUI connects **seamlessly** to the existing Control UI (`ui/`). New setup and onboarding views live in `ui/` and ship with the main build.

## Integration

- **Setup tab** — Added to the Control UI. "Get started" group in the nav; see `ui/src/ui/views/setup-guide.ts`.
- **Same build** — `pnpm ui:build` produces one app. No separate ClawUI deploy.
- **Same URL** — `http://127.0.0.1:18789/` (or `openclaw dashboard`).

## ClawUI scaffold (optional)

This folder has a minimal scaffold (`src/app.ts`, `vite.config.ts`) for local development or experiments. It reuses `ui/` styles for visual parity. For production, add new views to `ui/src/ui/views/` and wire them in `app-render.ts`.

```bash
pnpm claw-ui:dev   # Standalone dev at http://localhost:5174 (for experiments)
pnpm ui:dev       # Main Control UI at http://localhost:5173 (includes Setup tab)
```

See `docs/planning/UI_PLANNING.md` for the full roadmap.

---
summary: "OpenClaw UI roadmap — map CLI commands to Control UI surfaces, modals, and buttons"
read_when:
  - Planning new Control UI features or onboarding flows
  - Reducing CLI-only setup friction
title: "UI Planning"
---

# OpenClaw UI Planning

OpenClaw setup and operation are currently **CLI-heavy**. This document maps all CLI commands to UI surfaces (modals, buttons, forms) so we can progressively expose everything through the Control UI and reduce friction for new users.

## Goals

1. **Reduce setup friction** — Onboarding, config, and channel setup via UI instead of terminal.
2. **UI sets up everything** — The UI should **perform** setup for the user (forms → `config.patch`, RPC calls) — not just show CLI commands to copy. Users fill forms and click; the UI applies changes.
3. **Coverage** — Every critical CLI action has a UI equivalent (button, form, or modal).
4. **Consistency** — Reuse patterns (forms, confirmations, progress) across all surfaces.

## Current State

### Control UI coverage (today)

The Control UI (`ui/`, Vite + Lit, served at `http://127.0.0.1:18789/`) already has:

| Area      | Tab/View   | Capabilities                                                        |
| --------- | ---------- | ------------------------------------------------------------------- |
| Setup     | Setup      | "How to set up OpenClaw" guide; install, onboard, verify, channels. |
| Chat      | Chat       | `chat.send`, `chat.abort`, `chat.inject`, stream tool calls         |
| Overview  | Overview   | Gateway status, health read, entry points                           |
| Channels  | Channels   | Status, QR login, per-channel config (`config.patch`)               |
| Instances | Instances  | Presence list, refresh (`system-presence`)                          |
| Sessions  | Sessions   | List, per-session overrides (`sessions.list`, `sessions.patch`)     |
| Usage     | Usage      | Provider usage/quota                                                |
| Cron      | Cron       | List, add, edit, run, enable, disable, run history                  |
| Agents    | Agents     | List, bindings, identity                                            |
| Skills    | Skills     | Status, enable/disable, install, API key updates                    |
| Nodes     | Nodes      | List, capabilities                                                  |
| Config    | Config     | View/edit JSON, schema forms, apply, restart                        |
| Debug     | Debug      | Status/health/models, event log, manual RPC                         |
| Logs      | Logs       | Live tail, filter, export                                           |
| Update    | (in Debug) | `update.run` + restart report                                       |

See [Control UI](/web/control-ui) for details.

### CLI commands not yet in UI

Below is the full CLI surface. Items marked ✅ have UI coverage; ⬜ need UI surfaces.

---

## CLI → UI map

### Setup & onboarding

| CLI command            | UI need | Modal / button / form                                                                       |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `setup`                | ⬜      | **Modal**: Workspace path, wizard trigger; "Initialize" button                              |
| `onboard`              | ⬜      | **Wizard flow** (multi-step): auth, gateway, channels, skills. Primary entry for new users. |
| `configure`            | ⬜      | **Wizard**: models, channels, skills, gateway. Can reuse tabs but needs guided path.        |
| `config get/set/unset` | ✅      | Config tab (form + raw JSON)                                                                |
| `doctor`               | ⬜      | **Button** "Run diagnostics" + results modal/section                                        |
| `dashboard`            | N/A     | Opens UI; keep as CLI convenience                                                           |
| `reset`                | ⬜      | **Modal** with scope (config / creds+sessions / full) + confirmation                        |
| `uninstall`            | ⬜      | **Modal** service/state/workspace/app checkboxes + confirmation                             |
| `update`               | ✅      | Debug tab (Update button)                                                                   |
| `update wizard`        | ⬜      | Optional guided update flow                                                                 |

### Messaging & agent

| CLI command                                       | UI need | Modal / button / form                                      |
| ------------------------------------------------- | ------- | ---------------------------------------------------------- |
| `message send`                                    | ⬜      | **Form**: target, message, optional channel; "Send" button |
| `message read/edit/delete`                        | ⬜      | Message list + action buttons per message                  |
| `message poll`, `react`, `reactions`, `pin/unpin` | ⬜      | Channel-specific modals                                    |
| `message thread create/list/reply`                | ⬜      | Thread UI in chat context                                  |
| `message emoji/sticker upload`                    | ⬜      | Upload modal                                               |
| `message role/channel/member/voice/event`         | ⬜      | Discord-specific modals                                    |
| `agent`                                           | ✅      | Chat tab (send = agent run when delivered)                 |
| `agents list`                                     | ✅      | Agents tab                                                 |
| `agents add`                                      | ⬜      | **Modal**: name, workspace, model, bindings; "Add agent"   |
| `agents delete`                                   | ⬜      | **Button** per agent + confirmation modal                  |
| `agents set-identity`                             | ⬜      | **Form** in agent detail                                   |

### Status & health

| CLI command | UI need | Modal / button / form |
| ----------- | ------- | --------------------- |
| `status`    | ✅      | Overview / Debug      |
| `health`    | ✅      | Overview / Debug      |
| `sessions`  | ✅      | Sessions tab          |

### Gateway & system

| CLI command                                    | UI need | Modal / button / form                                         |
| ---------------------------------------------- | ------- | ------------------------------------------------------------- |
| `gateway run`                                  | N/A     | Started separately; UI connects                               |
| `gateway status/health/probe/discover`         | ✅      | Overview, Debug                                               |
| `gateway install/uninstall/start/stop/restart` | ⬜      | **Buttons** in Overview or dedicated "Service" section        |
| `gateway call`                                 | ✅      | Debug (manual RPC)                                            |
| `logs`                                         | ✅      | Logs tab                                                      |
| `system event`                                 | ⬜      | **Form**: text, mode (now / next-heartbeat); "Enqueue" button |
| `system heartbeat last/enable/disable`         | ⬜      | **Buttons** + status display                                  |
| `system presence`                              | ✅      | Instances tab                                                 |

### Models

| CLI command                               | UI need | Modal / button / form                             |
| ----------------------------------------- | ------- | ------------------------------------------------- |
| `models list`                             | ⬜      | **List view** with filters (provider, local, all) |
| `models status`                           | ⬜      | **Status panel** (auth overview, OAuth expiry)    |
| `models set`                              | ⬜      | **Dropdown/select** for primary model             |
| `models set-image`                        | ⬜      | **Dropdown** for image model                      |
| `models aliases list/add/remove`          | ⬜      | **Form** + list                                   |
| `models fallbacks list/add/remove/clear`  | ⬜      | **Form** + list                                   |
| `models image-fallbacks`                  | ⬜      | Same pattern                                      |
| `models scan`                             | ⬜      | **Button** "Scan models" + results modal          |
| `models auth add/setup-token/paste-token` | ⬜      | **Modal** per provider                            |
| `models auth order get/set/clear`         | ⬜      | **Form** per agent/provider                       |

Config tab may cover some of this via schema; dedicated Models sub-tab would help.

### Channels

| CLI command                           | UI need | Modal / button / form                                  |
| ------------------------------------- | ------- | ------------------------------------------------------ |
| `channels list`                       | ✅      | Channels tab                                           |
| `channels status`                     | ✅      | Channels tab                                           |
| `channels add`                        | ⬜      | **Modal**: channel type, account id, name, credentials |
| `channels remove`                     | ⬜      | **Button** per channel + confirmation                  |
| `channels login`                      | ✅      | QR flow in Channels                                    |
| `channels logout`                     | ⬜      | **Button** per channel                                 |
| `channels logs`                       | ⬜      | Inline or link to Logs with channel filter             |
| `pairing list`                        | ⬜      | **List** of pending pairings                           |
| `pairing approve`                     | ⬜      | **Button** per pairing + optional notify               |
| `directory self/peers/groups/members` | ⬜      | **Tab** or modal for directory browse                  |

### Plugins, hooks, skills

| CLI command                                           | UI need | Modal / button / form                            |
| ----------------------------------------------------- | ------- | ------------------------------------------------ |
| `plugins list`                                        | ⬜      | **List** (Skills tab may overlap)                |
| `plugins info`                                        | ⬜      | **Modal** per plugin                             |
| `plugins install/enable/disable`                      | ⬜      | **Buttons** + install path modal                 |
| `plugins doctor`                                      | ⬜      | **Button** "Check plugins"                       |
| `hooks list/info/check/enable/disable/install/update` | ⬜      | **Tab** similar to Skills: list, toggle, install |
| `skills list/info/check`                              | ✅      | Skills tab                                       |
| `skills enable/disable`                               | ✅      | Skills tab                                       |
| `webhooks gmail setup/run`                            | ⬜      | **Form** (account, project, topic, etc.)         |

### Nodes & devices

| CLI command                                             | UI need | Modal / button / form                    |
| ------------------------------------------------------- | ------- | ---------------------------------------- |
| `nodes list/status/describe`                            | ✅      | Nodes tab                                |
| `nodes pending`                                         | ⬜      | **List** of pending node pairings        |
| `nodes approve/reject`                                  | ⬜      | **Buttons** per request                  |
| `nodes rename`                                          | ⬜      | **Form** inline or modal                 |
| `nodes invoke/run`                                      | ⬜      | **Form**: node, command, params; "Run"   |
| `nodes notify`                                          | ⬜      | **Form**: node, title, body, options     |
| `nodes camera list/snap/clip`                           | ⬜      | **Buttons** + optional preview           |
| `nodes canvas snapshot/present/hide/navigate/eval/a2ui` | ⬜      | **Buttons** per action                   |
| `nodes screen record`                                   | ⬜      | **Form**: duration, fps, out path        |
| `nodes location get`                                    | ⬜      | **Button** "Get location"                |
| `node run/status/install/uninstall/start/stop/restart`  | ⬜      | **Buttons** for node host service        |
| `devices list`                                          | ⬜      | **List** (device pairing for Control UI) |
| `devices approve/reject`                                | ⬜      | **Buttons** per request                  |
| `devices rotate/revoke`                                 | ⬜      | **Button** per device                    |

### Cron

| CLI command                   | UI need | Modal / button / form |
| ----------------------------- | ------- | --------------------- |
| `cron status/list`            | ✅      | Cron tab              |
| `cron add`                    | ✅      | Cron tab              |
| `cron edit/rm/enable/disable` | ✅      | Cron tab              |
| `cron runs`                   | ✅      | Cron tab              |
| `cron run`                    | ✅      | Cron tab              |

### Exec approvals & security

| CLI command                      | UI need | Modal / button / form                     |
| -------------------------------- | ------- | ----------------------------------------- |
| `approvals get/set`              | ✅      | Exec approval views                       |
| `approvals allowlist add/remove` | ✅      | Exec approval views                       |
| `security audit`                 | ⬜      | **Button** "Run security audit" + results |

### Sandbox, browser, misc

| CLI command                       | UI need | Modal / button / form                             |
| --------------------------------- | ------- | ------------------------------------------------- |
| `sandbox list/recreate/explain`   | ⬜      | **Tab** or Debug section: list, recreate, explain |
| `browser status/start/stop`       | ⬜      | **Buttons**                                       |
| `browser tabs/open/focus/close`   | ⬜      | **List** + actions                                |
| `browser screenshot/snapshot`     | ⬜      | **Button** + preview                              |
| `browser navigate/click/type/...` | ⬜      | Advanced; optional "Actions" panel                |
| `dns setup`                       | ⬜      | **Form** (CoreDNS + Tailscale)                    |
| `docs [query]`                    | ⬜      | **Search** bar or link to docs                    |
| `completion`                      | N/A     | CLI-only                                          |
| `tui`                             | N/A     | Alternative terminal UI                           |
| `acp`                             | N/A     | IDE bridge                                        |
| `memory status/index/search`      | ⬜      | **Tab** or section: status, reindex, search form  |

---

## UI component inventory

To implement the above, we need:

### Modals

| Modal   | Purpose                                             | Triggers                   |
| ------- | --------------------------------------------------- | -------------------------- |
| Confirm | Destructive actions (reset, uninstall, delete)      | Buttons                    |
| Form    | Single-purpose forms (add agent, add channel, etc.) | "Add" buttons              |
| Wizard  | Multi-step flows (onboard, configure)               | Primary entry, "Configure" |
| Results | Doctor, security audit, models scan output          | "Run" buttons              |
| Preview | Screenshot, snapshot, logs export                   | Action buttons             |

### Buttons

| Button type    | Examples                            |
| -------------- | ----------------------------------- |
| Primary action | "Add agent", "Send", "Run", "Apply" |
| Secondary      | "Cancel", "Back"                    |
| Destructive    | "Delete", "Remove", "Revoke"        |
| Toggle         | Enable/disable skills, cron, hooks  |
| Refresh        | Status, presence, sessions          |

### Forms

| Form         | Fields (typical)                                  |
| ------------ | ------------------------------------------------- |
| Add agent    | Name, workspace, model, bindings                  |
| Add channel  | Channel type, account id, name, token/credentials |
| Message send | Target, message, channel                          |
| Cron add     | Name, schedule, payload                           |
| Models auth  | Provider, profile id, token                       |
| Node invoke  | Node, command, params                             |

### Tabs / views (existing + proposed)

| Tab       | Status | Notes                                 |
| --------- | ------ | ------------------------------------- |
| Chat      | ✅     | Core                                  |
| Overview  | ✅     | Gateway, health                       |
| Channels  | ✅     | Add channel modal needed              |
| Instances | ✅     |                                       |
| Sessions  | ✅     |                                       |
| Usage     | ✅     |                                       |
| Cron      | ✅     |                                       |
| Agents    | ✅     | Add/delete modals needed              |
| Skills    | ✅     |                                       |
| Nodes     | ✅     | Approve/reject, invoke, camera/canvas |
| Config    | ✅     |                                       |
| Debug     | ✅     | Doctor, security audit                |
| Logs      | ✅     |                                       |
| Models    | ⬜     | New sub-tab or Config section         |
| Hooks     | ⬜     | New tab (like Skills)                 |
| Plugins   | ⬜     | New tab or merge with Skills          |
| Devices   | ⬜     | New tab (Control UI pairing)          |
| Sandbox   | ⬜     | New section in Debug                  |
| Directory | ⬜     | New tab for peers/groups              |

---

## Implementation phases

### Phase 1: Setup friction (high impact)

1. **Onboarding wizard in UI** — Multi-step flow: API key, gateway, channels, skills. Trigger from first-load empty state.
2. **Doctor + diagnostics** — "Run diagnostics" button, results in modal or Debug.
3. **Gateway service buttons** — Start/stop/restart in Overview.
4. **Add agent modal** — Name, workspace, model, bindings.
5. **Add channel modal** — Channel type, account, credentials.

### Phase 2: Daily operations

1. **Models tab** — List, status, set primary/image, aliases, fallbacks, auth.
2. **Message send form** — Target + message from UI.
3. **Node approve/reject** — Buttons in Nodes tab.
4. **Devices tab** — List, approve, reject (for Control UI pairing).
5. **Reset / uninstall modals** — With scope selection and confirmation.

### Phase 3: Power users

1. **Hooks tab** — List, enable/disable, install.
2. **Plugins management** — Install, enable, disable.
3. **Nodes invoke / camera / canvas** — Forms and buttons.
4. **Sandbox section** — List, recreate, explain.
5. **System event / heartbeat** — Forms and buttons.

### Phase 4: Nice-to-have

1. **Directory tab** — Peers, groups, members.
2. **Browser actions** — Status, start, stop, basic actions.
3. **DNS setup form** — For wide-area discovery.
4. **Docs search** — In-app search or link.

---

## Command count summary

| Category             | Top-level commands | Subcommands (approx) | UI priority |
| -------------------- | ------------------ | -------------------- | ----------- |
| Setup/onboard        | 6                  | ~15                  | P1          |
| Messaging            | 3                  | ~25                  | P1–P2       |
| Gateway/system       | 4                  | ~15                  | P1          |
| Models               | 1                  | ~25                  | P2          |
| Channels             | 2                  | ~10                  | P1          |
| Plugins/hooks/skills | 3                  | ~15                  | P2–P3       |
| Nodes/devices        | 2                  | ~35                  | P2          |
| Cron                 | 1                  | ~10                  | ✅ Done     |
| Approvals/security   | 2                  | ~5                   | P2          |
| Sandbox/browser/misc | 4                  | ~40                  | P3–P4       |

**Rough total:** ~30 top-level commands, ~200+ subcommands/options. Many map to a single button or form field.

---

## ClawUI — What to build (new UI)

New UI development lives in `ClawUI/`. The existing Control UI (`ui/`) remains; ClawUI fills gaps and can later replace or extend it.

### Principle: UI sets up everything

The UI **performs** setup on behalf of the user. Users do not copy CLI commands — they fill forms and click buttons; the UI calls Gateway RPCs and applies config. The only steps that require terminal are:

1. **Install OpenClaw** — `curl ... | bash` or `npm install -g openclaw` (one-time, no RPC exists).
2. **Gateway service install** — `openclaw gateway install` (creates launchd/systemd); future: RPC or UI-triggered script.

Everything else — models, channels, agents, skills, cron, nodes, devices, exec approvals — is config or Gateway state. The UI uses `config.patch` / `config.apply` and existing RPCs to set it.

### How the UI sets up each function

| Function           | UI action                                                 | RPC / mechanism                                                                                    |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Models**         | Form: provider, API key/token → Apply                     | `config.patch` → `agents.defaults.model.primary`, `channels.entries` (for OAuth creds), auth store |
| **Channels**       | Add channel form → token/credentials → Apply              | `config.patch` (channels.entries). QR login: `web.login.start` + `web.login.wait`                  |
| **Agents**         | Add agent form → name, workspace, model, bindings → Apply | `config.patch` → `agents.list[]`                                                                   |
| **Gateway**        | Start/stop/restart buttons                                | Future RPC or `gateway.call`; today may need CLI fallback                                          |
| **Skills**         | Enable/disable toggles, install from ClawHub              | `config.patch` for enable; install = copy files or `npx clawhub install` (future: RPC)             |
| **Plugins**        | Install path/spec, enable/disable                         | `config.patch` → `plugins.load.paths`, `plugins.entries`; install may need CLI bridge              |
| **Hooks**          | Same as plugins                                           | `config.patch`                                                                                     |
| **Cron**           | Add/edit form → schedule, payload                         | `cron.add`, `cron.edit` (existing RPCs)                                                            |
| **Nodes**          | Approve/reject pending                                    | `devices.approve` or `node.pair.approve` (Gateway RPC)                                             |
| **Devices**        | Approve/reject Control UI pairing                         | `devices.approve` (or equivalent RPC)                                                              |
| **Exec approvals** | Allowlist form, policy dropdown                           | `config.patch` → `exec.approvals` or `exec.approvals.set` RPC                                      |
| **Config**         | Form or JSON editor → Apply                               | `config.apply` / `config.patch` (existing)                                                         |

Gaps (need new Gateway RPCs or CLI bridge): `doctor`, `gateway install/start/stop`, `plugins install`, `hooks install`, `dns setup`, `sandbox recreate`. Prioritize config-driven setup first; CLI bridge for the rest.

### Scope for ClawUI

Build the **⬜ (missing)** surfaces from the CLI map above. Consolidated checklist:

#### Setup guide for users (P1)

- [ ] **"How to set up OpenClaw" view** — In-app guide users can open anytime. Show:
  - **Prerequisites** — Node 22+, link to install docs.
  - **Install step** — Copy-paste install command (curl/PowerShell), link to [install](https://openclaw.ai/install.sh).
  - **Onboard step** — `openclaw onboard --install-daemon`, or trigger onboarding wizard from UI.
  - **Check gateway** — `openclaw gateway status` or "Check" button that pings health.
  - **Open dashboard** — `openclaw dashboard` or direct link to Control UI.
- [ ] **First-run empty state** — If not configured, show setup guide + "Get started" CTA instead of blank.
- [ ] **Help / Get started** — Persistent entry point (sidebar, header, or ? icon) to open setup guide.
- [ ] **Step-by-step checklist** — User can tick: Installed → Onboarded → Gateway running → First chat.
- [ ] **Per-function setup** — Expandable sections for Gateway, Models, Channels, Agents, Skills, Plugins, Hooks, Nodes, Devices, Cron, Exec approvals, Memory, Tailscale, DNS, Sandbox, Browser (see table below).

#### Setup & onboarding (P1)

- [ ] **Onboarding wizard** — Multi-step: API key → gateway → channels → skills. Each step **applies** config via `config.patch`; user fills forms, clicks Next, UI does the rest. First-run empty state.
- [ ] **Setup modal** — Workspace path, "Initialize" button.
- [ ] **Configure wizard** — Guided models, channels, skills, gateway.
- [ ] **Doctor button** — "Run diagnostics" + results modal.
- [ ] **Reset modal** — Scope (config / creds+sessions / full) + confirmation.
- [ ] **Uninstall modal** — Service/state/workspace/app checkboxes + confirmation.

#### Gateway & agents (P1)

- [ ] **Gateway service buttons** — Start / stop / restart in Overview.
- [ ] **Add agent modal** — Name, workspace, model, bindings.
- [ ] **Delete agent** — Per-agent button + confirmation.
- [ ] **Agent identity form** — Set identity in agent detail.

#### Channels (P1)

- [ ] **Add channel modal** — Channel type, account id, name, credentials.
- [ ] **Remove channel** — Per-channel button + confirmation.
- [ ] **Logout** — Per-channel logout button.
- [ ] **Pairing list** — Pending pairings + approve button.

#### Models (P2)

- [ ] **Models tab** — List, status, auth overview, OAuth expiry.
- [ ] **Primary model dropdown** — Set default text model.
- [ ] **Image model dropdown** — Set default image model.
- [ ] **Aliases / fallbacks** — List + add/remove forms.
- [ ] **Models scan button** — Trigger scan + results modal.
- [ ] **Auth modal** — Per provider (setup-token, paste-token).

#### Messaging (P2)

- [ ] **Message send form** — Target, message, optional channel.
- [ ] **Message read/edit/delete** — List + actions per message.

#### Nodes & devices (P2)

- [ ] **Nodes pending** — List + approve/reject buttons.
- [ ] **Node rename** — Inline form or modal.
- [ ] **Node invoke form** — Node, command, params.
- [ ] **Node notify form** — Title, body, options.
- [ ] **Camera / canvas / screen** — Buttons for snap, clip, record, etc.
- [ ] **Location button** — Get location from node.
- [ ] **Node host service buttons** — Run, install, start, stop.
- [ ] **Devices tab** — List, approve, reject, rotate, revoke.

#### Plugins, hooks (P2–P3)

- [ ] **Plugins tab** — List, info modal, install/enable/disable.
- [ ] **Plugins doctor** — "Check plugins" button.
- [ ] **Hooks tab** — List, enable/disable, install (like Skills).
- [ ] **Webhooks Gmail form** — Account, project, topic, etc.

#### System & misc (P2–P4)

- [ ] **System event form** — Text, mode (now / next-heartbeat).
- [ ] **Heartbeat buttons** — Last, enable, disable.
- [ ] **Security audit button** — Run audit + results.
- [ ] **Sandbox section** — List, recreate, explain.
- [ ] **Browser buttons** — Status, start, stop, basic actions.
- [ ] **DNS setup form** — CoreDNS + Tailscale.
- [ ] **Memory tab** — Status, reindex, search form.
- [ ] **Directory tab** — Peers, groups, members.

### ClawUI tech & structure

**Setup is integrated into the Control UI.** The "Get started" → Setup tab lives in `ui/` and ships with `pnpm ui:build`. One app, one URL (`openclaw dashboard`).

| Item             | Notes                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Location**     | New views in `ui/src/ui/views/`. ClawUI/ for planning and optional standalone experiments. |
| **Gateway**      | Same WebSocket as Control UI (port 18789). Reuse `config.*`, `chat.*`, `cron.*` RPCs.      |
| **Stack**        | Same as Control UI: Vite 7, Lit 3.                                                         |
| **Build output** | `dist/control-ui/` (single build). ClawUI scaffold: `dist/claw-ui/` if built separately.   |

### Visual parity with Control UI

ClawUI must **look identical** to the existing Control UI (`ui/`). Reuse the same design system:

| Aspect             | Control UI source                                        | ClawUI usage                                                |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------------- |
| **Stack**          | Vite 7, Lit 3                                            | Same                                                        |
| **Fonts**          | Space Grotesk, JetBrains Mono                            | Import same Google Fonts URL                                |
| **Design tokens**  | `ui/src/styles/base.css` (`:root` variables)             | Import from `../ui/src/styles/base.css` or alias            |
| **Layout**         | `ui/src/styles/layout.css` (shell, topbar, nav, content) | Same classes: `.shell`, `.topbar`, `.nav`, `.content`       |
| **Components**     | `ui/src/styles/components.css` (card, stat, btn, input)  | Same                                                        |
| **Config styles**  | `ui/src/styles/config.css`                               | For config forms                                            |
| **Theme**          | `data-theme="light"` / dark default                      | Same                                                        |
| **Custom element** | `<openclaw-app>`                                         | ClawUI can use `<claw-ui-app>` or extend; same shell layout |

**Implementation:** ClawUI's Vite config aliases `@openclaw/ui-styles` → `../ui/src/styles`. Main entry imports:

```css
@import "@openclaw/ui-styles/base.css";
@import "@openclaw/ui-styles/layout.css";
@import "@openclaw/ui-styles/layout.mobile.css";
@import "@openclaw/ui-styles/components.css";
@import "@openclaw/ui-styles/config.css";
```

**Layout structure** (match `ui/` shell):

```
.shell
  .topbar          (logo, nav toggle, theme, settings)
  .nav             (sidebar: Chat, Control, Agent, Settings tabs)
  .content         (main view area)
```

**Key CSS variables:** `--bg`, `--card`, `--text`, `--accent` (#ff5c5c), `--border`, `--radius`, `--font-body`, `--shadow-*`. See `ui/src/styles/base.css`.

### Setup guide — user-facing UX

The "How to set up OpenClaw" guide should be a dedicated view (tab or modal) users see when they need help. **Where possible, the UI performs setup** — user fills a form and clicks; the UI applies changes. Steps:

| Section                  | Content                                                                                                           | UI does it?   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------- |
| **Prerequisites**        | Node 22+. Link: [docs.openclaw.ai/install](https://docs.openclaw.ai/install).                                     | No (external) |
| **1. Install**           | Install command for OS (curl/PowerShell). Copy button. One-time; no RPC.                                          | No            |
| **2. Onboard**           | "Start wizard" button → multi-step wizard that **applies** API key, gateway, channels, skills via `config.patch`. | Yes           |
| **3. Verify gateway**    | "Check status" button → calls `health` RPC.                                                                       | Yes           |
| **4. Open UI**           | "Open dashboard" button (opens `http://127.0.0.1:18789/`).                                                        | Yes           |
| **Channels**             | "Add channel" → form or QR flow; UI applies via `config.patch` + `web.login.*`.                                   | Yes           |
| **Models, agents, etc.** | Per-function tabs/forms; each applies via `config.patch` or RPC.                                                  | Yes           |

Show this guide when: first load + no config, user clicks "Get started" / "?", or explicit "Setup help" in nav.

### How to set up every function (ClawUI content)

The ClawUI should expose a **"Setup guide"** that links to per-function setup. Each area below = one expandable section or sub-page. **The UI action is the primary path** — users set up via forms/buttons; CLI is fallback or for terminal-first users.

| Function           | What it does                                         | How to set up (CLI fallback)                                                     | Config keys                                                                                  | UI sets it up (primary)             |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Gateway**        | Runs the WebSocket server; all clients connect to it | `openclaw gateway run` (foreground) or `openclaw gateway install` then `start`   | `gateway.port`, `gateway.bind`, `gateway.auth`                                               | Start/stop/restart buttons          |
| **Models**         | AI provider + model selection                        | `openclaw onboard` or `openclaw models auth add`; `models set <id>`              | `agents.defaults.model.primary`, `agents.defaults.model.fallbacks`, `agents.defaults.models` | Models tab: list, set primary, auth |
| **Channels**       | WhatsApp, Telegram, Discord, etc.                    | `openclaw channels add --channel <name>`; `openclaw channels login` for WhatsApp | `channels.entries.<channel>.<account>`                                                       | Add channel modal, QR login         |
| **Agents**         | Isolated workspaces with own model/bindings          | `openclaw agents add [name]`                                                     | `agents.list[]`, `agents.defaults`                                                           | Add agent modal                     |
| **Skills**         | Teach agent tools (ClawHub, local packs)             | Install via `clawhub install <slug>` or copy to `~/.openclaw/skills`             | `skills.load.extraDirs`                                                                      | Skills tab: enable/disable, install |
| **Plugins**        | Extensions (channels, providers)                     | `openclaw plugins install <path-or-npm>`; `plugins enable <id>`                  | `plugins.load.paths`, `plugins.entries.<id>.enabled`                                         | Plugins tab: install, toggle        |
| **Hooks**          | Pre/post agent hooks                                 | `openclaw hooks install <path-or-npm>`; `hooks enable <name>`                    | `hooks.entries.<name>.enabled`                                                               | Hooks tab: list, toggle             |
| **Nodes**          | Paired devices (iOS/Android/macOS)                   | Install app, pair via device approval; `openclaw node run` for headless host     | Device pairing store                                                                         | Nodes tab: approve/reject           |
| **Devices**        | Browser/Control UI pairing                           | `openclaw devices approve <requestId>`                                           | Device pairing store                                                                         | Devices tab: list, approve          |
| **Cron**           | Scheduled jobs, wakeups                              | `openclaw cron add --name X --cron "0 7 * * *" ...`                              | `~/.openclaw/cron/` (persisted)                                                              | Cron tab: add, edit, run            |
| **Exec approvals** | Allow shell commands on gateway/node                 | `openclaw approvals set gateway ask`; `approvals allowlist add <pattern>`        | `~/.openclaw/exec-approvals.json`                                                            | Exec approvals view                 |
| **Memory**         | Vector search over MEMORY.md                         | `openclaw memory index`; `memory search "<query>"`                               | Workspace `MEMORY.md`, `memory/*.md`                                                         | Memory tab: index, search           |
| **Tailscale**      | Remote access without SSH                            | `openclaw gateway --tailscale serve`                                             | `gateway.auth.allowTailscale`, `gateway.tailscale`                                           | Overview: Tailscale status          |
| **DNS discovery**  | Wide-area gateway discovery                          | `openclaw dns setup --apply` (CoreDNS + Tailscale)                               | CoreDNS config                                                                               | DNS setup form                      |
| **Sandbox**        | Isolated exec environment                            | `openclaw sandbox list`; recreate if needed                                      | Docker/image config                                                                          | Sandbox section in Debug            |
| **Browser**        | Dedicated Chrome for agent                           | `openclaw browser start`                                                         | Browser profile path                                                                         | Browser status/start                |

**Per-channel setup (quick ref):**

| Channel  | Setup command                                             | Key requirement                         |
| -------- | --------------------------------------------------------- | --------------------------------------- |
| WhatsApp | `channels add --channel whatsapp`; `channels login`       | QR scan                                 |
| Telegram | `channels add --channel telegram --token <BOT_TOKEN>`     | Bot token from @BotFather               |
| Discord  | `channels add --channel discord --token <TOKEN>`          | Bot token from Discord Developer Portal |
| Slack    | `channels add --channel slack`                            | OAuth app install                       |
| Signal   | `channels add --channel signal`                           | signal-cli + number                     |
| iMessage | BlueBubbles server + `channels add --channel bluebubbles` | BlueBubbles on Mac                      |

**Docs links for each function:** [Install](https://docs.openclaw.ai/install), [Channels](https://docs.openclaw.ai/channels), [Models](https://docs.openclaw.ai/concepts/models), [Nodes](https://docs.openclaw.ai/nodes), [Cron](https://docs.openclaw.ai/automation/cron-jobs), [Skills](https://docs.openclaw.ai/tools/skills), [Plugins](https://docs.openclaw.ai/tools/plugin).

### File structure (suggested)

```
ClawUI/
├── README.md
├── package.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.ts
    ├── app.ts
    ├── components/     # Reusable: Modal, Button, Form, Wizard
    ├── views/          # Per-tab: SetupGuide, Onboard, Agents, Channels, Models, etc.
    ├── controllers/    # Gateway RPC, state
    └── styles/
```

### Integration notes

- **Gateway RPC** — Same methods as Control UI: `config.get`, `config.patch`, `config.apply`, `chat.send`, `cron.add`, `channels.status`, `node.list`, etc. See [RPC reference](/reference/rpc).
- **Auth** — Reuse `connect.params.auth.token` / `password` for WebSocket handshake.
- **Device pairing** — New devices need approval via `openclaw devices approve` (CLI) until Devices tab exists.

---

## References

- [Control UI](/web/control-ui) — What the UI does today
- [Dashboard](/web/dashboard) — Access and auth
- [CLI reference](/cli/index) — Full command reference
- [RPC reference](/reference/rpc) — Gateway WebSocket methods
- Source: `ui/` (existing). New UI: `ClawUI/`.

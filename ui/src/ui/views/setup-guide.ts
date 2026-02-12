import { html } from "lit";

export function renderSetupGuide() {
  return html`
    <div class="card">
      <h2 class="card-title">How to set up OpenClaw</h2>
      <p class="card-sub">
        Follow these steps to get OpenClaw running. Use the tabs above to configure channels, models,
        and agents after the basics are in place.
      </p>

      <div class="stat-card" style="margin-top: 24px; display: grid; gap: 16px">
        <div class="card">
          <div class="card-title">1. Prerequisites</div>
          <p class="card-sub">
            Node 22 or newer. Check with <code class="mono">node --version</code>. See
            <a href="https://docs.openclaw.ai/install" target="_blank" rel="noreferrer">Install docs</a
            >.
          </p>
        </div>

        <div class="card">
          <div class="card-title">2. Install OpenClaw</div>
          <p class="card-sub">Run once (macOS/Linux):</p>
          <code
            class="mono"
            style="
              display: block;
              padding: 12px;
              background: var(--bg-elevated);
              border-radius: var(--radius-md);
              margin-top: 8px;
            "
            >curl -fsSL https://openclaw.ai/install.sh | bash</code
          >
          <p class="card-sub" style="margin-top: 8px">
            Windows:
            <a href="https://docs.openclaw.ai/install" target="_blank" rel="noreferrer"
              >PowerShell installer</a
            >.
          </p>
        </div>

        <div class="card">
          <div class="card-title">3. Onboard</div>
          <p class="card-sub">
            Run <code class="mono">openclaw onboard --install-daemon</code> in a terminal. It configures
            API keys, gateway, and optional channels. Then use the <strong>Channels</strong>,
            <strong>Config</strong>, and <strong>Overview</strong>
            tabs here to adjust settings.
          </p>
        </div>

        <div class="card">
          <div class="card-title">4. Verify gateway</div>
          <p class="card-sub">
            If you see <strong>Health OK</strong> in the top bar, the gateway is running. Use
            <strong>Overview</strong> to check status, or run
            <code class="mono">openclaw gateway status</code> in a terminal.
          </p>
        </div>

        <div class="card">
          <div class="card-title">5. Add channels (optional)</div>
          <p class="card-sub">
            Open the <strong>Channels</strong> tab to add WhatsApp, Telegram, Discord, or others.
            WhatsApp uses QR login; others use tokens. See
            <a href="https://docs.openclaw.ai/channels" target="_blank" rel="noreferrer"
              >Channels docs</a
            >.
          </p>
        </div>
      </div>
    </div>
  `;
}

import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("claw-ui-app")
export class ClawUiApp extends LitElement {
  @state() tab = "setup";

  render() {
    return html`
      <div class="shell">
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <div class="brand-logo">
                <img src="/favicon.svg" alt="OpenClaw" />
              </div>
              <div class="brand-text">
                <div class="brand-title">OPENCLAW</div>
                <div class="brand-sub">Setup</div>
              </div>
            </div>
          </div>
          <div class="topbar-status">
            <div class="pill">
              <span class="statusDot"></span>
              <span>Setup UI</span>
            </div>
          </div>
        </header>
        <nav class="nav">
          <a class="nav-item active" href="#">
            <span class="nav-item__text">Setup</span>
          </a>
          <a class="nav-item" href="#">
            <span class="nav-item__text">Get started</span>
          </a>
        </nav>
        <main class="content">
          <div class="card">
            <h2 class="card-title">Welcome to OpenClaw</h2>
            <p class="card-sub">Use this UI to set up OpenClaw. Same look as the Control UI.</p>
          </div>
        </main>
      </div>
    `;
  }
}

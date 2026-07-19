import { repositoryUrls, type SiteContent } from "../i18n";
import { ThemeControl } from "./theme-control";

export function LandingPage({ content }: { content: SiteContent }) {
  return (
    <main>
      <nav className="nav" aria-label={content.navLabel}>
        <a className="brand" href="#top" aria-label={content.homeLabel}>
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>AetherIoT</span>
        </a>
        <div className="repo-nav" aria-label={content.repositoriesLabel}>
          <a className="repo-link" href={repositoryUrls.edge}>
            <span aria-hidden="true">01</span>
            <strong>AetherEdge</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="repo-link" href={repositoryUrls.cloud}>
            <span aria-hidden="true">02</span>
            <strong>AetherCloud</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="repo-link" href={repositoryUrls.contracts}>
            <span aria-hidden="true">03</span>
            <strong>AetherContracts</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="site-controls">
          <a
            className="locale-link"
            href={content.alternateHref}
            hrefLang={content.alternateLocale}
            aria-label={content.switchLanguageLabel}
          >
            {content.alternateLabel}
          </a>
          <ThemeControl locale={content.locale} label={content.themeLabel} />
          <a className="nav-cta" href={content.docsHome}>
            {content.docsLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> {content.hero.status}
          </p>
          <h1>
            <span className="hero-line hero-line-solid">
              {content.hero.lineOne}
            </span>
            <span className="hero-line hero-line-outline">
              {content.hero.lineTwo}
            </span>
          </h1>
          <p className="hero-lede">{content.hero.lede}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={content.aiNativeUrl}>
              {content.hero.action} <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-note">{content.hero.note}</p>
        </div>

        <section className="home-scene" aria-label={content.homeScene.ariaLabel}>
          <header className="home-scene-head">
            <span>{content.homeScene.label}</span>
            <span className="home-local-status">
              <span aria-hidden="true" /> {content.homeScene.localStatus}
            </span>
          </header>

          <p className="home-scene-disclaimer">
            {content.homeScene.disclaimer}
          </p>

          <blockquote className="home-goal">
            <small>{content.homeScene.goalLabel}</small>
            <p>{content.homeScene.goal}</p>
          </blockquote>

          <ul className="device-grid">
            {content.homeScene.devices.map((device) => (
              <li className="device-card" key={device.name}>
                <span
                  className={`device-icon device-icon-${device.kind}`}
                  aria-hidden="true"
                />
                <span className="device-copy">
                  <small>{device.room}</small>
                  <strong>{device.name}</strong>
                  <span>{device.detail}</span>
                </span>
                <strong className="device-value">{device.value}</strong>
              </li>
            ))}
          </ul>

          <div className="automation-result">
            <div>
              <small>{content.homeScene.resultLabel}</small>
              <strong>{content.homeScene.resultTitle}</strong>
              <p>{content.homeScene.result}</p>
            </div>
            <div className="automation-checks">
              {content.homeScene.checks.map((check) => (
                <span key={check}>{check}</span>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="proof-strip" aria-label={content.proofLabel}>
        {content.proof.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section why" id="why">
        <div className="section-heading">
          <p className="eyebrow">{content.why.eyebrow}</p>
          <h2>{content.why.title}</h2>
          <p>{content.why.body}</p>
        </div>
        <div className="capability-grid">
          {content.why.capabilities.map((capability) => (
            <article className="capability-card" key={capability.index}>
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-rule" aria-hidden="true" />
        <p className="eyebrow">{content.principle.eyebrow}</p>
        <blockquote>
          {content.principle.lead}
          <strong>{content.principle.strong}</strong>
        </blockquote>
        <div className="manifesto-tags" aria-label={content.principle.tagsLabel}>
          {content.principle.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{content.platform.eyebrow}</p>
            <h2>{content.platform.title}</h2>
          </div>
          <p>{content.platform.body}</p>
        </div>
        <div className="layer-list">
          {content.platform.layers.map((layer, index) => (
            <a className="layer-card" href={layer.href} key={layer.title}>
              <span className="layer-index">0{index + 1}</span>
              <div>
                <p>{layer.eyebrow}</p>
                <h3>{layer.title}</h3>
              </div>
              <p className="layer-copy">{layer.copy}</p>
              <span className="layer-cta">
                {layer.cta} <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
        <a className="solution-card" href={repositoryUrls.ems}>
          <span>{content.platform.solutionLabel}</span>
          <strong>AetherEMS</strong>
          <p>{content.platform.solution}</p>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section documentation" id="documentation">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{content.documentation.eyebrow}</p>
            <h2>{content.documentation.title}</h2>
          </div>
          <p>{content.documentation.body}</p>
        </div>
        <div className="docs-grid">
          {content.documentation.items.map((item) => (
            <a className="docs-card" href={item.href} key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section quickstart">
        <div className="quickstart-copy">
          <p className="eyebrow">{content.quickstart.eyebrow}</p>
          <h2>{content.quickstart.title}</h2>
          <p>{content.quickstart.body}</p>
          <a href={content.docsHome}>
            {content.quickstart.action} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="terminal" aria-label={content.quickstart.terminalLabel}>
          <div className="terminal-head">
            <span className="terminal-dots" aria-hidden="true">
              ● ● ●
            </span>
            <span>{content.quickstart.terminalLabel}</span>
          </div>
          <pre>
            <code>
              <span className="prompt">$</span> git clone{" "}
              <span className="code-accent">
                github.com/EvanL1/AetherEdge
              </span>
              {"\n"}
              <span className="prompt">$</span> cd AetherEdge{"\n"}
              <span className="prompt">$</span> cargo run -p{" "}
              <span className="code-accent">
                aether-example-minimal-gateway
              </span>
              {"\n\n"}
              <span className="code-muted">{content.quickstart.comment}</span>
            </code>
          </pre>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-orbit" aria-hidden="true" />
        <p className="eyebrow">{content.closing.eyebrow}</p>
        <h2>{content.closing.title}</h2>
        <p>{content.closing.body}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={content.aiNativeUrl}>
            {content.closing.primary} <span aria-hidden="true">→</span>
          </a>
          <a className="button button-secondary" href={content.docsHome}>
            {content.closing.secondary} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>AetherIoT</span>
        </a>
        <p>{content.footerLine}</p>
        <div>
          <a href={repositoryUrls.edge}>AetherEdge</a>
          <a href={repositoryUrls.cloud}>AetherCloud</a>
          <a href={repositoryUrls.contracts}>AetherContracts</a>
          <a href={repositoryUrls.ems}>AetherEMS</a>
          <a href={content.docsHome}>{content.footerDocs}</a>
        </div>
      </footer>
    </main>
  );
}

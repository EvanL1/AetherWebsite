const edgeUrl = "https://github.com/EvanL1/AetherEdge";
const docsUrl = "https://docs.aetheriot.workers.dev/";
const quickstartUrl =
  "https://docs.aetheriot.workers.dev/aetheredge/";
const cloudUrl = "https://github.com/EvanL1/AetherCloud";
const contractsUrl = "https://github.com/EvanL1/AetherContracts";
const emsUrl = "https://github.com/EvanL1/AetherEMS";

const capabilities = [
  {
    index: "01",
    title: "Keep the edge in control",
    body: "Acquisition, deterministic rules, alarms, history, and safety keep running locally—even when the cloud or an AI client disappears.",
  },
  {
    index: "02",
    title: "Give AI a governed boundary",
    body: "Agents, CLIs, and applications use the same typed command and query layer. Device control stays deny-by-default, confirmed, and audited.",
  },
  {
    index: "03",
    title: "Connect cloud without surrendering authority",
    body: "Use broker-neutral CloudLink foundations and public contracts while the edge remains authoritative for live state and physical execution.",
  },
] as const;

const layers = [
  {
    eyebrow: "OPEN-SOURCE EDGE",
    title: "AetherEdge",
    copy: "A Linux edge kernel, six-service runtime, and Rust SDK for reliable field applications.",
    href: edgeUrl,
    cta: "Explore the edge runtime",
  },
  {
    eyebrow: "MULTI-CLOUD CONTROL",
    title: "AetherCloud",
    copy: "An evolving cloud-side fusion and control plane that preserves provider-native capabilities.",
    href: cloudUrl,
    cta: "See the cloud foundation",
  },
  {
    eyebrow: "PUBLIC INTEROPERABILITY",
    title: "AetherContracts",
    copy: "Language-neutral schemas, fixtures, profiles, and executable contract evidence.",
    href: contractsUrl,
    cta: "Inspect the contracts",
  },
] as const;

const documentation = [
  {
    title: "Overview",
    copy: "Product boundaries, authority, deployments, and user journeys.",
    href: `${docsUrl}overview/platform/`,
  },
  {
    title: "AetherEdge",
    copy: "Install and build with the edge runtime, Kernel, CLI, and SDK.",
    href: `${docsUrl}aetheredge/`,
  },
  {
    title: "AetherCloud",
    copy: "Understand the cloud fusion and governed control plane.",
    href: `${docsUrl}aethercloud/`,
  },
  {
    title: "AetherContracts",
    copy: "Use the shared protocol, schemas, fixtures, and TCK.",
    href: `${docsUrl}aethercontracts/`,
  },
  {
    title: "Tutorials",
    copy: "Follow complete Edge → Contracts → Cloud workflows.",
    href: `${docsUrl}tutorials/edge-contracts-cloud/`,
  },
  {
    title: "Compatibility",
    copy: "Choose tested product and contract version combinations.",
    href: `${docsUrl}compatibility/version-matrix/`,
  },
  {
    title: "Roadmap",
    copy: "Separate implemented, experimental, and planned capabilities.",
    href: `${docsUrl}roadmap/status/`,
  },
] as const;

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="AetherIoT home">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>AetherIoT</span>
        </a>
        <div className="repo-nav" aria-label="Project repositories">
          <a className="repo-link" href={edgeUrl}>
            <span aria-hidden="true">01</span>
            <strong>AetherEdge</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="repo-link" href={cloudUrl}>
            <span aria-hidden="true">02</span>
            <strong>AetherCloud</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="repo-link" href={contractsUrl}>
            <span aria-hidden="true">03</span>
            <strong>AetherContracts</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a className="nav-cta" href={docsUrl}>
          Docs <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> OPEN SOURCE · BETA
          </p>
          <h1>
            <span className="hero-line hero-line-solid">
              The cloud can wait.
            </span>
            <span className="hero-line hero-line-outline">
              The edge cannot.
            </span>
          </h1>
          <p className="hero-lede">
            AetherIoT is the open-source IoT platform for reliable edge
            operation, governed cloud coordination, and portable public
            contracts—with or without cloud and AI.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={quickstartUrl}>
              Start building <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-note">MIT or Apache-2.0 · Linux edge · Rust 1.90+</p>
        </div>

        <div className="edge-visual" aria-label="Edge-first architecture">
          <div className="visual-label">LIVE SYSTEM</div>
          <div className="visual-row visual-row-devices">
            <div className="node node-small">
              <span className="node-light" /> FIELD DEVICES
            </div>
            <div className="flow-line" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="edge-node">
            <div className="edge-node-head">
              <span>AETHER EDGE</span>
              <span className="healthy">● HEALTHY</span>
            </div>
            <div className="edge-node-core">
              <div className="pulse-rings" aria-hidden="true">
                <span className="pulse-core">A</span>
              </div>
              <div>
                <strong>Local authority</strong>
                <small>SHM · SQLite · governed commands</small>
              </div>
            </div>
            <div className="service-grid">
              <span>IO</span>
              <span>RULES</span>
              <span>ALARMS</span>
              <span>HISTORY</span>
            </div>
          </div>
          <div className="cloud-path">
            <div className="flow-line vertical" aria-hidden="true">
              <span />
            </div>
            <div className="node cloud-node">
              <span>OPTIONAL CLOUDLINK</span>
              <small>Disconnected? Edge continues.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Product proof points">
        <div>
          <strong>3</strong>
          <span>composable platform products</span>
        </div>
        <div>
          <strong>0</strong>
          <span>required cloud services</span>
        </div>
        <div>
          <strong>1</strong>
          <span>governed application boundary</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>local-first operation</span>
        </div>
      </section>

      <section className="section why" id="why">
        <div className="section-heading">
          <p className="eyebrow">WHY AETHER</p>
          <h2>Build for the world that actually exists.</h2>
          <p>
            Networks fail. Cloud providers change. AI clients come and go.
            Physical operations still need deterministic, inspectable behavior.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
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
        <p className="eyebrow">THE OPERATING PRINCIPLE</p>
        <blockquote>
          “AI may propose. Cloud may coordinate.
          <strong> The edge makes the final call.</strong>”
        </blockquote>
        <div className="manifesto-tags" aria-label="Operating principles">
          <span>EDGE AUTHORITY</span>
          <span>DENY BY DEFAULT</span>
          <span>EXPLICIT AUDIT</span>
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">ONE COHERENT STACK</p>
            <h2>Edge, cloud, and contracts—without blurred authority.</h2>
          </div>
          <p>
            AetherIoT is the shared project identity. Each product has one job,
            and public contracts connect them without turning cloud convenience
            into a physical safety dependency.
          </p>
        </div>
        <div className="layer-list">
          {layers.map((layer, index) => (
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
        <a className="solution-card" href={emsUrl}>
          <span>INDUSTRY SOLUTION</span>
          <strong>AetherEMS</strong>
          <p>
            An energy-management solution built on the AetherIoT platform,
            separate from its industry-neutral core products.
          </p>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section documentation" id="documentation">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">ONE DOCUMENTATION HOME</p>
            <h2>Start with the platform. Go as deep as you need.</h2>
          </div>
          <p>
            One navigation model connects product concepts, complete tutorials,
            compatibility evidence, and an honest delivery roadmap.
          </p>
        </div>
        <div className="docs-grid">
          {documentation.map((item) => (
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
          <p className="eyebrow">NO HARDWARE REQUIRED</p>
          <h2>Run your first gateway composition.</h2>
          <p>
            Start with an empty, industry-neutral gateway. Add devices and a
            domain Pack only when your application needs them.
          </p>
          <a href={docsUrl}>
            Read the documentation <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="terminal" aria-label="Terminal quickstart command">
          <div className="terminal-head">
            <span className="terminal-dots" aria-hidden="true">● ● ●</span>
            <span>QUICKSTART</span>
          </div>
          <pre>
            <code>
              <span className="prompt">$</span> git clone{" "}
              <span className="code-accent">github.com/EvanL1/AetherEdge</span>
              {"\n"}
              <span className="prompt">$</span> cd AetherEdge{"\n"}
              <span className="prompt">$</span> cargo run -p{" "}
              <span className="code-accent">
                aether-example-minimal-gateway
              </span>
              {"\n\n"}
              <span className="code-muted">
                # local composition · no broker · no cloud · no device
              </span>
            </code>
          </pre>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-orbit" aria-hidden="true" />
        <p className="eyebrow">BUILD FROM THE EDGE OUT</p>
        <h2>Your next IoT system should survive the internet.</h2>
        <p>
          Explore the beta, run the examples, and help shape a safer edge-first
          foundation.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={quickstartUrl}>
            Get started <span aria-hidden="true">→</span>
          </a>
          <a className="button button-secondary" href={docsUrl}>
            Read the docs <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>AetherIoT</span>
        </a>
        <p>One platform. Edge authority. Open contracts.</p>
        <div>
          <a href={edgeUrl}>AetherEdge</a>
          <a href={cloudUrl}>AetherCloud</a>
          <a href={contractsUrl}>AetherContracts</a>
          <a href={emsUrl}>AetherEMS</a>
          <a href={docsUrl}>Documentation</a>
        </div>
      </footer>
    </main>
  );
}

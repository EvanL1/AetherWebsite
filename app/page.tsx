const edgeUrl = "https://github.com/EvanL1/AetherEdge";
const docsUrl = "https://docs.aetheriot.workers.dev/";
const aiNativeUrl =
  "https://docs.aetheriot.workers.dev/overview/ai-native-platform/";
const cloudUrl = "https://github.com/EvanL1/AetherCloud";
const contractsUrl = "https://github.com/EvanL1/AetherContracts";
const emsUrl = "https://github.com/EvanL1/AetherEMS";

const capabilities = [
  {
    index: "01 · DIRECTION",
    title: "Start with human intent",
    body: "The product direction replaces configuration screens with conversation: describe the outcome, constraints, and duration instead of programming devices by hand.",
  },
  {
    index: "02 · FOUNDATION",
    title: "Compile intent into governed change",
    body: "Typed capabilities, revisions, permissions, confirmation, and audit turn model output into inspectable artifacts—not direct device calls.",
  },
  {
    index: "03 · AVAILABLE",
    title: "Execute without the model",
    body: "AetherEdge runs commissioned acquisition, rules, alarms, history, and safety locally, even when the agent, cloud, or internet disappears.",
  },
] as const;

const layers = [
  {
    eyebrow: "DETERMINISTIC EDGE",
    title: "AetherEdge",
    copy: "The Linux runtime that owns live state and executes commissioned behavior without placing an LLM in the real-time loop.",
    href: edgeUrl,
    cta: "Explore the edge runtime",
  },
  {
    eyebrow: "AGENT AND CONTROL PLANE",
    title: "AetherCloud",
    copy: "The evolving home for agent context, desired state, governed jobs, integrations, and provider-native cloud coordination.",
    href: cloudUrl,
    cta: "See the cloud foundation",
  },
  {
    eyebrow: "TYPED INTEROPERABILITY",
    title: "AetherContracts",
    copy: "The language-neutral source of truth that keeps capabilities and messages type-safe, versioned, portable, and testable.",
    href: contractsUrl,
    cta: "Inspect the contracts",
  },
] as const;

const documentation = [
  {
    title: "AI-native platform",
    copy: "See how conversation becomes a governed plan and deterministic edge behavior.",
    href: aiNativeUrl,
  },
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
            <span className="status-dot" /> OPEN SOURCE · AI-NATIVE · BETA
          </p>
          <h1>
            <span className="hero-line hero-line-solid">
              Describe the outcome.
            </span>
            <span className="hero-line hero-line-outline">
              Agents build behavior.
            </span>
          </h1>
          <p className="hero-lede">
            AetherIoT is the open-source, AI-native runtime foundation for
            agents to discover physical capabilities, turn human intent into
            governed change, and commission deterministic edge behavior.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={aiNativeUrl}>
              Explore the architecture <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-note">
            BETA FOUNDATION · END-USER AGENT EXPERIENCE IN DEVELOPMENT
          </p>
        </div>

        <div className="edge-visual" aria-label="AI-native control loop">
          <div className="visual-label">AI-NATIVE CONTROL LOOP</div>
          <div className="visual-row visual-row-devices">
            <div className="node node-small">
              <span className="node-light" /> HUMAN INTENT
            </div>
            <div className="flow-line" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="edge-node">
            <div className="edge-node-head">
              <span>AETHER AGENT PLANE</span>
              <span className="healthy">● GOVERNED</span>
            </div>
            <div className="edge-node-core">
              <div className="pulse-rings" aria-hidden="true">
                <span className="pulse-core">A</span>
              </div>
              <div>
                <strong>Intent becomes a plan</strong>
                <small>AetherCloud · AetherContracts</small>
              </div>
            </div>
            <div className="service-grid">
              <span>DISCOVER</span>
              <span>GENERATE</span>
              <span>VERIFY</span>
              <span>EXPLAIN</span>
            </div>
          </div>
          <div className="cloud-path">
            <div className="flow-line vertical" aria-hidden="true">
              <span />
            </div>
            <div className="node cloud-node">
              <span>AETHER EDGE · DETERMINISTIC EXECUTION</span>
              <small>Model offline? Commissioned behavior continues.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Product proof points">
        <div>
          <strong>3</strong>
          <span>explicit product authorities</span>
        </div>
        <div>
          <strong>0</strong>
          <span>direct model-to-device paths</span>
        </div>
        <div>
          <strong>1</strong>
          <span>typed application boundary</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>deterministic edge execution</span>
        </div>
      </section>

      <section className="section why" id="why">
        <div className="section-heading">
          <p className="eyebrow">WHY AETHER</p>
          <h2>Stop configuring devices. Start describing outcomes.</h2>
          <p>
            Traditional automation asks people to translate life into entities,
            triggers, conditions, and actions. Aether is building the governed
            runtime foundation for agents to do that work safely.
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
          “Agents generate. Contracts verify.
          <strong> The edge decides what runs.</strong>”
        </blockquote>
        <div className="manifesto-tags" aria-label="Operating principles">
          <span>HUMAN INTENT</span>
          <span>TYPED PLANS</span>
          <span>DETERMINISTIC EXECUTION</span>
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">ONE AGENT-NATIVE SYSTEM</p>
            <h2>Reason, verify, and execute—without blurred authority.</h2>
          </div>
          <p>
            The beta already provides deterministic edge execution, governed
            application boundaries, public contracts, agent-readable docs, and
            cloud foundations. Conversational generation, simulation, and
            continuous adaptation remain explicit product direction.
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
            The first domain solution built on AetherIoT, supplying energy
            semantics and safety constraints without changing platform authority.
          </p>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section documentation" id="documentation">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">ONE DOCUMENTATION HOME</p>
            <h2>Separate the shipped foundation from the product direction.</h2>
          </div>
          <p>
            Follow the agent-native architecture, inspect current capabilities,
            and verify exactly which pieces are implemented, experimental, or planned.
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
          <p className="eyebrow">FOUNDATION AVAILABLE TODAY</p>
          <h2>Give an agent real capabilities—not folklore.</h2>
          <p>
            Start with a safe-empty edge runtime. Let an agent inspect typed
            capabilities and documentation before it proposes any change.
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
        <p className="eyebrow">THE INTERFACE BECOMES A CONVERSATION</p>
        <h2>Describe how the physical space should behave.</h2>
        <p>
          Build the open foundation that lets agents generate change while
          contracts, policy, and deterministic edge execution keep it real.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={aiNativeUrl}>
            Explore the architecture <span aria-hidden="true">→</span>
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
        <p>Describe intent. Verify change. Execute at the edge.</p>
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

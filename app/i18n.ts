import type { Metadata } from "next";

export type Locale = "zh-CN" | "en";

const websiteUrl = "https://www.aetheriot.workers.dev";
const docsBaseUrl = "https://docs.aetheriot.workers.dev";

export const repositoryUrls = {
  edge: "https://github.com/EvanL1/AetherEdge",
  cloud: "https://github.com/EvanL1/AetherCloud",
  contracts: "https://github.com/EvanL1/AetherContracts",
  ems: "https://github.com/EvanL1/AetherEMS",
} as const;

function docsUrl(locale: Locale, path = "") {
  const languagePrefix = locale === "en" ? "/en" : "";
  return `${docsBaseUrl}${languagePrefix}/${path}`;
}

const sharedAlternates = {
  "zh-CN": "/",
  en: "/en/",
  "x-default": "/",
} as const;

export function createMetadata(locale: Locale): Metadata {
  const isChinese = locale === "zh-CN";
  const title = isChinese
    ? "AetherIoT｜面向物理空间的人工智能原生运行平台"
    : "AetherIoT — The AI-native runtime for physical spaces";
  const description = isChinese
    ? "面向智能体的开源运行平台，把人的意图转化为受治理、可验证，并由边缘端确定执行的现实行为。"
    : "The open-source runtime foundation for agents to turn human intent into governed, verifiable physical behavior.";
  const socialDescription = isChinese
    ? "说出想要的结果，让智能体生成受治理的变更，再由边缘端确定执行。"
    : "Describe the outcome. Let agents generate governed behavior that the edge can execute without the model.";
  const canonical = isChinese ? "/" : "/en/";
  const socialImage = isChinese ? "/og-zh.png" : "/og.png";

  return {
    metadataBase: new URL(websiteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: sharedAlternates,
    },
    openGraph: {
      title,
      description: socialDescription,
      type: "website",
      url: canonical,
      locale: isChinese ? "zh_CN" : "en_US",
      alternateLocale: [isChinese ? "en_US" : "zh_CN"],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
      alt: isChinese
            ? "AetherIoT——面向物理空间的人工智能原生运行平台。"
            : "AetherIoT — The AI-native runtime for physical spaces.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: isChinese
        ? "描述意图，验证变更，在边缘端执行。"
        : "Describe the outcome. Verify the change. Execute it at the edge.",
      images: [socialImage],
    },
  };
}

export const siteContent = {
  "zh-CN": {
    locale: "zh-CN",
    alternateLocale: "en",
    alternateHref: "/en/",
    alternateLabel: "EN",
    switchLanguageLabel: "切换到英文",
    themeLabel: "切换明暗主题",
    navLabel: "主导航",
    homeLabel: "AetherIoT 首页",
    repositoriesLabel: "产品代码库",
    docsLabel: "文档",
    docsHome: docsUrl("zh-CN"),
    aiNativeUrl: docsUrl("zh-CN", "overview/ai-native-platform/"),
    hero: {
      status: "开源 · 人工智能原生 · 测试版",
      lineOne: "描述你想要的结果。",
      lineTwo: "由智能体生成行为。",
      lede:
        "AetherIoT 是面向物理空间的开源、人工智能原生运行平台，为智能体发现物理能力、把人的意图转化为受治理的变更，以及投运可在边缘端确定执行的行为提供基础。",
      action: "了解系统架构",
      note: "测试版基础能力已经可用 · 面向最终用户的智能体体验仍在开发中",
    },
    controlLoop: {
      ariaLabel: "人工智能原生控制闭环",
      label: "人工智能原生控制闭环",
      intent: "人的意图",
      agentPlane: "Aether 智能体平面",
      governed: "受治理",
      plan: "意图转化为计划",
      planeProducts: "AetherCloud · AetherContracts",
      services: ["发现", "生成", "验证", "解释"],
      edge: "AetherEdge · 确定性执行",
      offline: "即使模型离线，已经启用的行为也会继续运行。",
    },
    proofLabel: "产品架构事实",
    proof: [
      ["3", "职责清晰的产品边界"],
      ["0", "模型直接控制设备的路径"],
      ["1", "统一的类型化应用边界"],
      ["本地", "已启用行为在边缘端执行"],
    ],
    why: {
      eyebrow: "为什么选择 AetherIoT",
      title: "别再逐项配置设备，直接描述想要的结果。",
      body:
        "传统自动化要求用户亲自把日常需求拆成实体、触发条件、判断条件和执行动作。AetherIoT 正在构建受治理的运行基础，让智能体安全地完成这项工作。",
      capabilities: [
        {
          index: "01 · 产品方向",
          title: "从人的意图出发",
          body:
            "我们的产品方向，是用对话取代繁琐的配置页面：用户只需描述目标、约束和持续时间，不必手工编排每台设备。",
        },
        {
          index: "02 · 架构基础",
          title: "把意图编译为受治理的变更",
          body:
            "类型化能力、版本修订、权限、确认和审计，把模型输出转化为可检查的产物，而不是直接调用设备。",
        },
        {
          index: "03 · 已经可用",
          title: "不依赖模型持续运行",
          body:
            "AetherEdge 在本地执行已经启用的数据采集、规则、告警、历史记录和安全联锁；即使智能体、云端或网络不可用，现场行为仍可继续。",
        },
      ],
    },
    principle: {
      eyebrow: "运行原则",
      lead: "“智能体负责生成，契约负责验证，",
      strong: "边缘端决定实际执行的行为。”",
      tagsLabel: "运行原则",
      tags: ["人的意图", "类型化计划", "确定性执行"],
    },
    platform: {
      eyebrow: "一个面向智能体的完整体系",
      title: "推理、验证、执行，各自权责清晰。",
      body:
        "当前测试版已经具备确定性边缘执行、受治理的应用边界、公开契约、智能体可读取的文档和云端基础能力。对话式生成、仿真和持续自适应仍属于明确的产品方向，尚未作为现成功能提供。",
      layers: [
        {
          eyebrow: "确定性边缘层",
          title: "AetherEdge",
          copy:
            "掌握实时状态的 Linux 边缘运行时；无需把大语言模型放进实时控制闭环，也能执行已经启用的行为。",
          href: repositoryUrls.edge,
          cta: "查看边缘运行时",
        },
        {
          eyebrow: "智能体与控制平面",
          title: "AetherCloud",
          copy:
            "正在建设，用于承载智能体上下文、期望状态、受治理任务、系统集成和云服务商原生协同能力。",
          href: repositoryUrls.cloud,
          cta: "查看云端基础",
        },
        {
          eyebrow: "类型化互操作",
          title: "AetherContracts",
          copy:
            "与语言无关的权威来源，使能力和消息保持类型安全、可版本化、可移植、可测试。",
          href: repositoryUrls.contracts,
          cta: "查看公共契约",
        },
      ],
      solutionLabel: "行业解决方案",
      solution:
        "基于 AetherIoT 构建的首个行业解决方案，在不改变平台权责边界的前提下补充能源领域语义和安全约束。",
    },
    documentation: {
      eyebrow: "统一文档入口",
      title: "清楚区分已经交付的基础与未来产品方向。",
      body:
        "查阅面向智能体的架构，核对当前能力，并确认每项能力处于已实现、试验中还是规划中。",
      items: [
        {
          title: "人工智能原生平台",
          copy: "了解对话如何转化为受治理的计划和确定性的边缘行为。",
          href: docsUrl("zh-CN", "overview/ai-native-platform/"),
        },
        {
          title: "平台总览",
          copy: "了解产品边界、权责划分、部署方式和用户旅程。",
          href: docsUrl("zh-CN", "overview/platform/"),
        },
        {
          title: "AetherEdge",
          copy: "安装边缘运行时，并使用内核、命令行工具和开发工具包进行开发。",
          href: docsUrl("zh-CN", "aetheredge/"),
        },
        {
          title: "AetherCloud",
          copy: "了解云端融合能力和受治理的控制平面。",
          href: docsUrl("zh-CN", "aethercloud/"),
        },
        {
          title: "AetherContracts",
          copy: "使用公共协议、数据结构定义、测试样例和一致性测试套件。",
          href: docsUrl("zh-CN", "aethercontracts/"),
        },
        {
          title: "边缘、契约与云端联动指南",
          copy: "完成从 AetherEdge 经 AetherContracts 到 AetherCloud 的完整流程。",
          href: docsUrl("zh-CN", "guides/edge-contracts-cloud/"),
        },
        {
          title: "兼容性",
          copy: "选择已经验证的产品与契约版本组合。",
          href: docsUrl("zh-CN", "compatibility/version-matrix/"),
        },
        {
          title: "路线图",
          copy: "区分已实现、试验中和规划中的能力。",
          href: docsUrl("zh-CN", "roadmap/status/"),
        },
      ],
    },
    quickstart: {
      eyebrow: "当前可用的基础能力",
      title: "不要让智能体靠猜，把真实能力交给它。",
      body:
        "从默认无设备、无连接的安全边缘运行时开始。让智能体在提出任何变更之前，先读取类型化能力和文档。",
      action: "阅读文档",
      terminalLabel: "快速开始",
      comment: "# 本地组合 · 无消息代理 · 无云端 · 无设备",
    },
    closing: {
      eyebrow: "交互界面将成为一场对话",
      title: "描述你希望物理空间如何运行。",
      body:
        "共同构建这套开放基础：由智能体生成变更，由契约、策略和确定性边缘执行保证变更真实、可控。",
      primary: "了解系统架构",
      secondary: "阅读文档",
    },
    footerLine: "描述意图，验证变更，在边缘端执行。",
    footerDocs: "文档",
  },
  en: {
    locale: "en",
    alternateLocale: "zh-CN",
    alternateHref: "/",
    alternateLabel: "中",
    switchLanguageLabel: "Switch to Chinese",
    themeLabel: "Toggle color theme",
    navLabel: "Primary navigation",
    homeLabel: "AetherIoT home",
    repositoriesLabel: "Product repositories",
    docsLabel: "Docs",
    docsHome: docsUrl("en"),
    aiNativeUrl: docsUrl("en", "overview/ai-native-platform/"),
    hero: {
      status: "OPEN SOURCE · AI-NATIVE · BETA",
      lineOne: "Describe the outcome.",
      lineTwo: "Agents build behavior.",
      lede:
        "AetherIoT is the open-source, AI-native runtime foundation for agents to discover physical capabilities, turn human intent into governed change, and commission deterministic edge behavior.",
      action: "Explore the architecture",
      note: "BETA FOUNDATION · END-USER AGENT EXPERIENCE IN DEVELOPMENT",
    },
    controlLoop: {
      ariaLabel: "AI-native control loop",
      label: "AI-NATIVE CONTROL LOOP",
      intent: "HUMAN INTENT",
      agentPlane: "AETHER AGENT PLANE",
      governed: "GOVERNED",
      plan: "Intent becomes a plan",
      planeProducts: "AetherCloud · AetherContracts",
      services: ["DISCOVER", "GENERATE", "VERIFY", "EXPLAIN"],
      edge: "AETHER EDGE · DETERMINISTIC EXECUTION",
      offline: "Model offline? Commissioned behavior continues.",
    },
    proofLabel: "Product proof points",
    proof: [
      ["3", "explicit product authorities"],
      ["0", "direct model-to-device paths"],
      ["1", "typed application boundary"],
      ["LOCAL", "commissioned behavior runs at the edge"],
    ],
    why: {
      eyebrow: "WHY AETHER",
      title: "Stop configuring devices. Start describing outcomes.",
      body:
        "Traditional automation asks people to translate life into entities, triggers, conditions, and actions. Aether is building the governed runtime foundation for agents to do that work safely.",
      capabilities: [
        {
          index: "01 · DIRECTION",
          title: "Start with human intent",
          body:
            "The product direction replaces configuration screens with conversation: describe the outcome, constraints, and duration instead of programming devices by hand.",
        },
        {
          index: "02 · FOUNDATION",
          title: "Compile intent into governed change",
          body:
            "Typed capabilities, revisions, permissions, confirmation, and audit turn model output into inspectable artifacts—not direct device calls.",
        },
        {
          index: "03 · AVAILABLE",
          title: "Execute without the model",
          body:
            "AetherEdge runs commissioned acquisition, rules, alarms, history, and safety locally, even when the agent, cloud, or internet disappears.",
        },
      ],
    },
    principle: {
      eyebrow: "THE OPERATING PRINCIPLE",
      lead: "“Agents generate. Contracts verify.",
      strong: " The edge decides what runs.”",
      tagsLabel: "Operating principles",
      tags: ["HUMAN INTENT", "TYPED PLANS", "DETERMINISTIC EXECUTION"],
    },
    platform: {
      eyebrow: "ONE AI-NATIVE SYSTEM",
      title: "Reason, verify, and execute—without blurred authority.",
      body:
        "The beta already provides deterministic edge execution, governed application boundaries, public contracts, agent-readable docs, and cloud foundations. Conversational generation, simulation, and continuous adaptation remain explicit product direction.",
      layers: [
        {
          eyebrow: "DETERMINISTIC EDGE",
          title: "AetherEdge",
          copy:
            "The Linux runtime that owns live state and executes commissioned behavior without placing an LLM in the real-time loop.",
          href: repositoryUrls.edge,
          cta: "Explore the edge runtime",
        },
        {
          eyebrow: "AGENT AND CONTROL PLANE",
          title: "AetherCloud",
          copy:
            "The evolving home for agent context, desired state, governed jobs, integrations, and provider-native cloud coordination.",
          href: repositoryUrls.cloud,
          cta: "See the cloud foundation",
        },
        {
          eyebrow: "TYPED INTEROPERABILITY",
          title: "AetherContracts",
          copy:
            "The language-neutral source of truth that keeps capabilities and messages type-safe, versioned, portable, and testable.",
          href: repositoryUrls.contracts,
          cta: "Inspect the contracts",
        },
      ],
      solutionLabel: "INDUSTRY SOLUTION",
      solution:
        "The first domain solution built on AetherIoT, supplying energy semantics and safety constraints without changing platform authority.",
    },
    documentation: {
      eyebrow: "ONE DOCUMENTATION HOME",
      title: "Separate the shipped foundation from the product direction.",
      body:
        "Follow the AI-native architecture, inspect current capabilities, and verify exactly which pieces are implemented, experimental, or planned.",
      items: [
        {
          title: "AI-native platform",
          copy: "See how conversation becomes a governed plan and deterministic edge behavior.",
          href: docsUrl("en", "overview/ai-native-platform/"),
        },
        {
          title: "Overview",
          copy: "Product boundaries, authority, deployments, and user journeys.",
          href: docsUrl("en", "overview/platform/"),
        },
        {
          title: "AetherEdge",
          copy: "Install and build with the edge runtime, Kernel, CLI, and SDK.",
          href: docsUrl("en", "aetheredge/"),
        },
        {
          title: "AetherCloud",
          copy: "Understand the cloud fusion and governed control plane.",
          href: docsUrl("en", "aethercloud/"),
        },
        {
          title: "AetherContracts",
          copy: "Use the shared protocol, schemas, fixtures, and TCK.",
          href: docsUrl("en", "aethercontracts/"),
        },
        {
          title: "Edge–Contracts–Cloud integration guide",
          copy: "Follow the complete AetherEdge → AetherContracts → AetherCloud integration flow.",
          href: docsUrl("en", "guides/edge-contracts-cloud/"),
        },
        {
          title: "Compatibility",
          copy: "Choose tested product and contract version combinations.",
          href: docsUrl("en", "compatibility/version-matrix/"),
        },
        {
          title: "Roadmap",
          copy: "Separate implemented, experimental, and planned capabilities.",
          href: docsUrl("en", "roadmap/status/"),
        },
      ],
    },
    quickstart: {
      eyebrow: "FOUNDATION AVAILABLE TODAY",
      title: "Give an agent real capabilities—not folklore.",
      body:
        "Start with a safe-empty edge runtime. Let an agent inspect typed capabilities and documentation before it proposes any change.",
      action: "Read the documentation",
      terminalLabel: "QUICKSTART",
      comment: "# local composition · no broker · no cloud · no device",
    },
    closing: {
      eyebrow: "THE INTERFACE BECOMES A CONVERSATION",
      title: "Describe how the physical space should behave.",
      body:
        "Build the open foundation that lets agents generate change while contracts, policy, and deterministic edge execution keep it real.",
      primary: "Explore the architecture",
      secondary: "Read the docs",
    },
    footerLine: "Describe intent. Verify change. Execute at the edge.",
    footerDocs: "Documentation",
  },
} as const;

export type SiteContent = (typeof siteContent)[Locale];

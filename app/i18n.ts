import type { Metadata } from "next";

export type Locale = "zh-CN" | "en";

const websiteUrl = "https://aetheriot.dev";
const docsBaseUrl = "https://docs.aetheriot.dev";

export const repositoryUrls = {
  edge: "https://github.com/EvanL1/AetherEdge",
  cloud: "https://github.com/EvanL1/AetherCloud",
  contracts: "https://github.com/EvanL1/AetherContracts",
  ems: "https://github.com/EvanL1/AetherEMS",
} as const;

function docsUrl(locale: Locale, path = "") {
  const languagePrefix = locale === "en" ? "" : "/zh";
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
    ? "AetherIoT｜从逐项配置走向对话式智能家居"
    : "AetherIoT — From device setup to conversational homes";
  const description = isChinese
    ? "AetherIoT 正在构建对话式智能家居：智能体提出可检查的自动化方案，再由 AetherEdge 在家中安全执行。"
    : "AetherIoT is building a conversational smart-home experience where agents propose inspectable automations and AetherEdge runs them safely at home.";
  const socialDescription = isChinese
    ? "正在构建不需要逐项配置设备的智能家居，让生活需求变成安全的本地自动化。"
    : "Building a smart-home experience that turns everyday requests into safe local automations.";
  const canonical = isChinese ? "/" : "/en/";
  const socialImage = "/og-home.png";

  return {
    metadataBase: new URL(websiteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: sharedAlternates,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
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
            ? "AetherIoT 智能家居目标体验示意。"
            : "AetherIoT smart-home concept.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: isChinese
        ? "正在构建从生活需求到安全本地自动化的完整路径。"
        : "Building a path from everyday needs to safe local automations.",
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
      status: "开源 · AI 原生 · 开发者预览",
      lineOne: "不再逐项配置设备。",
      lineTwo: "说出你想要的家。",
      lede:
        "AetherIoT 正在构建这样的体验：智能体把你的要求变成一份可检查的家庭自动化方案；确认后，由家中的 AetherEdge 按设备能力、权限和安全规则在本地执行。",
      action: "了解目标体验与当前能力",
      note: "当前可用：本地运行、规则、告警与安全联锁 · 开发中：面向家庭用户的对话配置",
    },
    homeScene: {
      ariaLabel: "智能家居设备协作示例",
      label: "目标体验示例 · 夜间节能",
      localStatus: "概念演示",
      disclaimer:
        "示意数据，不代表当前设备兼容性；自然语言家庭配置仍在开发。",
      goalLabel: "目标体验中，你可以这样说",
      goal:
        "“晚上十点后，客厅无人 10 分钟就关灯，把空调调到 26℃；如果门还没锁，只提醒我。”",
      devices: [
        {
          kind: "lock",
          room: "玄关",
          name: "玄关门锁",
          value: "已上锁",
          detail: "本地状态",
        },
        {
          kind: "light",
          room: "客厅",
          name: "客厅主灯",
          value: "已关闭",
          detail: "等待检查",
        },
        {
          kind: "climate",
          room: "客厅",
          name: "客厅空调",
          value: "26℃",
          detail: "节能模式",
        },
        {
          kind: "air",
          room: "客厅",
          name: "空气质量",
          value: "良好",
          detail: "二氧化碳 612 ppm",
        },
        {
          kind: "presence",
          room: "客厅",
          name: "人体传感器",
          value: "无人 12 分钟",
          detail: "本地感应",
        },
      ],
      resultLabel: "目标流程",
      resultTitle: "自动化方案通过检查后才执行",
      result:
        "22:00 后 + 无人 10 分钟 → 关灯 / 温控 26℃ / 门未锁则提醒",
      checks: ["AetherContracts 检查", "AetherEdge 本地执行"],
    },
    proofLabel: "一个家真正需要的保障",
    proof: [
      ["先看方案", "执行前可以查看和确认"],
      ["权限检查", "无效或越权操作会被拒绝"],
      ["本地执行", "设备控制服从家中安全规则"],
      ["离线运行", "已启用的本地自动化可以继续"],
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
      lead: "“智能体提出自动化方案，权限与安全规则负责检查，",
      strong: "家中的边缘主机负责执行。”",
      tagsLabel: "运行原则",
      tags: ["生活需求", "可检查的自动化", "家中本地执行"],
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
          title: "AI 原生平台",
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
      status: "OPEN SOURCE · AI-NATIVE · DEVELOPER PREVIEW",
      lineOne: "Stop configuring devices.",
      lineTwo: "Tell your home what you want.",
      lede:
        "AetherIoT is building this experience: an agent turns your request into a home automation you can inspect and approve, then AetherEdge runs it locally under device capabilities, permissions, and safety rules.",
      action: "See the vision and today's foundation",
      note: "AVAILABLE NOW: LOCAL RUNTIME, RULES, ALARMS, AND SAFETY INTERLOCKS · IN DEVELOPMENT: CONVERSATIONAL HOME SETUP",
    },
    homeScene: {
      ariaLabel: "Example of smart-home devices working together",
      label: "TARGET EXPERIENCE · NIGHT ENERGY SAVING",
      localStatus: "CONCEPT DEMO",
      disclaimer:
        "Illustrative data—not a statement of current device compatibility. Conversational home setup is still in development.",
      goalLabel: "IN THE TARGET EXPERIENCE, YOU COULD SAY",
      goal:
        "“After 10 p.m., turn off the living-room light when nobody has been there for 10 minutes, set climate to 26°C, and only notify me if the door is unlocked.”",
      devices: [
        {
          kind: "lock",
          room: "ENTRY",
          name: "Entry lock",
          value: "Locked",
          detail: "Local state",
        },
        {
          kind: "light",
          room: "LIVING ROOM",
          name: "Living-room light",
          value: "Off",
          detail: "Waiting for checks",
        },
        {
          kind: "climate",
          room: "LIVING ROOM",
          name: "Living-room climate",
          value: "26°C",
          detail: "Efficiency mode",
        },
        {
          kind: "air",
          room: "LIVING ROOM",
          name: "Air quality",
          value: "Good",
          detail: "CO₂ 612 ppm",
        },
        {
          kind: "presence",
          room: "LIVING ROOM",
          name: "Presence sensor",
          value: "Empty for 12 min",
          detail: "Local sensing",
        },
      ],
      resultLabel: "TARGET FLOW",
      resultTitle: "The automation runs only after its checks pass",
      result:
        "After 22:00 + empty for 10 min → lights off / climate 26°C / notify if unlocked",
      checks: ["AetherContracts checks", "AetherEdge runs locally"],
    },
    proofLabel: "WHAT A REAL HOME NEEDS",
    proof: [
      ["REVIEW FIRST", "Inspect and approve before execution"],
      ["CHECK PERMISSIONS", "Reject invalid or unauthorized actions"],
      ["RUN LOCALLY", "Device control follows in-home safety rules"],
      ["RUN OFFLINE", "Approved local automations can continue"],
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
      lead: "“Agents propose home automations. Permissions and safety rules check them.",
      strong: " The in-home edge runtime executes them.”",
      tagsLabel: "Operating principles",
      tags: ["EVERYDAY NEEDS", "INSPECTABLE AUTOMATIONS", "LOCAL EXECUTION"],
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

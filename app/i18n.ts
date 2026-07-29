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
    ? "AetherIoT｜面向物理空间的 AI 原生运行平台"
    : "AetherIoT — AI-native runtime platform for physical spaces";
  const description = isChinese
    ? "AetherIoT 是行业中立的 AI 原生 IoT 平台：从安全空边缘运行时开始，先证明观测链路，再显式投运受治理的确定性行为。"
    : "AetherIoT is an industry-neutral, AI-native IoT platform: start with a safe-empty edge runtime, prove observation, then commission governed deterministic behavior.";
  const socialDescription = isChinese
    ? "连接现场设备，验证真实状态，再通过受治理的边缘运行时显式投运行为。"
    : "Connect field devices, verify real state, then explicitly commission behavior through a governed edge runtime.";
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
            ? "AetherIoT 行业中立物理空间运行平台示意。"
            : "AetherIoT industry-neutral physical-space runtime concept.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: isChinese
        ? "从安全空边缘运行时开始，先验证状态，再显式投运行为。"
        : "Start with a safe-empty edge runtime, verify state, then explicitly commission behavior.",
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
    cloudAccountLabel: "云端账户",
    cloudAccountHref: "https://cloud.aetheriot.dev",
    aiNativeUrl: docsUrl("zh-CN", "overview/ai-native-platform/"),
    userJourneysUrl: docsUrl("zh-CN", "overview/user-journeys/"),
    hero: {
      status: "开源 · AI 原生 · 开发者预览",
      lineOne: "从安全空状态开始。",
      lineTwo: "受治理地运行物理空间。",
      lede:
        "AetherIoT 面向设备厂商、系统集成商、解决方案开发者和边缘运维人员：先连接现场设备并证明只读数据链路，再通过 AetherEdge 按能力、权限和安全规则显式投运确定性行为。",
      action: "选择产品与安全起点",
      note: "当前可用：安全空本地运行、采集、规则、告警与安全联锁 · 开发中：完整对话式意图与方案体验",
    },
    homeScene: {
      ariaLabel: "物理空间设备协作示例",
      label: "目标用例示意 · 建筑夜间节能",
      localStatus: "概念演示",
      disclaimer:
        "示意数据，不代表当前设备兼容性；自然语言方案生成仍在开发。",
      goalLabel: "目标体验中，操作员可以这样描述",
      goal:
        "“晚上十点后，大厅无人 10 分钟就关闭照明，把空调调到 26℃；如果入口未锁定，只发送告警。”",
      devices: [
        {
          kind: "lock",
          room: "入口",
          name: "入口门禁",
          value: "已锁定",
          detail: "本地状态",
        },
        {
          kind: "light",
          room: "大厅",
          name: "大厅照明",
          value: "已关闭",
          detail: "等待检查",
        },
        {
          kind: "climate",
          room: "大厅",
          name: "大厅空调",
          value: "26℃",
          detail: "节能模式",
        },
        {
          kind: "air",
          room: "大厅",
          name: "空气质量",
          value: "良好",
          detail: "二氧化碳 612 ppm",
        },
        {
          kind: "presence",
          room: "大厅",
          name: "占用传感器",
          value: "无人 12 分钟",
          detail: "本地感应",
        },
      ],
      resultLabel: "目标流程",
      resultTitle: "自动化方案通过检查后才执行",
      result:
        "22:00 后 + 无人 10 分钟 → 关闭照明 / 温控 26℃ / 入口未锁则告警",
      checks: ["AetherContracts 检查", "AetherEdge 本地执行"],
    },
    proofLabel: "物理系统真正需要的保障",
    proof: [
      ["先看方案", "执行前可以查看和确认"],
      ["权限检查", "无效或越权操作会被拒绝"],
      ["本地执行", "设备控制服从现场安全规则"],
      ["离线运行", "已投运的本地自动化可以继续"],
    ],
    why: {
      eyebrow: "为什么选择 AetherIoT",
      title: "不要让应用直连设备，从受治理的结果开始。",
      body:
        "传统 IoT 系统让每个应用分别处理协议、状态和控制。AetherIoT 把实时状态、类型化能力、权限、确认和审计收敛到清晰边界，让解决方案可以安全组合。",
      capabilities: [
        {
          index: "01 · 产品方向",
          title: "从现场目标出发",
          body:
            "产品方向是让操作员描述目标、约束和持续时间，由智能体提出可检查方案；设备配置和投运仍然经过显式验证。",
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
            "AetherEdge 在本地执行已经投运的数据采集、规则、告警、历史记录和安全联锁；即使智能体、云端或网络不可用，现场行为仍可继续。",
        },
      ],
    },
    principle: {
      eyebrow: "运行原则",
      lead: "“智能体提出现场变更方案，权限与安全规则负责检查，",
      strong: "边缘主机负责最终执行。”",
      tagsLabel: "运行原则",
      tags: ["现场目标", "可检查的变更", "边缘本地执行"],
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
            "掌握实时状态的 Linux 边缘运行时；无需把大语言模型放进实时控制闭环，也能执行已经投运的行为。",
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
          title: "用户旅程",
          copy: "选择负责目标的产品，并从安全空运行时开始显式投运。",
          href: docsUrl("zh-CN", "overview/user-journeys/"),
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
      title: "从签名 Release 和安全空运行时开始。",
      body:
        "验证安装包，确认六项服务、SQLite 和权威 SHM 健康，再连接一个默认禁用的 Channel。创建配置不会静默启用硬件。",
      action: "按安全投运旅程开始",
      terminalLabel: "操作员起点",
      comment: "# 签名 Release · 安全空状态 · 未启用设备",
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
    cloudAccountLabel: "Cloud account",
    cloudAccountHref: "https://cloud.aetheriot.dev",
    aiNativeUrl: docsUrl("en", "overview/ai-native-platform/"),
    userJourneysUrl: docsUrl("en", "overview/user-journeys/"),
    hero: {
      status: "OPEN SOURCE · AI-NATIVE · DEVELOPER PREVIEW",
      lineOne: "Start from a safe-empty edge.",
      lineTwo: "Govern behavior across physical spaces.",
      lede:
        "AetherIoT serves device makers, system integrators, solution builders, and edge operators: connect field devices and prove the read-only data path, then explicitly commission deterministic behavior through AetherEdge under capabilities, permissions, and safety rules.",
      action: "Choose your product and safe starting point",
      note: "AVAILABLE NOW: SAFE-EMPTY LOCAL RUNTIME, ACQUISITION, RULES, ALARMS, AND SAFETY INTERLOCKS · IN DEVELOPMENT: COMPLETE CONVERSATIONAL INTENT AND PROPOSAL EXPERIENCE",
    },
    homeScene: {
      ariaLabel: "Example of devices working together in a physical space",
      label: "TARGET USE CASE · BUILDING NIGHT EFFICIENCY",
      localStatus: "CONCEPT DEMO",
      disclaimer:
        "Illustrative data—not a statement of current device compatibility. Natural-language proposal generation is still in development.",
      goalLabel: "IN THE TARGET EXPERIENCE, AN OPERATOR COULD SAY",
      goal:
        "“After 10 p.m., turn off the lobby lights when it has been unoccupied for 10 minutes, set climate to 26°C, and only raise an alert if the entrance is unlocked.”",
      devices: [
        {
          kind: "lock",
          room: "ENTRANCE",
          name: "Entrance access",
          value: "Secured",
          detail: "Local state",
        },
        {
          kind: "light",
          room: "LOBBY",
          name: "Lobby lighting",
          value: "Off",
          detail: "Waiting for checks",
        },
        {
          kind: "climate",
          room: "LOBBY",
          name: "Lobby climate",
          value: "26°C",
          detail: "Efficiency mode",
        },
        {
          kind: "air",
          room: "LOBBY",
          name: "Air quality",
          value: "Good",
          detail: "CO₂ 612 ppm",
        },
        {
          kind: "presence",
          room: "LOBBY",
          name: "Occupancy sensor",
          value: "Empty for 12 min",
          detail: "Local sensing",
        },
      ],
      resultLabel: "TARGET FLOW",
      resultTitle: "The automation runs only after its checks pass",
      result:
        "After 22:00 + unoccupied for 10 min → lighting off / climate 26°C / alert if entrance unlocked",
      checks: ["AetherContracts checks", "AetherEdge runs locally"],
    },
    proofLabel: "WHAT A PHYSICAL SYSTEM NEEDS",
    proof: [
      ["REVIEW FIRST", "Inspect and approve before execution"],
      ["CHECK PERMISSIONS", "Reject invalid or unauthorized actions"],
      ["RUN LOCALLY", "Device control follows site safety rules"],
      ["RUN OFFLINE", "Commissioned local automations can continue"],
    ],
    why: {
      eyebrow: "WHY AETHER",
      title: "Stop wiring applications directly to devices. Start with governed outcomes.",
      body:
        "Traditional IoT systems make every application handle protocols, state, and control separately. AetherIoT brings live state, typed capabilities, permissions, confirmation, and audit behind clear boundaries so solutions compose safely.",
      capabilities: [
        {
          index: "01 · DIRECTION",
          title: "Start with site outcomes",
          body:
            "The product direction lets operators describe outcomes, constraints, and duration while agents propose inspectable plans; device configuration and commissioning remain explicit.",
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
            "AetherEdge runs commissioned acquisition, rules, alarms, history, and safety locally, even when the agent, cloud, or network disappears.",
        },
      ],
    },
    principle: {
      eyebrow: "THE OPERATING PRINCIPLE",
      lead: "“Agents propose site changes. Permissions and safety rules check them.",
      strong: " The edge runtime makes the final execution decision.”",
      tagsLabel: "Operating principles",
      tags: ["SITE OUTCOMES", "INSPECTABLE CHANGE", "EDGE EXECUTION"],
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
            "The evolving plane for agent context, desired state, governed jobs, integrations, and provider-native cloud coordination.",
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
          title: "User journeys",
          copy: "Choose the product that owns the outcome and commission from a safe-empty runtime.",
          href: docsUrl("en", "overview/user-journeys/"),
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
      title: "Start with a signed Release and a safe-empty runtime.",
      body:
        "Verify the installer, confirm that the six services, SQLite, and authoritative SHM are healthy, then connect one disabled channel. Creating configuration never silently enables hardware.",
      action: "Follow the safe commissioning journey",
      terminalLabel: "OPERATOR START",
      comment: "# signed Release · safe-empty · no device enabled",
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

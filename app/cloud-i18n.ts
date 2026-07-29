import type { Metadata } from "next";

export type CloudLocale = "zh-CN" | "en";

const websiteUrl = "https://aetheriot.dev";

export function createCloudMetadata(locale: CloudLocale): Metadata {
  const chinese = locale === "zh-CN";
  const title = chinese
    ? "AetherCloud 账户｜AetherIoT"
    : "AetherCloud account — AetherIoT";
  const description = chinese
    ? "登录 AetherCloud 开发者预览，验证身份与当前可用的云端 API 连接。"
    : "Sign in to the AetherCloud developer preview and verify identity plus the currently available cloud API connection.";
  const canonical = chinese ? "/cloud/" : "/en/cloud/";

  return {
    metadataBase: new URL(websiteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "zh-CN": "/cloud/",
        en: "/en/cloud/",
        "x-default": "/cloud/",
      },
    },
    robots: { index: false, follow: false },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
    },
  };
}

export const cloudContent = {
  "zh-CN": {
    locale: "zh-CN",
    homeHref: "/",
    homeLabel: "返回 AetherIoT 首页",
    alternateHref: "/en/cloud/",
    alternateLocale: "en",
    alternateLabel: "EN",
    switchLanguageLabel: "切换到英文",
    themeLabel: "切换明暗主题",
    preview: "AETHERCLOUD · 开发者预览",
    title: "登录 AetherCloud",
    introduction:
      "使用受保护的 AetherCloud 账户访问当前云端基础。浏览器只向 Supabase Auth 提交凭据，并使用短期访问令牌调用 AetherCloud API。",
    boundary:
      "当前页面提供身份、密码管理和 API 连通性验证。完整的设备、部署与智能体控制台仍在开发。",
    emailLabel: "邮箱",
    emailPlaceholder: "name@example.com",
    passwordLabel: "密码",
    currentPasswordPlaceholder: "输入当前密码",
    signIn: "登录",
    signingIn: "正在登录…",
    forgotPassword: "忘记密码",
    resetSent:
      "如果该账户存在，密码重置邮件已经发送。请从同一浏览器打开邮件中的链接。",
    signedInAs: "已登录账户",
    identityVerified: "身份已验证",
    apiChecking: "正在验证 AetherCloud API…",
    apiConnected: "AetherCloud API 已连接",
    apiDenied: "当前账户没有访问此云端范围的权限",
    apiUnavailable: "暂时无法连接 AetherCloud API",
    newPasswordLabel: "新密码",
    confirmPasswordLabel: "确认新密码",
    newPasswordPlaceholder: "至少 8 个字符",
    updatePassword: "修改密码",
    updatingPassword: "正在修改…",
    passwordUpdated: "密码已更新。",
    passwordMismatch: "两次输入的密码不一致。",
    passwordTooShort: "密码至少需要 8 个字符。",
    invalidCredentials: "邮箱或密码不正确。",
    authenticationUnavailable: "暂时无法完成身份验证，请稍后重试。",
    signOut: "退出登录",
    signedOut: "已安全退出。",
    securityTitle: "安全边界",
    securityItems: [
      "密码不会发送给 AetherCloud API",
      "租户与项目权限来自管理员控制的身份元数据",
      "浏览器不能直接写入 AetherCloud 业务表",
    ],
    footer: "AetherIoT · 先验证，再投运。",
  },
  en: {
    locale: "en",
    homeHref: "/en/",
    homeLabel: "Back to AetherIoT home",
    alternateHref: "/cloud/",
    alternateLocale: "zh-CN",
    alternateLabel: "中",
    switchLanguageLabel: "Switch to Chinese",
    themeLabel: "Toggle color theme",
    preview: "AETHERCLOUD · DEVELOPER PREVIEW",
    title: "Sign in to AetherCloud",
    introduction:
      "Use a protected AetherCloud account to access the current cloud foundation. The browser submits credentials only to Supabase Auth and calls the AetherCloud API with a short-lived access token.",
    boundary:
      "This page provides identity, password management, and API connectivity checks. The complete device, deployment, and agent console remains in development.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    currentPasswordPlaceholder: "Enter your current password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    forgotPassword: "Forgot password",
    resetSent:
      "If the account exists, a password recovery email has been sent. Open its link in this browser.",
    signedInAs: "Signed-in account",
    identityVerified: "Identity verified",
    apiChecking: "Checking the AetherCloud API…",
    apiConnected: "AetherCloud API connected",
    apiDenied: "This account cannot access the selected cloud scope",
    apiUnavailable: "The AetherCloud API is temporarily unavailable",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm new password",
    newPasswordPlaceholder: "At least 8 characters",
    updatePassword: "Change password",
    updatingPassword: "Updating…",
    passwordUpdated: "Password updated.",
    passwordMismatch: "The passwords do not match.",
    passwordTooShort: "The password must contain at least 8 characters.",
    invalidCredentials: "The email or password is incorrect.",
    authenticationUnavailable: "Authentication is temporarily unavailable. Try again later.",
    signOut: "Sign out",
    signedOut: "Signed out safely.",
    securityTitle: "SECURITY BOUNDARY",
    securityItems: [
      "Passwords are never sent to the AetherCloud API",
      "Tenant and Project access comes from administrator-controlled identity metadata",
      "The browser cannot write AetherCloud business tables directly",
    ],
    footer: "AetherIoT · Verify first. Commission deliberately.",
  },
} as const;

export type CloudContent = (typeof cloudContent)[CloudLocale];

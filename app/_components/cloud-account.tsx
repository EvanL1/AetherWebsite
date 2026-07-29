"use client";

import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { cloudBrowserConfig } from "../cloud-config";
import type { CloudContent } from "../cloud-i18n";
import { ThemeControl } from "./theme-control";

type BusyAction = "forgot" | "password" | "sign-in" | "sign-out" | undefined;
type ApiState = "checking" | "connected" | "denied" | "unavailable";

function recoveryRedirect(locale: CloudContent["locale"]): string {
  const path = locale === "en" ? "/en/cloud/" : "/cloud/";
  return `${window.location.origin}${path}`;
}

export function CloudAccount({ content }: { content: CloudContent }) {
  const supabase = useMemo(
    () =>
      createClient(
        cloudBrowserConfig.supabaseUrl,
        cloudBrowserConfig.supabasePublishableKey,
        {
          auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            flowType: "pkce",
            persistSession: true,
          },
        },
      ),
    [],
  );
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState<BusyAction>();
  const [notice, setNotice] = useState<string>();
  const [error, setError] = useState<string>();
  const [apiState, setApiState] = useState<ApiState>("checking");

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session !== null) setApiState("checking");
      setSession(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      if (nextSession !== null) setApiState("checking");
      setSession(nextSession);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (session === null) return;
    const controller = new AbortController();
    void fetch(
      `${cloudBrowserConfig.aetherCloudApiUrl}/api/v1/audit/events?limit=1`,
      {
        headers: { authorization: `Bearer ${session.access_token}` },
        method: "GET",
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (response.ok) setApiState("connected");
        else if (response.status === 401 || response.status === 403) {
          setApiState("denied");
        } else setApiState("unavailable");
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") {
          return;
        }
        setApiState("unavailable");
      });
    return () => controller.abort();
  }, [session]);

  function clearMessages(): void {
    setNotice(undefined);
    setError(undefined);
  }

  async function signIn(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    clearMessages();
    setBusy("sign-in");
    const values = new FormData(event.currentTarget);
    const email = values.get("email");
    const password = values.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      setError(content.invalidCredentials);
      setBusy(undefined);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(undefined);
    if (signInError !== null) setError(content.invalidCredentials);
  }

  async function sendRecovery(form: HTMLFormElement): Promise<void> {
    clearMessages();
    const email = new FormData(form).get("email");
    if (typeof email !== "string" || !email.includes("@")) {
      setError(content.invalidCredentials);
      return;
    }
    setBusy("forgot");
    const { error: recoveryError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: recoveryRedirect(content.locale) },
    );
    setBusy(undefined);
    if (recoveryError === null) setNotice(content.resetSent);
    else setError(content.authenticationUnavailable);
  }

  async function updatePassword(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    clearMessages();
    const values = new FormData(event.currentTarget);
    const password = values.get("new-password");
    const confirmation = values.get("confirm-password");
    if (typeof password !== "string" || password.length < 8) {
      setError(content.passwordTooShort);
      return;
    }
    if (password !== confirmation) {
      setError(content.passwordMismatch);
      return;
    }
    setBusy("password");
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(undefined);
    if (updateError === null) {
      event.currentTarget.reset();
      setNotice(content.passwordUpdated);
    } else setError(content.authenticationUnavailable);
  }

  async function signOut(): Promise<void> {
    clearMessages();
    setBusy("sign-out");
    const { error: signOutError } = await supabase.auth.signOut();
    setBusy(undefined);
    if (signOutError === null) setNotice(content.signedOut);
    else setError(content.authenticationUnavailable);
  }

  const apiMessage =
    apiState === "connected"
      ? content.apiConnected
      : apiState === "denied"
        ? content.apiDenied
        : apiState === "unavailable"
          ? content.apiUnavailable
          : content.apiChecking;

  return (
    <main className="cloud-page">
      <nav className="cloud-nav" aria-label={content.homeLabel}>
        <a className="brand" href={content.homeHref} aria-label={content.homeLabel}>
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>AetherIoT</span>
        </a>
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
          <a className="nav-cta" href={content.homeHref}>
            {content.homeLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <section className="cloud-shell">
        <div className="cloud-intro">
          <p className="eyebrow">{content.preview}</p>
          <h1>{content.title}</h1>
          <p>{content.introduction}</p>
          <p className="cloud-boundary">{content.boundary}</p>
          <div className="cloud-security">
            <strong>{content.securityTitle}</strong>
            <ul>
              {content.securityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="account-panel" aria-live="polite">
          {session === null ? (
            <form className="account-form" onSubmit={(event) => void signIn(event)}>
              <label htmlFor="cloud-email">{content.emailLabel}</label>
              <input
                autoComplete="email"
                id="cloud-email"
                name="email"
                placeholder={content.emailPlaceholder}
                required
                type="email"
              />
              <label htmlFor="cloud-password">{content.passwordLabel}</label>
              <input
                autoComplete="current-password"
                id="cloud-password"
                name="password"
                placeholder={content.currentPasswordPlaceholder}
                required
                type="password"
              />
              <button className="account-primary" disabled={busy !== undefined} type="submit">
                {busy === "sign-in" ? content.signingIn : content.signIn}
              </button>
              <button
                className="account-link"
                disabled={busy !== undefined}
                onClick={(event) => void sendRecovery(event.currentTarget.form!)}
                type="button"
              >
                {content.forgotPassword}
              </button>
            </form>
          ) : (
            <div className="account-session">
              <p className="account-kicker">{content.identityVerified}</p>
              <h2>{content.signedInAs}</h2>
              <p className="account-email">{session.user.email}</p>
              <p className={`api-state api-state-${apiState}`}>{apiMessage}</p>

              <form className="account-form" onSubmit={(event) => void updatePassword(event)}>
                <label htmlFor="cloud-new-password">{content.newPasswordLabel}</label>
                <input
                  autoComplete="new-password"
                  id="cloud-new-password"
                  minLength={8}
                  name="new-password"
                  placeholder={content.newPasswordPlaceholder}
                  required
                  type="password"
                />
                <label htmlFor="cloud-confirm-password">{content.confirmPasswordLabel}</label>
                <input
                  autoComplete="new-password"
                  id="cloud-confirm-password"
                  minLength={8}
                  name="confirm-password"
                  placeholder={content.newPasswordPlaceholder}
                  required
                  type="password"
                />
                <button className="account-primary" disabled={busy !== undefined} type="submit">
                  {busy === "password" ? content.updatingPassword : content.updatePassword}
                </button>
              </form>
              <button
                className="account-link"
                disabled={busy !== undefined}
                onClick={() => void signOut()}
                type="button"
              >
                {content.signOut}
              </button>
            </div>
          )}

          {error === undefined ? null : (
            <p className="account-message account-error" role="alert">
              {error}
            </p>
          )}
          {notice === undefined ? null : (
            <p className="account-message" role="status">
              {notice}
            </p>
          )}
        </section>
      </section>

      <footer className="cloud-footer">{content.footer}</footer>
    </main>
  );
}

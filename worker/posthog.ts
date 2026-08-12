const productionHostname = "aetheriot.ai";
const posthogApiHost = "https://us.i.posthog.com";

function isPostHogProjectKey(value: string | undefined): value is string {
  return Boolean(value && /^phc_[A-Za-z0-9_-]{4,252}$/.test(value));
}

function browserSnippet(projectKey: string): string {
  return `<script data-aether-analytics>
!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        2 == o.length && ((t = t[o[0]]), (e = o[1]));
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }
      ((p = t.createElement("script")).type = "text/javascript"),
        (p.crossOrigin = "anonymous"),
        (p.async = !0),
        (p.src = s.api_host + "/static/array.js"),
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = "posthog";
            return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
          },
          u.people.toString = function () {
            return u.toString(1) + ".people (stub)";
          },
          o =
            "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
              " ",
            ),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);

window.posthog.init(${JSON.stringify(projectKey)}, {
  api_host: ${JSON.stringify(posthogApiHost)},
  person_profiles: "never",
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
  persistence: "localStorage",
  respect_dnt: true,
});

document.addEventListener("click", function (event) {
  var target = event.target;
  if (!(target instanceof Element)) return;
  var link = target.closest("a[data-analytics-id]");
  if (!link) return;
  var destination = new URL(link.href, window.location.href);
  window.posthog.capture("cta_clicked", {
    cta_id: link.dataset.analyticsId,
    placement: link.dataset.analyticsPlacement || "unknown",
    destination_host: destination.host,
    destination_path: destination.pathname,
    locale: document.documentElement.lang,
  });
});
</script>`;
}

export async function withPostHog(
  request: Request,
  response: Response,
  projectKey: string | undefined,
): Promise<Response> {
  if (
    request.method !== "GET" ||
    new URL(request.url).hostname !== productionHostname ||
    !isPostHogProjectKey(projectKey) ||
    !/^text\/html\b/i.test(response.headers.get("content-type") ?? "")
  ) {
    return response;
  }

  const html = await response.text();
  const closingHead = /<\/head>/i;
  if (!closingHead.test(html)) {
    return new Response(html, response);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(
    html.replace(closingHead, `${browserSnippet(projectKey)}</head>`),
    {
      status: response.status,
      statusText: response.statusText,
      headers,
    },
  );
}

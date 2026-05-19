const REFERRER_KEY = "efsg_initial_referrer";
const UTM_KEY = "efsg_initial_utm";

export type UtmParams = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export function captureInitialAttribution() {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(REFERRER_KEY) === null) {
      const ref = document.referrer || "";
      const sameOrigin = ref && (() => {
        try {
          return new URL(ref).host === window.location.host;
        } catch {
          return false;
        }
      })();
      sessionStorage.setItem(REFERRER_KEY, !ref || sameOrigin ? "" : ref);
    }

    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;
    const hasUtm = utmKeys.some((k) => params.get(k));
    if (hasUtm) {
      const utm = {
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
      };
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }
  } catch {
    // sessionStorage might be unavailable; fail silently
  }
}

export function getInitialReferrer(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(REFERRER_KEY);
    return v ? v : null;
  } catch {
    return null;
  }
}

export function getAttributionForSubmit(): UtmParams & { referrerUrl: string | null } {
  if (typeof window === "undefined") {
    return { utmSource: null, utmMedium: null, utmCampaign: null, referrerUrl: null };
  }

  const params = new URLSearchParams(window.location.search);
  let utmSource = params.get("utm_source");
  let utmMedium = params.get("utm_medium");
  let utmCampaign = params.get("utm_campaign");

  if (!utmSource && !utmMedium && !utmCampaign) {
    try {
      const stored = sessionStorage.getItem(UTM_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, string>;
        utmSource = parsed.utm_source || null;
        utmMedium = parsed.utm_medium || null;
        utmCampaign = parsed.utm_campaign || null;
      }
    } catch {
      // ignore
    }
  }

  return {
    utmSource: utmSource || null,
    utmMedium: utmMedium || null,
    utmCampaign: utmCampaign || null,
    referrerUrl: getInitialReferrer(),
  };
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

export function trackFormSubmission(
  formName: string,
  params: Record<string, unknown> = {}
): void {
  trackEvent("form_submit", { form_name: formName, ...params });
  trackEvent("generate_lead", { form_name: formName, ...params });
}

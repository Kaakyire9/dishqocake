export function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  try {
    if (typeof window === 'undefined') return;

    type DataLayer = Array<Record<string, unknown>>;
    type PostHog = { capture: (event: string, props?: Record<string, unknown>) => void };

    const w = window as unknown as { dataLayer?: DataLayer; posthog?: PostHog };
    if (w.dataLayer && Array.isArray(w.dataLayer)) {
      (w.dataLayer as DataLayer).push({ event: name, ...payload });
    }

    if (w.posthog && typeof w.posthog.capture === 'function') {
      w.posthog.capture(name, payload);
    }

    console.log('[analytics]', name, payload);
  } catch {
    // ignore
  }
}

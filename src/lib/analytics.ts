export function trackEvent(name: string, payload: Record<string, any> = {}) {
  try {
    if (typeof window === 'undefined') return;
    // Standard dataLayer (Google Tag Manager)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer.push({ event: name, ...payload });
    }

    // PostHog fallback
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.posthog && typeof window.posthog.capture === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.posthog.capture(name, payload);
    }

    // Local console fallback for development
    // eslint-disable-next-line no-console
    console.log('[analytics]', name, payload);
  } catch (err) {
    // ignore
  }
}

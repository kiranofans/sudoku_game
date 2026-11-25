type GA4EventParameter = string | number | boolean;
type GA4EventParameters = Record<string, GA4EventParameter>;

declare global {
    interface Window {
        gtag?: (
            command: 'event',
            eventName: string,
            parameters?: GA4EventParameters,
        ) => void;
    }
}

export function trackGA4Event(
    eventName: string,
    parameters?: GA4EventParameters,
): void {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
        return;
    }

    window.gtag('event', eventName, parameters);
}

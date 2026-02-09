import { useEffect } from "react";

/**
 * Injects a JSON-LD script tag into <head> and removes it on unmount.
 */
export function useJsonLd(data: Record<string, any> | null) {
  useEffect(() => {
    if (!data) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    script.setAttribute("data-jsonld", "true");
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [JSON.stringify(data)]);
}

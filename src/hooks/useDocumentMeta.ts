import { useEffect } from "react";

interface DocumentMetaOptions {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

const DEFAULT_TITLE = "jaagSELECT HK - 產品評測與推薦";
const DEFAULT_DESCRIPTION =
  "由編輯團隊精選，為您帶來最值得信賴的產品推薦。深入研究每一款產品，讓您的選擇更加輕鬆。";
const SUFFIX = " ｜ JaagSelect";
const BASE_URL = "https://jaagselect.com";

/**
 * Sets document title, meta tags, and canonical URL dynamically.
 * Restores defaults on unmount.
 */
export function useDocumentMeta({ title, description, ogTitle, ogDescription, ogImage, canonical }: DocumentMetaOptions) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title.includes("JaagSelect") ? title : title + SUFFIX;
    }

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (description && metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // OG title
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute("content", ogTitle || title || DEFAULT_TITLE);
    }

    // OG description
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute("content", ogDescription || description || DEFAULT_DESCRIPTION);
    }

    // OG image
    if (ogImage) {
      const ogImageEl = document.querySelector('meta[property="og:image"]');
      if (ogImageEl) {
        ogImageEl.setAttribute("content", ogImage);
      }
      const twitterImageEl = document.querySelector('meta[name="twitter:image"]');
      if (twitterImageEl) {
        twitterImageEl.setAttribute("content", ogImage);
      }
    }

    // Canonical URL
    if (canonical) {
      const fullCanonical = canonical.startsWith("http") ? canonical : BASE_URL + canonical;
      let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkEl) {
        linkEl = document.createElement("link");
        linkEl.setAttribute("rel", "canonical");
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute("href", fullCanonical);
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_DESCRIPTION);

      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute("content", DEFAULT_TITLE);

      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute("content", DEFAULT_DESCRIPTION);

      // Remove canonical on unmount
      const linkEl = document.querySelector('link[rel="canonical"]');
      if (linkEl) linkEl.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, canonical]);
}

import { useEffect } from "react";

interface DocumentMetaOptions {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const DEFAULT_TITLE = "jaagSELECT HK - 產品評測與推薦";
const DEFAULT_DESCRIPTION =
  "由編輯團隊精選，為您帶來最值得信賴的產品推薦。深入研究每一款產品，讓您的選擇更加輕鬆。";
const DEFAULT_OG_TYPE = "website";
const SUFFIX = " ｜ JaagSelect";
const BASE_URL = "https://jaagselect.com";

/**
 * Sets document title, meta tags, and canonical URL dynamically.
 * Restores defaults on unmount.
 */
export function useDocumentMeta({ title, description, ogTitle, ogDescription, ogImage, ogType, canonical }: DocumentMetaOptions) {
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

    // OG type
    const ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (ogTypeEl) {
      ogTypeEl.setAttribute("content", ogType || DEFAULT_OG_TYPE);
    }

    // Twitter title / description
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twTitleEl) twTitleEl.setAttribute("content", ogTitle || title || DEFAULT_TITLE);
    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twDescEl) twDescEl.setAttribute("content", ogDescription || description || DEFAULT_DESCRIPTION);

    // OG image
    if (ogImage) {
      const fullImage = ogImage.startsWith("http") ? ogImage : BASE_URL + ogImage;
      const ogImageEl = document.querySelector('meta[property="og:image"]');
      if (ogImageEl) {
        ogImageEl.setAttribute("content", fullImage);
      }
      document.querySelector('meta[property="og:image:width"]')?.setAttribute("content", "1200");
      document.querySelector('meta[property="og:image:height"]')?.setAttribute("content", "630");
      const twitterImageEl = document.querySelector('meta[name="twitter:image"]');
      if (twitterImageEl) {
        twitterImageEl.setAttribute("content", fullImage);
      }
      const twCardEl = document.querySelector('meta[name="twitter:card"]');
      if (twCardEl) twCardEl.setAttribute("content", "summary_large_image");
    }

    // Canonical URL + og:url
    if (canonical) {
      const fullCanonical = canonical.startsWith("http") ? canonical : BASE_URL + canonical;
      let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkEl) {
        linkEl = document.createElement("link");
        linkEl.setAttribute("rel", "canonical");
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute("href", fullCanonical);

      const ogUrlEl = document.querySelector('meta[property="og:url"]');
      if (ogUrlEl) {
        ogUrlEl.setAttribute("content", fullCanonical);
      }
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

      const ogTypeEl = document.querySelector('meta[property="og:type"]');
      if (ogTypeEl) ogTypeEl.setAttribute("content", DEFAULT_OG_TYPE);

      const ogUrlEl = document.querySelector('meta[property="og:url"]');
      if (ogUrlEl) ogUrlEl.setAttribute("content", BASE_URL);

      // Remove canonical on unmount
      const linkEl = document.querySelector('link[rel="canonical"]');
      if (linkEl) linkEl.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, canonical]);
}

import { useEffect } from "react";

interface DocumentMetaOptions {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = "jaagSELECT HK - 專業產品評測與推薦";
const DEFAULT_DESCRIPTION =
  "由專業編輯精選，為您帶來最值得信賴的產品推薦。深入研究每一款產品，讓您的選擇更加輕鬆。";
const SUFFIX = " ｜ JaagSelect";

/**
 * Sets document title and meta tags dynamically.
 * Restores defaults on unmount.
 */
export function useDocumentMeta({ title, description, ogTitle, ogDescription, ogImage }: DocumentMetaOptions) {
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

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_DESCRIPTION);

      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute("content", DEFAULT_TITLE);

      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description, ogTitle, ogDescription, ogImage]);
}

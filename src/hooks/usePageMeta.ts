import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
}

/**
 * Hook reutilizable para actualizar el <title> y la meta description
 * de forma dinámica en cada página (SPA SEO improvement).
 */
export const usePageMeta = ({ title, description }: PageMetaOptions) => {
  useEffect(() => {
    // Actualiza el título
    const prevTitle = document.title;
    document.title = title;

    // Actualiza la meta description si se provee
    if (description) {
      let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      const prevDesc = metaDesc.content;
      metaDesc.content = description;

      // Cleanup al desmontar
      return () => {
        document.title = prevTitle;
        if (metaDesc) metaDesc.content = prevDesc;
      };
    }

    // Cleanup al desmontar
    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
};

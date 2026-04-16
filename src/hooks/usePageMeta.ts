import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
}


export const usePageMeta = ({ title, description }: PageMetaOptions) => {
  useEffect(() => {
    
    const prevTitle = document.title;
    document.title = title;

   
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

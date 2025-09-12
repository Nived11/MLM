import { useEffect } from "react";
import { getMeta, type PageName, type MetaData } from "../../config/metaData";

interface MetaProps {
  page: PageName;
  overrides?: Partial<MetaData>;
}

const Meta = ({ page, overrides = {} }: MetaProps) => {
  const { title, description } = getMeta(page, overrides);

  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [title, description]);

  return null;
};

export default Meta;

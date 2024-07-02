import type SubTabType from "./SubTab";

type TabType = {
  name: string;
  category?: string;
  subTabs?: SubTabType[];
  ref?: string;
};

export default TabType;

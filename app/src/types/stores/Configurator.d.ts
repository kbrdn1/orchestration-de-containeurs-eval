import { TabType, SubTab } from "@/types/components/tabs";
import { ItemType, ItemList } from "@/types/components/collection";
import type { ConfigValue } from "@/types/models";

type selectedItem = {
  name: string;
  data: ItemType | null;
};

type ConfiguratorType = {
  brand: string;
  collection: string;
  model: string;
  tabs: TabType[];
  selectedTab: string;
  subTabs?: SubTab[];
  selectedSubTab?: string;
  productTypes: string[];
  selectedProductType: string;
  colors: string[];
  selectedColor: string;
  sizes: number[];
  selectedSize: number | null;
  items: ItemsList[];
  selectedItems: selectedItem[];
  assembledProduct: ItemType | null;
  config: ConfigValue | null;
  token: string;
};

export default ConfiguratorType;

// Type definition for Config model - Config.d.ts
type Config = {
  id?: number;
  name: string;
  value: ConfigFile;
};

type ConfigSize = {
  name: string;
  values: number[];
};

type ConfigColor = {
  name: string;
  values: string[];
  custom: boolean;
};

type ConfigModel = {
  name: string;
  sizes: ConfigSize[];
  colors: ConfigColor[];
};

type ConfigSubTab = {
  name: string;
  attribute: string;
};

type ConfigTab = {
  name: string;
  category: string;
  subTabs?: ConfigSubTab[];
};

type ConfigFile = {
  tabs: ConfigTab[];
  model: ConfigModel[];
};

export default Config;

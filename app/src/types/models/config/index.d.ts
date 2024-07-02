import ConfigValue from "./Value";

type Config = {
  id?: number;
  name: string;
  value: ConfigValue;
};

export default Config;
export { ConfigValue };

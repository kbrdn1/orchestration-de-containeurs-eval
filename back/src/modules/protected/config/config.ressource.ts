// Ressource for config - config.ressource.ts
import { Config } from "@/types/models";

const configRessource = (config: any): Config => {
  return {
    id: config.id,
    name: config.name,
    value: config.value,
  };
};

export default configRessource;

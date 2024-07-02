// Ressource for the api types - apiType.ressource.ts
import { ApiType } from "@/types/models";

const apiTypeRessource = (apiType: any): ApiType => {
  return {
    id: apiType.id,
    name: apiType.name,
  };
};

export default apiTypeRessource;

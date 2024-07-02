// Type definitions for Website model - Website.d.ts
import Api from "./Api";

type Website = {
  id?: number;
  name: string;
  domain: string;
  apiId?: string;
  api?: Api;
};

export default Website;

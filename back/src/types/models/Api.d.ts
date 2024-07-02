// Type definition for Api model - Api.d.ts
import Website from "./Website";

type Api = {
  id?: number;
  name: string;
  url: string;
  publicKey: string;
  privateKey?: string;
  addToCartEndpoint?: string;
  website?: Website;
  type: string;
};

export default Api;

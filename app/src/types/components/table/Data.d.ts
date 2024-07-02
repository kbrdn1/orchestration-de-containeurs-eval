type Data = {
  name: string;
  domain: string;
  email: string;
  password: string;
  password_confirmation: string;
  url: string;
  addToCartEndpoint: string;
  publicKey: string;
  privateKey: string;
  value: string | Object;
  typeId: number | null;
  websiteId: number | null;
};

type EditData = {
  name: string;
  domain: string;
  url: string;
  addToCartEndpoint: string;
  publicKey: string | undefined;
  privateKey: string | undefined;
  value: string | Object;
  typeId: number | null;
  websiteId: number | null | undefined;
};

export { EditData };
export default Data;

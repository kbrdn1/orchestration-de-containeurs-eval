import Website from "./Website";

type User = {
  id?: number;
  name: string;
  token?: string;
  websiteId?: number;
  website?: Website;
};

export default User;

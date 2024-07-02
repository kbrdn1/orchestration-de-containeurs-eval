import { Api, User, ApiType, Config, Admin, Website } from "@/types";

type TableRowProps = {
  item: User | Api | ApiType | Config | Admin | Website;
};

export default TableRowProps;

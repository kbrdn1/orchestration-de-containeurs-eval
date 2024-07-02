import { User, Api, ApiType, Config, Admin, Website } from "@/types/models";
import { Column, Option } from "@/types/components/props";
import { Field, Filter } from "@/types/components/table";
import { Queries } from "@/types/utils";

type Pages = {
  prev: number[];
  next: number[];
};

type DataTable = {
  name?: StoreNames;
  endpoint?: StoreEndpoints;
  items?: (User | Api | ApiType | Config | Admin | Website)[];
  meta?: Metadata;
  columns?: Column[];
  orderBy?: Option[];
  filters?: Filter[];
  fields?: Field[];
  queries?: Queries;
  pages?: Pages;
  selected?: number[];
};

type StoreNames = "admin" | "api" | "api type" | "config" | "user" | "website";
type StoreEndpoints =
  | "admin"
  | "apis"
  | "api-types"
  | "config"
  | "users"
  | "websites";

export { StoreNames, StoreEndpoints };
export default DataTable;

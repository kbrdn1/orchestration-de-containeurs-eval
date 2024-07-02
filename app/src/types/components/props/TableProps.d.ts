import { Metadata } from "../Pagination";

type Column = {
  key: string;
  label: string;
  type?: "website" | "link" | "api" | "json" | "secret";
};

type TableProps = {
  columns: Column[];
  data: any[];
  meta: Metadata;
};

export { Column };
export default TableProps;

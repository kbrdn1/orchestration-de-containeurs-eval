import RequestError from "./RequestError";
import Queries from "./Queries";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Request = {
  method: Method;
  endpoint: string;
  query?: Queries;
  bodyData?: any;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  token?: string;
};

export default Request;
export { RequestError, Queries, Method };

import Request, { RequestError } from "@/types/utils/request";

const lambdaURL = "http://localhost:3000/v1";

/**
 * Fetches data from the JBPC API Lambda
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @param token - The token to use for authentication
 * @returns The response from the API or an error
 */
const fetchAPI = async <T>({
  method,
  endpoint,
  query,
  bodyData,
  wrappedByKey,
  wrappedByList,
  token,
}: Request): Promise<T | RequestError> => {
  if (!lambdaURL) {
    throw new Error("VITE_LAMBDA_URL is not set in .env");
  }

  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${lambdaURL}/${endpoint}`);

  if (query) {
    query;
    Object.entries(query).forEach(([key, value]) => {
      if (!value) return;
      url.searchParams.append(key, value.toString());
    });
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (token) headers.append("Authorization", token ? `Bearer ${token}` : "");

  const body = bodyData ?? undefined;

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok)
    return {
      status: res.status,
      statusText: res.statusText,
      message: await res.text(),
    } as RequestError;

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
};

export default fetchAPI;

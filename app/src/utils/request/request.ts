import type { Website, Api, ApiType } from "@/types/models";
import type { Option } from "@/types/components/props";
import type { Pagination } from "@/types/components/table";
import { Toast, fetch as fetchAPI } from "@/utils";
import { LocationQueryValue } from "vue-router";

const limit = "999999999";

const lambdaUrl = import.meta.env.VITE_LAMBDA_URL;

export const getWebsites = async () => {
  const result = await fetchAPI<Pagination<Website>>({
    method: "GET",
    endpoint: "/websites",
    token: localStorage.getItem("token") ?? "",
    query: { limit },
  });

  if (!result) return Toast.error("500 - Internal Server Error", "An error occurred while fetching websites");

  if (result && typeof result === "object" && "status" in result)
    return Toast.error(
      `${result.status} - ${result.statusText}`,
      result.message,
    );

  const options: Option[] = [];

  result.items.forEach((website) => {
    if (!website.id || !website.name) return;
    options.push({ value: website.id, label: website.name });
  });

  return options;
};

export const getApis = async () => {
  const result = await fetchAPI<Pagination<Api>>({
    method: "GET",
    endpoint: "/apis",
    token: localStorage.getItem("token") ?? "",
    query: { limit },
  });

  if (!result) return Toast.error("500 - Internal Server Error", "An error occurred while fetching APIs");

  if (result && typeof result === "object" && "status" in result)
    return Toast.error(
      `${result.status} - ${result.statusText}`,
      result.message,
    );

  const options: Option[] = [];

  result.items.forEach((api) => {
    if (!api.id || !api.name) return;
    options.push({ value: api.id, label: api.name });
  });

  return options;
};

export const getApiTypes = async () => {
  const result = await fetchAPI<Pagination<ApiType>>({
    method: "GET",
    endpoint: "/api-types",
    token: localStorage.getItem("token") ?? "",
    query: { limit },
  });

  if (!result)
    return Toast.error(
      "500 - Internal Server Error",
      "An error occurred while fetching API types",
    );

  if (result && typeof result === "object" && "status" in result)
    return Toast.error(
      `${result.status} - ${result.statusText}`,
      result.message,
    );

  const options: Option[] = [];

  result.items.forEach((apiType) => {
    if (!apiType.id || !apiType.name) return;
    options.push({ value: apiType.id, label: apiType.name });
  });

  return options;
};

export const verifyDomain = async (
  token: string | LocationQueryValue[] | LocationQueryValue | undefined,
  domain: string,
) => {
  if (Array.isArray(token)) token = token[0]?.toString();
  if (!domain) return Promise.reject("Unauthorized: Domain is required");

  const response = await fetch(`${lambdaUrl}/domain/verify?domain=${domain}`, {
    method: "GET",
    headers: {
      "API-Token": token ?? "",
    },
  });
  
  if (!response.ok)
    return Toast.error("401 - Unauthorized", "Invalid domain or token");
  
  return response;
};

export const login = async (email: string, password: string) => {
  if (!email || !password)
    return Toast.error("401 - Unauthorized", "Email and password are required");

  const response = await fetch(`${lambdaUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok)
    return Toast.error("401 - Unauthorized", "Invalid email or password");

  const data = await response.json();

  if (!data || !data.token)
    return Toast.error("401 - Unauthorized", "Invalid email or password");

  localStorage.setItem("token", data.token);
};

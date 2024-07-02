import { defineStore } from "pinia";
import { ref } from "vue";
import type { DataTable, StoreNames, StoreEndpoints } from "@/types/stores";
import type {
  User,
  Api,
  ApiType,
  Config,
  Admin,
  Website,
} from "@/types/models";
import type { Pagination, Filter } from "@/types/components/table";
import type { Queries } from "@/types/utils/request";
import { fetch, getApis, getApiTypes, getWebsites, Toast } from "@/utils";
import { order } from "@/constants/filter";

const useDataTableStore = defineStore("jbpc", () => {
  const state = ref<DataTable>({
    name: undefined,
    endpoint: undefined,
    items: [],
    meta: undefined,
    columns: [],
    orderBy: [],
    filters: [],
    queries: {},
    pages: { prev: [], next: [] },
    selected: [],
  });

  const init = async (
    name: StoreNames,
    endpoint: StoreEndpoints,
    queries: Queries,
  ) => {
    reset();
    state.value.name = name;
    state.value.endpoint = endpoint;
    state.value.queries = queries;

    await index();
    initColumns(name);
    initOrderBy(name);
    await initFilters(name);
    await initFields(name);
    setPagesList();
  };

  const setPagesList = () => {
    if (!state.value.meta?.pages) return;

    const currentPage = state.value.meta.currentPage;
    const totalPages = state.value.meta.pagesCount;

    const prev: number[] = [];
    const next: number[] = [];

    for (let i = currentPage - 1; i < currentPage; i++) {
      if (i > 0) {
        prev.push(i);
      }
    }

    for (let i = currentPage + 1; i <= currentPage + 1; i++) {
      if (i <= totalPages) {
        next.push(i);
      }
    }

    state.value.pages = { prev, next };
  };

  const prevPage = async () => {
    if (!state.value.meta?.pages) return;

    if (state.value.meta.currentPage === 1) return;
    state.value.queries = state.value.queries ?? {};
    state.value.queries.page = state.value.meta.currentPage - 1;

    await index();
    setPagesList();
  };

  const nextPage = async () => {
    if (!state.value.meta?.pages) return;

    if (state.value.meta.currentPage === state.value.meta.pagesCount) return;
    state.value.queries = state.value.queries ?? {};
    state.value.queries.page = state.value.meta.currentPage + 1;

    await index();
    setPagesList();
  };

  const setPage = async (page: number) => {
    if (!state.value.meta?.pages) return;

    if (page < 1 || page > state.value.meta.pagesCount) return;
    state.value.queries = state.value.queries ?? {};
    state.value.queries.page = page;

    await index();
    setPagesList();
  };

  const index = async () => {
    if (!state.value.endpoint || !state.value.queries)
      return console.error("Endpoint and Queries not found");

    const result = await fetch<
      | Pagination<User>
      | Pagination<Website>
      | Pagination<Api>
      | Pagination<ApiType>
      | Pagination<Admin>
      | Pagination<Config>
    >({
      method: "GET",
      endpoint: `/${state.value.endpoint}`,
      token: localStorage.getItem("token") ?? "",
      query: state.value.queries,
    });

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    state.value.items = result.items;
    state.value.meta = result.meta;
    setPagesList();
  };

  const store = async (
    bodyData: any,
  ): Promise<
    User | Website | Api | ApiType | Admin | Config | undefined | void
  > => {
    if (!state.value.endpoint) return;

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "POST",
        endpoint: `/${state.value.endpoint}`,
        token: localStorage.getItem("token") ?? "",
        bodyData,
      },
    );

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    await index();
    return result;
  };

  const show = async (
    id: number,
  ): Promise<
    User | Website | Api | ApiType | Admin | Config | undefined | void
  > => {
    if (!state.value.endpoint || !id) return;

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "GET",
        endpoint: `/${state.value.endpoint}/${id}`,
        token: localStorage.getItem("token") ?? "",
      },
    );

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    return result;
  };

  const update = async (id: number, bodyData: any) => {
    if (!state.value.endpoint || !id)
      return console.error("Endpoint and id is required");

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "PUT",
        endpoint: `/${state.value.endpoint}/${id}`,
        token: localStorage.getItem("token") ?? "",
        bodyData,
      },
    );

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    await index();
    return result;
  };

  const resetUserToken = async (data: User) => {
    if (!state.value.endpoint || !data.id) return;

    const result = await fetch<User>({
      method: "PUT",
      endpoint: `/${state.value.endpoint}/${data.id}`,
      token: localStorage.getItem("token") ?? "",
      bodyData: { ...data, reset: true },
    });

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    return result;
  };

  const destroy = async (id: number) => {
    if (!state.value.endpoint || !id)
      return console.error("Endpoint and id is required");

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "DELETE",
        endpoint: `/${state.value.endpoint}/${id}`,
        token: localStorage.getItem("token") ?? "",
      },
    );

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    await index();
    Toast.success("Action successful", "Data deleted");
    return result;
  };

  const destroyMany = async () => {
    if (!state.value.endpoint || !state.value.selected?.length)
      return console.error("Endpoint and ids is required");

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "DELETE",
        endpoint: `/${state.value.endpoint}`,
        token: localStorage.getItem("token") ?? "",
        bodyData: { ids: state.value.selected },
      },
    );

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    await index();
    state.value.selected = [];
    Toast.success("Action successful", "Data deleted");
    return result;
  };

  const restore = async (id: number) => {
    if (!state.value.endpoint || !id)
      return console.error("Endpoint and id is required");

    const result = await fetch<User | Website | Api | ApiType | Admin | Config>(
      {
        method: "PUT",
        endpoint: `/${state.value.endpoint}/${id}`,
        token: localStorage.getItem("token") ?? "",
        bodyData: { deleted_at: null },
      },
    );

    if (!result) return;

    if (result && typeof result === "object" && "status" in result)
      return Toast.error(
        `${result.status} - ${result.statusText}`,
        result.message,
      );

    await index();
    Toast.success("Action successful", "Data restored");
    return result;
  };

  const selectItem = (
    item: User | Website | Api | ApiType | Admin | Config,
  ) => {
    if (!item.id) return;

    if (!state.value.items?.includes(item))
      return state.value.items?.filter((i) => i.id !== item.id);

    if (state.value.selected?.includes(item.id)) {
      state.value.selected = state.value.selected.filter((i) => i !== item.id);
      return state.value.selected;
    }

    if (!state.value.selected) state.value.selected = [];

    return state.value.selected.push(item.id);
  };

  const selectAll = () => {
    if (!(state.value.selected?.length === state.value.items?.length)) {
      if (!state.value.selected) state.value.selected = [];
      return (state.value.selected =
        state.value.items
          ?.map((i) => i.id)
          .filter((i): i is number => i !== undefined) ?? []);
    }
    resetSelected();
  };

  const resetSelected = () => {
    state.value.selected = [];
  };

  const initColumns = (name: StoreNames) => {
    switch (name) {
      case "admin":
        state.value.columns = [{ key: "email", label: "Email" }];
        break;
      case "api":
        state.value.columns = [
          { key: "name", label: "Name" },
          { key: "url", label: "URL", type: "link" },
          { key: "addToCartEndpoint", label: "Cart url", type: "link" },
          { key: "publicKey", label: "Public key", type: "secret" },
          { key: "privateKey", label: "Private key", type: "secret" },
          { key: "type", label: "Type" },
        ];
        break;
      case "api type":
        state.value.columns = [{ key: "name", label: "Name" }];
        break;
      case "config":
        state.value.columns = [
          { key: "name", label: "Name" },
          { key: "value", label: "Value", type: "json" },
        ];
        break;
      case "user":
        state.value.columns = [
          { key: "name", label: "Name" },
          { key: "website", label: "Website", type: "website" },
        ];
        break;
      case "website":
        state.value.columns = [
          { key: "name", label: "Name" },
          { key: "domain", label: "Domain", type: "link" },
          { key: "api", label: "API", type: "api" },
        ];
        break;
    }
  };

  const initOrderBy = (name: StoreNames) => {
    switch (name) {
      case "admin":
        state.value.orderBy = [
          { value: "email", label: "Email" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
      case "api":
        state.value.orderBy = [
          { value: "name", label: "Name" },
          { value: "url", label: "URL" },
          { value: "addToCartEndpoint", label: "Cart url" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
      case "api type":
        state.value.orderBy = [
          { value: "name", label: "Name" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
      case "config":
        state.value.orderBy = [
          { value: "name", label: "Name" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
      case "user":
        state.value.orderBy = [
          { value: "name", label: "Name" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
      case "website":
        state.value.orderBy = [
          { value: "name", label: "Name" },
          { value: "domain", label: "Domain" },
          { value: "create_at", label: "Create At" },
          { value: "update_at", label: "Update At" },
          { value: "delete_at", label: "Delete At" },
        ];
        break;
    }
  };

  const initFilters = async (name: StoreNames) => {
    if (!state.value.orderBy) return;

    const defaultFilters: Filter[] = [
      {
        key: "orderBy",
        label: "Order By",
        type: "select",
        options: state.value.orderBy,
      },
      { key: "order", label: "Order", type: "select", options: order },
      { key: "trash", label: "Trash", type: "checkbox", defaultChecked: false },
    ];

    switch (name) {
      case "admin":
        state.value.filters = defaultFilters;
        break;
      case "api":
        state.value.filters = [
          { key: "url", label: "URL", type: "text" },
          { key: "addToCartEndpoint", label: "Cart url", type: "url" },
          {
            key: "type",
            label: "API Type",
            type: "select",
            options: await getApiTypes() || [],
          },
          ...defaultFilters,
        ];
        break;
      case "api type":
        state.value.filters = defaultFilters;
        break;
      case "config":
        state.value.filters = defaultFilters;
        break;
      case "user":
        state.value.filters = [
          {
            key: "website",
            label: "Website",
            type: "select",
            options: await getWebsites() || [],
          },
          ...defaultFilters,
        ];
        break;
      case "website":
        state.value.filters = [
          {
            key: "api",
            label: "API",
            type: "select",
            options: await getApis() || [],
          },
          ...defaultFilters,
        ];
        break;
    }
  };

  const initFields = async (name: StoreNames) => {
    switch (name) {
      case "admin":
        state.value.fields = [
          { key: "email", label: "Email", type: "email" },
          { key: "password", label: "Password", type: "password" },
          {
            key: "password_confirmation",
            label: "Password Confirmation",
            type: "password",
          },
        ];
        break;
      case "api":
        state.value.fields = [
          { key: "name", label: "Name", type: "text", required: true },
          { key: "url", label: "URL", type: "url", required: true },
          { key: "addToCartEndpoint", label: "Cart url", type: "url" },
          { key: "publicKey", label: "Public key", type: "text" },
          { key: "privateKey", label: "Private key", type: "password" },
          {
            key: "typeId",
            label: "Type",
            type: "select",
            options: await getApis() || [],
            required: true,
          },
        ];
        break;
      case "api type":
        state.value.fields = [
          { key: "name", label: "Name", type: "text", required: true },
        ];
        break;
      case "config":
        state.value.fields = [
          { key: "name", label: "Name", type: "text", required: true },
          {
            key: "websiteId",
            label: "Website",
            type: "select",
            options: await getWebsites() || [],
            required: true,
          },
          { key: "value", label: "Value", type: "json", required: true },
        ];
        break;
      case "user":
        state.value.fields = [
          { key: "name", label: "Name", type: "text", required: true },
          {
            key: "websiteId",
            label: "Website",
            type: "select",
            options: await getWebsites() || [],
            required: true,
          },
        ];
        break;
      case "website":
        state.value.fields = [
          { key: "name", label: "Name", type: "text", required: true },
          { key: "domain", label: "Domain", type: "url", required: true },
          {
            key: "apiId",
            label: "API",
            type: "select",
            options: await getApis() || [],
          },
        ];
        break;
    }
  };

  const reset = () => {
    state.value.name = undefined;
    state.value.endpoint = undefined;
    state.value.items = [];
    state.value.meta = undefined;
    state.value.columns = [];
    state.value.orderBy = [];
    state.value.filters = [];
    state.value.queries = undefined;
  };

  return {
    state,
    init,
    prevPage,
    nextPage,
    setPage,
    index,
    store,
    show,
    update,
    resetUserToken,
    destroy,
    destroyMany,
    restore,
    selectItem,
    selectAll,
    resetSelected,
    reset,
  };
});

export default useDataTableStore;

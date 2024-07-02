import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ConfiguratorType } from "@/types/stores";
import type { TabType } from "@/types/components/tabs";
import type { ItemType } from "@/types/components/collection";

const lambdaUrl: string = "http://localhost:3000/v1";

const useConfiguratorStore = defineStore("jbpc", () => {
  const state = ref<ConfiguratorType>({
    brand: "",
    collection: "",
    model: "",
    tabs: [],
    selectedTab: "",
    subTabs: [],
    selectedSubTab: "",
    productTypes: [],
    selectedProductType: "",
    colors: [],
    selectedColor: "",
    sizes: [],
    selectedSize: null,
    items: [],
    selectedItems: [],
    assembledProduct: null,
    config: null,
    token: "",
  });

  const init = async (brand: string, collection: string, model: string, token: string) => {
    state.value.brand = brand;
    state.value.collection = collection;
    state.value.model = model;
    state.value.token = token;
    await loadConfig()
  };

  const loadConfig = async () => {
    const response = await fetch(
      `${lambdaUrl}/configuration/${state.value.brand} ${state.value.collection}`,
      {
        method: "GET",
        headers: {
          "API-Token": state.value.token,
        },
      },
    );
    const data = await response.json();
    state.value.config = data;

    if (!state.value.config) return;

    state.value.tabs = state.value.config.tabs;
    state.value.selectedTab = state.value.tabs[0].name;
    state.value.productTypes = getConfigTypes.value ?? [];
    state.value.subTabs = getConfigSubTabs.value ?? [];
    state.value.selectedProductType = state.value.productTypes[0];
    initColors();
    state.value.sizes = getConfigSizes.value ?? [];
    await fecthItems().then(async () => {
      state.value.tabs.forEach((tab, index) => {
        if (tab.ref) return;
        state.value.selectedItems.push({
          name: tab.name,
          data: state.value.items[index].list[0],
        });
      });
      state.value.assembledProduct = await fetchAssembledProduct();
    });
  };

  const getConfigTypes = computed(() => {
    const config = state.value.config;
    if (!config) return;

    const modelIndex = config.model.findIndex(
      (model) => model.name === state.value.model,
    );
    if (modelIndex === -1) return;

    return config.model[modelIndex].sizes.map((size) => size.name);
  });

  const getConfigSubTabs = computed(() =>
    state.value.config?.tabs.flatMap((tab) => {
      return (
        tab.subTabs?.filter((subTab) => {
          if (state.value.productTypes.includes(subTab.attribute))
            return {
              name: subTab.name,
              attribute: subTab.attribute,
              tab: tab.name,
            };
        }) ?? []
      );
    }),
  );

  const initColors = () => {
    state.value.colors =
      state.value.config?.model.find(
        (model) => model.name === state.value.model,
      )?.colors[0].values ?? [];

    state.value.selectedColor = state.value.config?.model.find(
      (model) => model.name === state.value.model,
    )?.colors[0].custom
      ? state.value.colors[0]
      : "";
  };

  const getConfigSizes = computed(() => {
    const config = state.value.config;
    if (!config) return;

    const modelIndex = config.model.findIndex(
      (model) => model.name === state.value.model,
    );
    if (modelIndex === -1) return;

    return config.model[modelIndex].sizes.find(
      (size) => size.name === state.value.selectedProductType,
    )?.values;
  });

  const fecthItems = async () => {
    for (const tab of state.value.tabs) {
      if (!tab.category) continue;

      const url = `${lambdaUrl}/search/${state.value.brand}?${tab.category !== "câbles" ? `collection=${state.value.collection}&` : ""}category=${tab.category}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "API-Token": state.value.token,
        },
      });
      const data = await response.json();

      state.value.items.push({ name: tab.name, list: data });
    }
  };

  const getBrand = computed(() => state.value.brand);

  const setBrand = (brand: string) => {
    state.value.brand = brand;
  };

  const getCollection = computed(() => state.value.collection);

  const setCollection = (collection: string) => {
    state.value.collection = collection;
  };

  const getSelectedTab = computed(() =>
    state.value.tabs.find(
      (tab: TabType) => tab.name === state.value.selectedTab,
    ),
  );

  const setSelectedTab = (tabName: string) => {
    const tab = state.value.tabs.find((tab: TabType) => tab.name === tabName);
    if (!tab) return;

    state.value.selectedTab = tabName;

    if (tab.subTabs) {
      state.value.selectedSubTab = "";
      state.value.selectedProductType = "";
    }

    if (tab.ref)
      if (tab.ref === "colors") {
        if (!isCustomColor.value) return;
        state.value.colors =
          state.value.config?.model
            .find((model) => model.name === state.value.model)
            ?.colors.find(
              (color) => color.name === state.value.selectedProductType,
            )?.values ?? [];

        state.value.selectedColor = state.value.colors.includes(
          state.value.selectedColor,
        )
          ? state.value.selectedColor
          : state.value.colors[0];
      }
  };

  const isCustomColor = computed(
    () =>
      state.value.config?.model
        .find((model) => model.name === state.value.model)
        ?.colors.find((color) => color.name === state.value.selectedProductType)
        ?.custom,
  );

  const getSelectedSize = computed(() =>
    state.value.sizes.find((size: number) => size === state.value.selectedSize),
  );

  const setSelectedSize = (size: number) => {
    if (!state.value.sizes.find((size: number) => size === size)) return;

    state.value.selectedSize = size;
  };

  const getItemsBySelectedTab = computed(() =>
    state.value.items.find((item) => item.name === state.value.selectedTab),
  );

  const setSelectedItem = (itemData: ItemType) => {
    const index = state.value.selectedItems.findIndex(
      (item) => item.name === state.value.selectedTab,
    );

    if (index === -1) return;

    state.value.selectedItems[index].data = itemData;
    fetchAssembledProduct();
  };

  const checkSelectedItem = (itemData: ItemType) => {
    return state.value.selectedItems.find((item) => item.data === itemData)
      ? true
      : false;
  };

  const combineRef = computed(() => {
    let ref = "";
    state.value.selectedItems.forEach((item) => {
      ref += item.data?.ref + "-";
    });
    return ref.slice(0, -1);
  });

  const fetchAssembledProduct = async () => {
    const response = await fetch(
      `${lambdaUrl}/search/${state.value.brand}?ref=${combineRef.value}`,
      {
        method: "GET",
        headers: {
          "API-Token": state.value.token,
        },
      },
    );
    const data = await response.json();
    return data[0];
  };

  const findSubTabs = computed(() => {
    const tab = state.value.tabs.find(
      (t) => t.subTabs !== undefined && t.name === state.value.selectedTab,
    );
    if (!tab?.subTabs) return;

    const subTabs = tab.subTabs.filter((subTab) =>
      state.value.productTypes.includes(subTab.attribute),
    );

    state.value.subTabs = subTabs;
    return subTabs;
  });

  const getItemsByType = computed(() => {
    // const category = state.value.tabs.find((t) => t.name === state.value.selectedTab)?.category

    // if (!category) return;

    // const url = `${lambdaUrl}/${state.value.brand}?${state.value.collection}category=${category}&type=${state.value.selectedProductType}`

    // const response = await fetch(url);
    // const data = await response.json();

    // state.value.items = data;
    // return data as ItemType[];

    state.value.sizes =
      state.value.config?.model
        .find((model) => model.name === state.value.model)
        ?.sizes.find((size) => size.name === state.value.selectedProductType)
        ?.values || [];

    return (
      state.value.items.find((item) => item.name === state.value.selectedTab)
        ?.list || []
    );
  });

  const setSelectedSubTab = (subTab: string) => {
    const model = state.value.config?.model.find(
      (model) => model.name === state.value.model,
    );

    if (!model) return;

    state.value.sizes =
      model?.sizes.find((size) => size.name === subTab.toLowerCase())?.values ||
      [];

    state.value.selectedSubTab = subTab;
    state.value.selectedProductType = subTab;

    if (!isCustomColor) return;

    state.value.colors =
      model?.colors.find((color) => color.name === subTab.toLowerCase())
        ?.values ?? [];

    state.value.selectedColor = state.value.colors[0];
  };

  const setSelectedColor = (color: string) => {
    state.value.selectedColor = color;
  };

  const findColors = computed(() => {
    const tab = state.value.tabs.find(
      (tab) => tab.name === state.value.selectedTab && tab.ref,
    );

    if (!tab?.ref) return;

    const ref = tab.ref;

    if (ref === "colors") {
      const model = state.value.config?.model.find(
        (model) => model.name === state.value.model,
      );

      const colors = model?.colors.find(
        (color) => color.name === state.value.selectedProductType,
      );

      state.value.colors = colors?.custom ? colors.values : [];

      return state.value.colors;
    }
  });

  const isTabRefColor = computed(() => {
    const tab = state.value.tabs.find(
      (tab) => tab.name === state.value.selectedTab && tab.ref,
    );

    if (!tab?.ref) return;

    return tab.ref === "colors";
  });

  return {
    state,
    init,
    getBrand,
    setBrand,
    getCollection,
    setCollection,
    getSelectedTab,
    setSelectedTab,
    getSelectedSize,
    setSelectedSize,
    getItemsBySelectedTab,
    setSelectedItem,
    checkSelectedItem,
    findSubTabs,
    getItemsByType,
    setSelectedSubTab,
    setSelectedColor,
    findColors,
    isTabRefColor,
    isCustomColor,
  };
});

export default useConfiguratorStore;

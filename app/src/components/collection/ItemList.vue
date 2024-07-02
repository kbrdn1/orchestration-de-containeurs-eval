<template>
  <div :class="style.root">
    <Item
      v-if="
        store.findSubTabs &&
        store.state.selectedProductType &&
        store.state.selectedSubTab &&
        store.state.selectedProductType === store.state.selectedSubTab
      "
      v-for="item in store.getItemsByType"
      :key="item.id"
      :data="item"
    />
    <Color
      v-else-if="store.isTabRefColor && store.findColors"
      v-for="color in store.state.colors"
      :key="color"
      :color="color"
    />
    <SubTab
      v-else-if="store.findSubTabs"
      v-for="subTab in store.state.subTabs"
      :key="subTab.attribute"
      :data="subTab"
    />
    <Item v-else v-for="item in items" :key="item?.id" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { itemList as style } from "@/styles/collection";
import Item from "./Item.vue";
import useConfiguratorStore from "@/stores/configurator";
import { computed } from "vue";
import { SubTab } from "@/components/tabs";
import Color from "./Color.vue";

const store = useConfiguratorStore();

const items = computed(
  () =>
    store.state.items.find((item) => item.name === store.state.selectedTab)
      ?.list || [],
);
</script>

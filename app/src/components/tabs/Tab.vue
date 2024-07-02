<template>
  <button
    :class="style.root"
    @click="handleClick()"
    :aria-selected="store.state.selectedTab === name"
    :disabled="isDisabled"
  >
    <p>{{ name.toUpperCase() }}</p>
  </button>
</template>

<script setup lang="ts">
import { tab as  style } from "@/styles/tabs";
import type { TabProps } from "@/types/components/props";
import { computed, defineProps } from "vue";
import useConfiguratorStore from "@/stores/configurator";

const { name } = defineProps<TabProps>();

const isDisabled = computed(() => {
  return store.state.tabs.find((tab) => tab.name === name)?.ref &&
    !store.isCustomColor
    ? true
    : false;
});

const store = useConfiguratorStore();
const handleClick = () => {
  store.setSelectedTab(name);
};
</script>

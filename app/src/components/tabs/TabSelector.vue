<template>
  <div :class="style.root">
    <Tab v-for="tab in tabs" :key="tab.name" :name="tab.name" />
  </div>
</template>

<script setup lang="ts">
import { tabSelector as style } from "@/styles/tabs";
import type { TabsSelectorProps } from "@/types/components/props";
import { defineProps } from "vue";
import Tab from "./Tab.vue";

const { tabs } = defineProps<TabsSelectorProps>();
</script>

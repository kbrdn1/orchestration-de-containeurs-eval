<template>
  <div :class="style.root">
    <h1>{{ formatBrandCollectionModel(store.state.brand) }}</h1>
    <ChevronRight :size="16" />
    <p>{{ formatBrandCollectionModel(store.state.collection) }}</p>
    <ChevronRight :size="16" />
    <p>{{ formatBrandCollectionModel(store.state.model) }}</p>
  </div>
</template>

<script setup lang="ts">
import { title as style } from "@/styles/view";
import { ChevronRight } from "lucide-vue-next";
import useConfiguratorStore from "@/stores/configurator";
import { formatBrandCollectionModel } from "@/utils";

const store = useConfiguratorStore();

</script>

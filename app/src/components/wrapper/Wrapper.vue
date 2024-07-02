<template>
  <div :class="style.root">
    <TabSelector :tabs="store.state.tabs" />
    <ItemList />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { wrapper as style } from "@/styles/wrapper";
import { TabSelector } from "@/components/tabs";
import { ItemList } from "@/components/collection";
import Footer from "./WrapperFooter.vue";
import useConfiguratorStore from "@/stores/configurator";

const store = useConfiguratorStore();
</script>

<template>
  <Configurator />
</template>

<script setup lang="ts">
import { Configurator } from "@/components/patterns";
import { useRoute } from "vue-router";
import useConfiguratorStore from "@/stores/configurator";

const route = useRoute();
const store = useConfiguratorStore();

const { brand, collection, model } = route.params;
const token = route.query.token as string;

store.init(brand as string, collection as string, model as string, token);
</script>

<template>
  <div :class="style.root">
    <img
      :src="store.state.assembledProduct?.web_images[0].thumbnail_url"
      :alt="store.state.assembledProduct?.id"
    />
  </div>
</template>

<script setup lang="ts">
import { product as style } from "@/styles/collection";
import useConfiguratorStore from "@/stores/configurator";

const store = useConfiguratorStore();
</script>

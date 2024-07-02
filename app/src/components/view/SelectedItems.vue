<template>
  <div :class="style.root">
    <Item
      v-for="item in store.state.selectedItems"
      :key="item.data?.id"
      :data="item.data"
      preview
    />
  </div>
</template>

<script setup lang="ts">
import { selectedItems as style } from "@/styles/view";
import { Item } from "@/components/collection";
import useConfiguratorStore from "@/stores/configurator";

const store = useConfiguratorStore();
</script>

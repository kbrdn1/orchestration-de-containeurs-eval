<template>
  <div
    v-if="data"
    :class="style.root"
    @click="handleClick()"
    :aria-selected="
      store.state.selectedItems.find((item) => item.data === data)
        ? true
        : false
    "
  >
    <img :class="style.imgStyle" :src="image" :alt="data?.name" />
    <p :hidden="preview" :class="style.nameStyle">
      {{ name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { item as style } from "@/styles/collection";
import { defineProps, ref } from "vue";
import type { ItemProps } from "@/types/components/props";
import { getItemName, getItemNameByProperties, changeImageSize } from "@/utils";
import useConfiguratorStore from "@/stores/configurator";

const store = useConfiguratorStore();

const { data, preview } = defineProps<ItemProps>();

const name = ref<string>(
  data?.custom_attributes_values["nom-court"]
    ? getItemName(data.custom_attributes_values["nom-court"])
    : getItemNameByProperties(data.materials, data.stones),
);
const image = ref<string>(
  data ? changeImageSize(data.web_images[0].thumbnail_url, 500) : "",
);

const handleClick = () => {
  store.setSelectedItem(data);
};
</script>

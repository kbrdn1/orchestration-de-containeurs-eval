<template>
  <div :class="style.root" @click="handleClick">
    <img :class="style.imgStyle" :src="image" :alt="data.name" />
    <p :class="style.nameStyle">{{ data.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { subTab as style } from "@/styles/tabs";
import type { SubTabProps } from "@/types/components/props";
import { defineProps, ref, onMounted } from "vue";
import useConfiguratorStore from "@/stores/configurator";

const { data } = defineProps<SubTabProps>();

const store = useConfiguratorStore();

const image = ref<string>("");

onMounted(
  async () =>
    (image.value = (
      await import(`@/assets/img/product-types/${data.attribute}.jpg`)
    ).default),
);

const handleClick = () => {
  store.setSelectedSubTab(data.attribute);
};
</script>

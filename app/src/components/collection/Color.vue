<template>
  <div
    :class="style.root"
    @click="handleClick()"
    :aria-selected="store.state.selectedColor === color ? true : false"
  >
    <img :class="style.imgStyle" :src="image" :alt="color" />
    <p :hidden="preview" :class="style.nameStyle">{{ color }}</p>
  </div>
</template>

<script setup lang="ts">
import { color as style } from "@/styles/collection";
import { defineProps, onMounted, ref } from "vue";
import type { ColorProps } from "@/types/components/props";
import useConfiguratorStore from "@/stores/configurator";
import { colorImages } from "@/constants";

const store = useConfiguratorStore();

const { color, preview } = defineProps<ColorProps>();

const image = ref<string>("");

onMounted(async () => {
  if (Object.keys(colorImages).includes(color))
    image.value = colorImages[color];
});

const handleClick = () => {
  store.setSelectedColor(color);
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "@/types/components/props";
import * as icons from "lucide-vue-next";
import { css } from "panda/css";

const spinStyle = css({
  animation: "spin",
  animationName: "spin",
  animationDuration: "1s",
  animationIterationCount: "infinite",
});

const { name, size, color, strokeWidth, defaultClass, spin } =
  defineProps<IconProps>();

const icon = computed(() => icons[name as keyof typeof icons]);
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass + (spin ? ` ${spinStyle}` : '')"
  />
</template>

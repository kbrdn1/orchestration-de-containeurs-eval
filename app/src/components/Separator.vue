<template>
  <div :class="orientation === 'vertical' ? Vstyle : Hstyle"></div>
</template>

<script setup lang="ts">
import { css } from "panda/css";
import { defineProps } from "vue";

const { orientation } = defineProps<{
  orientation: "vertical" | "horizontal";
}>();

const Hstyle = css({
  bg: "lightgray",
  w: "full",
  h: "2px",
  rounded: "full",
});

const Vstyle = css({
  bg: "lightgray",
  h: "full",
  w: "2px",
  rounded: "full",
});
</script>

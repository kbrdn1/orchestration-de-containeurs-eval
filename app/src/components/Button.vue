<template>
  <button :type :class="style.root({ visual, size, color })" @click="handleClick">
    <Icon v-if="icon" :name="icon" :size="16" :stroke-width="2" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { button as style } from "@/styles";
import { defineProps } from "vue";
import type { ButtonProps } from "@/types/components/props";
import Icon from "./Icon.vue";

const { type, visual, size, icon, handleClick, color } =
  defineProps<ButtonProps>();
</script>

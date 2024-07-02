<template>
  <div :class="style.root({ size })">
    <label v-if="label" :class="style.labelStyle">
      {{ name }}
      <span v-if="required" :class="inputStyle.requiredStyle">*</span>
    </label>
    <select :class="style.selectStyle({ size })" v-model="modelValue">
      <option disabled selected>{{ name }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { input as inputStyle, select as style } from "@/styles/form";
import { defineProps, defineModel } from "vue";
import type { SelectProps } from "@/types/components/props";

const { label, name, options, size, required } = defineProps<SelectProps>();

const modelValue = defineModel("value", {
  type: String,
  default: "",
});
</script>

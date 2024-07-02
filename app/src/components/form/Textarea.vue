<template>
  <div :hidden :class="style.root({ size: getSize() })">
    <label v-if="label" :class="style.labelStyle" :for="name" :hidden>
      {{ label }}
      <span v-if="required" :class="style.requiredStyle">*</span>
    </label>
    <textarea
      :class="style.textareaStyle({ size: getSize() })"
      :name
      :type
      :required
      :hidden
      :placeholder
      v-model="value"
      :readonly
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { textarea as style } from "@/styles/form";
import type { InputProps } from "@/types/components/props";
import { defineProps, defineModel } from "vue";

const {
  name,
  type,
  label,
  required,
  hidden,
  error,
  placeholder,
  readonly,
  size,
} = defineProps<InputProps>();

const value = defineModel("value", { type: String });

const getSize = (): "full" | "normal" => {
  return size === "full" ? "full" : "normal";
};
</script>

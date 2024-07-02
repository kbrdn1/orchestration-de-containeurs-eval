<template>
  <div
    :class="style.buttonStyle({ size })"
    :aria-selected="check"
    @click="() => (check = !check)"
  >
    <input
      :class="style.checkboxStyle"
      type="checkbox"
      :name="label"
      :value
      v-model="check"
      :defaultChecked="defaultChecked"
    />
    <label
      v-if="label"
      :class="count ? style.labelCountStyle : style.labelStyle"
      :for="label"
      @click="() => (check = !check)"
    >
      {{ label }}
      <span v-if="required" :class="inputStyle.requiredStyle">*</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { input as inputStyle, checkbox as style } from "@/styles/form";
import { defineProps, defineModel } from "vue";
import type { CheckboxButtonProps } from "@/types/components/props";

const { label, defaultChecked, value, count, size } =
  defineProps<CheckboxButtonProps>();

const check = defineModel("value", { type: Boolean, default: false });
</script>

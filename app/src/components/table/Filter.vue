<template>
  <Input
    v-if="type === 'text' || type === 'url' || type === 'email'"
    :name="key"
    :label="label"
    :placeholder="label"
    :type
    v-model:value="modelValue"
  />
  <Select
    v-else-if="type === 'select' && options"
    :label
    :name="label"
    :options="options"
    size="full"
    v-model:value="modelValue"
  />
  <CheckboxButton
    size="full"
    v-else-if="type === 'checkbox'"
    :label="label"
    v-model:value="modelValue"
    :default-checked="defaultChecked"
  />
</template>

<script setup lang="ts">
import { defineProps, defineModel } from "vue";
import { Input, Select, CheckboxButton } from "@/components/form";
import type { Filter } from "@/types/components/table";

const { key, label, type, options, defaultChecked } = defineProps<Filter>();

const modelValue = defineModel("value", {
  type: String || Number || Boolean,
});
</script>

<template>
  <Input
    v-if="
      type === 'text' ||
      type === 'url' ||
      type === 'email' ||
      type === 'password'
    "
    :name="key"
    :label="label"
    :placeholder="label"
    :type
    v-model:value="modelValue"
    :required
  />
  <Select
    v-else-if="type === 'select' && options"
    :label
    :name="label"
    :options="options"
    size="full"
    v-model:value="modelValue"
    :required
  />
  <Checkbox
    v-else-if="type === 'checkbox'"
    :label="label"
    v-model:value="modelValue"
    :default-checked="defaultChecked"
    :required
  />
  <Textarea
    v-else-if="type === 'json'"
    :label="label"
    :placeholder="label"
    :name="label"
    type="text"
    v-model:value="modelValue"
    size="full"
    :required
  />
</template>

<script setup lang="ts">
import { Input, Select, Checkbox, Textarea } from '@/components/form'
import { defineProps, defineModel } from 'vue'
import type { Field } from '@/types/components/table'

const { key, label, type, options, required } = defineProps<Field>()

const modelValue = defineModel("value", {
  type: String || Number || Boolean,
});
</script>

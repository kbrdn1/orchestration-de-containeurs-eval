<template>
  <td>
    <p>
      {{ text }}
    </p>
  </td>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { text } = defineProps<{ text: string }>();
</script>

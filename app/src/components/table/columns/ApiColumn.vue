<template>
  <td>
    <p>
      {{ api?.name }}
    </p>
  </td>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Api } from "@/types/models";

const { api } = defineProps<{ api: Api | undefined }>();
</script>

<template>
  <td>
    <a :class="style.linkStyle" :href="link" target="_blank">
      {{ link }}
    </a>
  </td>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import { defineProps } from "vue";

const { link } = defineProps<{ link: string }>();
</script>

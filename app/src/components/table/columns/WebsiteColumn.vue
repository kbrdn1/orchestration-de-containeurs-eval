<template>
  <td>
    <a :class="style.linkStyle" :href="domain">
      {{ name }}
    </a>
  </td>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import { defineProps } from "vue";

const { name, domain } = defineProps<{ name: string; domain: string }>();
</script>

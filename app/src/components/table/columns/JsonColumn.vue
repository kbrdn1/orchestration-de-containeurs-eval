<template>
  <td>
    <Button
      icon="Download"
      visual="solid"
      size="fit"
      type="button"
      :handleClick="() => Download(value, name)"
    >
      Download
    </Button>
  </td>
</template>

<script setup lang="ts">
import { Button } from "@/components";
import { ConfigValue } from "@/types/models";
import { defineProps } from "vue";

const { name, value } = defineProps<{ name: string; value: ConfigValue }>();

const Download = (value: any, name: string) => {
  value = JSON.stringify(value, null, 2);
  const blob = new Blob([value], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name} config.json`;
  a.click();
  window.URL.revokeObjectURL(url);

  a.remove();
};
</script>

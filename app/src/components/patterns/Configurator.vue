<template>
  <div :class="style.root">
    <View />
    <Wrapper />
  </div>
</template>

<script setup lang="ts">
import { configurator as style } from "@/styles/patterns";
import { View } from "@/components/view";
import { Wrapper } from "@/components/wrapper";
</script>

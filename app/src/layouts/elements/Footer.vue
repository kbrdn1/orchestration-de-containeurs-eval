<template>
  <footer :class="style.root">
    © {{ year }} Jewely Configurator by
    <a :class="style.linkStyle" href="https://www.flippad.com/">Flippad</a>
  </footer>
</template>

<script setup lang="ts">
import { footer as style } from "@/styles/layouts/elements";
const year = new Date().getFullYear();
</script>

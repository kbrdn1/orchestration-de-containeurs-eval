<template>
  <main :class="style">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { css } from "panda/css";

const style = css({
  w: "100vw",
  h: "100vh",
});
</script>

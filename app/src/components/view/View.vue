<template>
  <div :class="style.root">
    <Title />
    <Product />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { view as style } from "@/styles/view";
import Title from "./Title.vue";
import { Product } from "@/components/collection";
import Footer from "./ViewFooter.vue";
</script>

<template>
  <div :class="style.root">
    <Navbar />
    <main :class="style.mainStyle">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { adminLayout as style } from "@/styles/layouts";
import { Navbar, Footer } from "@/layouts/elements";
</script>

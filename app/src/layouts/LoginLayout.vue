<template>
  <div :class="style.root">
    <header :class="style.headerStyle">
      <img
        :class="style.logoStyle"
        src="/logos/full-white.svg"
        alt="Jewely Brand Product Configurator"
      />
      <span>Espace administration</span>
    </header>
    <main :class="style.mainStyle">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { loginLayout as style } from "@/styles/layouts";
import { Footer } from "@/layouts/elements";
</script>

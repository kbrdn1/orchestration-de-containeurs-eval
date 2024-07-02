<template>
  <div :class="style.root">
    <Button
      type="button"
      visual="ghost"
      size="fit"
      icon="Undo2"
      @click="returnToHome()"
      >RETOUR</Button
    >
    <!-- <SelectedItems/> -->
    <Button type="button" visual="outline" size="fit" icon="Ruler"
      >Guide des tailles</Button
    >
  </div>
</template>

<script setup lang="ts">
import { viewFooter as style } from "@/styles/view";
import { Button } from "@/components";
import { useRouter } from "vue-router";

const router = useRouter();

const returnToHome = () => {
  router.push({ name: "home" });
};
</script>

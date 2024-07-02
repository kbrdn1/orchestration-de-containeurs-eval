<template>
  <div :class="style.root">
    <Price size="full" :price />
    <SizesSelect />
    <Button v-if="price" type="button" visual="solid" size="full">
      Valider
    </Button>
    <Button v-else type="button" visual="solid" size="full"
      >Demander ce produit</Button
    >
  </div>
</template>

<script setup lang="ts">
import { wrapperFooter as style } from "@/styles/wrapper";
import Price from "./Price.vue";
import { SizesSelect } from "@/components/form";
import { Button } from "@/components";

const price = undefined;
</script>

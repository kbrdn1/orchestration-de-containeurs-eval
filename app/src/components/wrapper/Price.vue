<template>
  <p v-if="price" :class="style.root({ size })">{{ convertPrice(price) }}</p>
  <p v-else :class="style.soldOutStyle">Produit indisponible</p>
</template>

<script setup lang="ts">
import { price as style } from "@/styles/wrapper";
import { defineProps } from "vue";
import type { PriceProps } from "@/types/components/props";

const { size, price } = defineProps<PriceProps>();

const convertPrice = (value: number | undefined) =>
  value
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(value / 100)
    : "N/A";
</script>

<template>
  <select :class="style.selectStyle({ size: 'normal' })" :v-model="modelValue">
    <option disabled selected>Sélectionner une taille</option>
    <option v-for="size in store.state.sizes" :key="size" :value="size">
      Taille - {{ size }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { select as style } from "@/styles/form";
import { ref } from "vue";
import useConfiguratorStore from "@/stores/configurator";

const modelValue = ref<string>("");

const store = useConfiguratorStore();
</script>

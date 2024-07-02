<template>
  <nav :class="style.root">
    <RouterLink to="/admin/dashboard">
      <img
        :class="style.logoStyle"
        src="/logos/full-white.svg"
        alt="Jewely Brand Product Configurator"
      />
    </RouterLink>
    <div :class="style.navListStyle">
      <RouterLink
        v-for="item in navbar"
        :class="style.navItemStyle"
        :to="item.url"
        :activeClass="style.activeStyle"
      >
        <Icon :name="item.icon" :size="16" />
        {{ item.title }}
      </RouterLink>
    </div>
    <Profile />
  </nav>
</template>

<script setup lang="ts">
import { navbar as style } from "@/styles/layouts/elements";
import Profile from "./Profile.vue";
import { navbar } from "@/constants";
import { Icon } from "@/components";
</script>

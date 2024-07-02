<template>
  <div :class="style.root">
    <header :class="style.headerStyle">
      <h1 :class="style.titleStyle">Jewely Configurator</h1>
      <span> This is a simple configurator for jewelry. </span>
    </header>
    <div :class="style.bodyStyle">
      <RouterLink to="/configurator/Fred/Force 10/Moyen modèle">
        <Button type="button" visual="outline" size="fit">
          <img
            :class="style.imgStyle"
            src="https://dam-flippad.s3.eu-west-3.amazonaws.com/fred/logo.png"
            alt="Fred"
          />
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { home as style} from "@/styles/pages";
import { Button } from "@/components";
</script>

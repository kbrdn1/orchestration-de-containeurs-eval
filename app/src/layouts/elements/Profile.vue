<template>
  <div :class="style.root">
    <Icon name="CircleUserRound" :size="28" />
    <p :class="style.emailStyle">
      {{ email }}
    </p>
    <Button
      :class="style.buttonStyle"
      type="button"
      icon="LogOut"
      visual="solid"
      size="icon"
      color="danger"
      @click="logout"
    />
  </div>
</template>

<script setup lang="ts">
import { profile as style } from "@/styles/layouts/elements";
import { Button } from "@/components";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { Icon } from "@/components";

const router = useRouter();

const token = localStorage.getItem("token");
const email = jwtDecode<{ id: number, email: string}>(token ?? "").email;

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

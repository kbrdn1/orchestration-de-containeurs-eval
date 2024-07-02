<template>
  <LoginLayout>
    <form :class="style.formStyle" @submit.prevent="signIn()">
      <h2 :class="style.formTitleStyle">Connexion</h2>
      <Input
        v-model:value="form.email"
        name="email"
        label="E-mail"
        type="email"
      />
      <Input
        v-model:value="form.password"
        name="password"
        label="Password"
        type="password"
      />
      <Button visual="solid" size="full" type="submit">Valider</Button>
    </form>
  </LoginLayout>
</template>

<script setup lang="ts">
import { login as style } from "@/styles/pages";
import { LoginLayout } from "@/layouts";
import { Input } from "@/components/form";
import { Button } from "@/components";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/utils";

const form = reactive<{ email: string; password: string }>({
  email: "",
  password: "",
});

const router = useRouter();

const signIn = async () =>
  await login(form.email, form.password).then(() => {
    router.push("/admin/dashboard");
  });
</script>

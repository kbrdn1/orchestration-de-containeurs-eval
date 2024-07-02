<template>
  <td>
    <div :class="style.tableSecretContainerStyle">
      <div>
        <Input
          style="padding: 0px"
          :class="style.tableBodyCellStyle"
          :name="name"
          :type="show ? 'text' : 'password'"
          :value="value"
          size="fit"
          readonly
        />
      </div>
      <Button
        :disabled="!show"
        icon="Copy"
        type="button"
        visual="solid"
        size="icon"
        @click="copy(value)"
      />
    </div>
  </td>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import { Input } from "@/components/form"
import { Button } from "@/components"
import { defineProps } from "vue";
import { Toast } from "@/utils";

const { name, value, show } = defineProps<{
  name: string;
  value: string;
  show: boolean;
}>();

const copy = (value: string) => {
  navigator.clipboard.writeText(value);
  Toast.success("Action successful", `${name} copied to clipboard`);
};
</script>

<template>
  <Teleport :to="teleportTo">
    <div :class="style.root + ' bgModal'" @click.self="emit('closeModal')">
      <div :class="style.modalStyle">
        <div :class="style.titleContainerStyle">
          <p :class="style.titleStyle">{{ title }}</p>
          <Icon
            name="X"
            :strokeWidth="2"
            :class="style.closeButtonStyle"
            @click="emit('closeModal')"
          />
        </div>
        <div :class="style.contentStyle">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { modal as style } from "@/styles/modals";
import { Teleport, defineProps, defineEmits } from "vue";
import type { ModalProps } from "@/types/components/props";
import { Icon } from "@/components";

const { title, teleportTo } = defineProps<ModalProps>();

const emit = defineEmits();

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("closeModal");
  }
});
</script>

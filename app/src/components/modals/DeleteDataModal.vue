<template>
  <Button
    icon="Trash"
    type="button"
    visual="action"
    size="action"
    color="danger"
    @click="openModal()"
  >
    Delete
  </Button>

  <Modal
    v-if="show"
    teleport-to="body"
    :title="`Delete ${formatName(store.state.name ?? '')}`"
    @close-modal="closeModal()"
  >
    <div :class="style.singleTextStyle">
      <p>
        Are you sure you want to delete this
        {{ formatName(store.state.name ?? "") }} ?
      </p>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button type="button" visual="outline" size="fit" @click="closeModal()">
        Cancel
      </Button>
      <Button
        type="button"
        visual="solid"
        size="fit"
        color="danger"
        @click="destroyData()"
      >
        Confirm
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { dataModal as style, modal as modalStyle } from "@/styles/modals";
import Modal from "./Modal.vue";
import { Button } from "@/components";
import type { EditDataModalProps } from "@/types/components/props";
import { defineProps, defineEmits, ref } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { Toast } from "@/utils";

const store = useDataTableStore();

const { id } = defineProps<EditDataModalProps>();

const show = ref<boolean>(false);

const emit = defineEmits();

const openModal = async () => {
  show.value = true;
};

const closeModal = () => {
  show.value = false;
};

const destroyData = async () => {
  const result = await store.destroy(id);

  if (!result) return Toast.error("500 - Internal server error", "An error occurred while deleting data");

  closeModal();
  Toast.success("Action successful", `${formatName(store.state.name ?? "")} deleted successfully`);
};

const formatName = (name: string) => {
  if (name === "api") return "API";
  if (name === "api type") return "API type";
  return name;
};
</script>

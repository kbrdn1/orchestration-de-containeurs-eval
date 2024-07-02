<template>
  <div style="position: relative">
    <div :class="tableStyle.actionsBoxStyle">
      <Button
        v-if="store.state.selected?.length"
        type="button"
        icon="SquareStack"
        visual="solid"
        size="fit"
        color="info"
        @click="showAction = !showAction"
        class="actions-container"
      >
        Multiple Actions
      </Button>
      <div
        :class="tableStyle.actionsContainerStyle"
        :aria-selected="showAction"
      >
        <Button
          type="button"
          icon="Trash"
          visual="action"
          size="action"
          color="danger"
          @click="showDelete = true"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>

  <Modal
    v-if="showDelete"
    teleport-to="body"
    :title="`Delete ${formatName(store.state.name ?? '')}`"
    @close-modal="closeDeleteModal()"
  >
    <div :class="dataModalStyle.singleTextStyle">
      <p>
        Are you sure you want to delete these
        {{ formatName(store.state.name ?? "") }}s ?
      </p>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button
        type="button"
        visual="outline"
        size="fit"
        @click="closeDeleteModal()"
      >
        Cancel
      </Button>
      <Button
        type="button"
        visual="solid"
        size="fit"
        color="danger"
        @click="store.destroyMany()"
      >
        Confirm
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {
  dataModal as dataModalStyle,
  modal as modalStyle,
} from "@/styles/modals";
import { table as tableStyle } from "@/styles/table";
import { Button } from "@/components";
import { Modal } from "@/components/modals";
import useDataTableStore from "@/stores/dataTable";
import { ref } from "vue";

const store = useDataTableStore();

const showAction = ref<boolean>(false);
const showDelete = ref<boolean>(false);

const closeDeleteModal = () => {
  showDelete.value = false;
};

const formatName = (name: string) => {
  if (name === "api") return "API";
  if (name === "api type") return "API type";
  return name;
};

window.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(".actions-container")) {
    showAction.value = false;
  }
});
</script>

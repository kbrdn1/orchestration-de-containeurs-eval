<template>
  <tr :class="style.rowStyle">
    <td :class="style.checkCellStyle" style="width: 60px">
      <Checkbox
        :value="store.state.selected?.includes(item.id ?? 0)"
        @click="store.selectItem(item)"
      />
    </td>
    <TextColumn :text="item.name" />
    <JsonColumn :name="item.name" :value="item.value" />
    <td
      :class="style.actionsRowStyle + (showAction ? ` actions-${item.id}` : '')"
    >
      <div :class="style.actionsBoxStyle">
        <Button
          icon="EllipsisVertical"
          type="button"
          visual="secondary"
          size="icon"
          @click="toggleActions()"
        />
        <div :class="style.actionsContainerStyle" :aria-selected="showAction">
          <EditDataModal
            v-if="!store.state.queries?.trash"
            :id="item.id ?? 0"
          />
          <Button
            v-if="store.state.queries?.trash"
            icon="ArchiveRestore"
            type="button"
            visual="action"
            size="action"
            color="success"
            @click="restoreData()"
          >
            Restore
          </Button>
          <Button
            v-else
            icon="Trash"
            type="button"
            visual="action"
            size="action"
            color="danger"
            @click="store.destroy(item.id ?? 0)"
          >
            Delete
          </Button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import { Button } from "@/components";
import { Checkbox } from "@/components/form";
import { JsonColumn, TextColumn } from "../columns";
import { EditDataModal } from "@/components/modals";
import type { Config } from "@/types/models";
import { defineProps, ref } from "vue";
import useDataTableStore from "@/stores/dataTable";

const { item } = defineProps<{ item: Config }>();

const store = useDataTableStore();

const showAction = ref<boolean>(false);
const showEditModal = ref<boolean>(false);

const openEditModal = () => {
  showEditModal.value = true;
};

const restoreData = async () => {
  await store.restore(item.id ?? 0);
};

const toggleActions = () => {
  showAction.value = !showAction.value;
};

window.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(`.actions-${item.id}`)) {
    showAction.value = false;
  }
});
</script>

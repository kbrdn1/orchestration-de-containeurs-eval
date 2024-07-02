<template>
  <tr
    :class="style.rowStyle"
    :aria-selected="store.state.selected?.includes(item.id ?? 0)"
  >
    <td :class="style.checkCellStyle" style="width: 60px">
      <Checkbox
        :value="store.state.selected?.includes(item.id ?? 0)"
        @click="store.selectItem(item)"
      />
    </td>
    <TextColumn :text="item.email" />
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
import { TextColumn } from "../columns";
import type { Admin } from "@/types/models";
import { defineProps, ref } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { EditDataModal } from "@/components/modals";

const { item } = defineProps<{ item: Admin }>();

const store = useDataTableStore();

const showAction = ref<boolean>(false);

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

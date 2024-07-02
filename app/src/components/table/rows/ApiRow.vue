<template>
  <tr :class="style.rowStyle">
    <td :class="style.checkCellStyle" style="max-width: 60px">
      <Checkbox
        :value="store.state.selected?.includes(item.id ?? 0)"
        @click="store.selectItem(item)"
      />
    </td>
    <TextColumn :text="item.name" />
    <LinkColumn :link="item.url" />
    <LinkColumn :link="item.addToCartEndpoint ?? ''" />
    <SecretColumn
      name="Public Key"
      :value="item.publicKey"
      :show="showSecret"
    />
    <SecretColumn
      name="Private Key"
      :value="item.privateKey ?? ''"
      :show="showSecret"
    />
    <TextColumn :text="item.type" />
    <td
      :class="style.actionsRowStyle + (showAction ? ` actions-${item.id}` : '')"
    >
      <div :class="style.actionsBoxStyle">
        <EditDataModal v-if="!store.state.queries?.trash" :id="item.id ?? 0" />
        <Button
          icon="EllipsisVertical"
          type="button"
          visual="secondary"
          size="icon"
          @click="toggleActions()"
        />
        <div :class="style.actionsContainerStyle" :aria-selected="showAction">
          <Button
            icon="Eye"
            type="button"
            visual="action"
            size="action"
            :color="!showSecret ? 'warning' : undefined"
            @click="toggleSecret()"
          >
            {{ showSecret ? "Hide Secret" : "Show Secret" }}
          </Button>
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
import { LinkColumn, SecretColumn, TextColumn } from "../columns";
import type { Api } from "@/types/models";
import { defineProps, ref } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { EditDataModal } from "@/components/modals";

const { item } = defineProps<{ item: Api }>();

const store = useDataTableStore();

const showSecret = ref<boolean>(false);
const showAction = ref<boolean>(false);

const toggleSecret = () => {
  showSecret.value = !showSecret.value;
};

const toggleActions = () => {
  showAction.value = !showAction.value;
};

const restoreData = async () => {
  await store.restore(item.id ?? 0);
};

window.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(`.actions-${item.id}`)) {
    showAction.value = false;
  }
});
</script>

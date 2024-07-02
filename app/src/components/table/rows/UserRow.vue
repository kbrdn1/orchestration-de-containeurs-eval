<template>
  <tr :class="style.rowStyle">
    <td :class="style.checkCellStyle" style="width: 60px">
      <Checkbox
        :value="store.state.selected?.includes(item.id ?? 0)"
        @click="store.selectItem(item)"
      />
    </td>
    <TextColumn :text="item.name" />
    <WebsiteColumn
      :name="item.website?.name ?? ''"
      :domain="item.website?.domain ?? ''"
    />
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
            v-if="store.state.name === 'user'"
            icon="KeyRound"
            type="button"
            visual="action"
            size="action"
            color="warning"
            @click="openTokenModal()"
          >
            Reset API Key
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

  <Modal
    v-if="showToken"
    title="Token"
    teleport-to="body"
    @close-modal="closeTokenModal"
  >
    <div :class="dataModalStyle.tokenContainerStyle">
      <Input
        name="token"
        type="text"
        v-model:value="token"
        readonly
        size="full"
      />
      <Button
        icon="Copy"
        type="button"
        visual="solid"
        size="icon"
        @click="copyToken()"
      >
        Copy
      </Button>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button
        type="button"
        visual="solid"
        size="fit"
        @click="closeTokenModal()"
      >
        Close
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import {
  modal as modalStyle,
  dataModal as dataModalStyle,
} from "@/styles/modals";
import { Button } from "@/components";
import { Checkbox, Input } from "@/components/form";
import { TextColumn, WebsiteColumn } from "../columns";
import { Modal } from "@/components/modals";
import type { User } from "@/types/models";
import { defineProps, ref } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { Toast } from "@/utils";

const { item } = defineProps<{ item: User }>();

const store = useDataTableStore();

const showAction = ref<boolean>(false);
const showToken = ref<boolean>(false);
const token = ref<string>("");

const openTokenModal = async () => {
  const result = await store.resetUserToken(item as User);

  if (result && result.token) token.value = result.token;

  if (token) showToken.value = true;
};

const closeTokenModal = () => {
  showToken.value = false;
};

const copyToken = () => {
  if (token) {
    navigator.clipboard.writeText(token.value);
    Toast.success("Action sucessful", "Token copied to clipboard");
  }
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

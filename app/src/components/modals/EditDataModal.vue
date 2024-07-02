<template>
  <Button
    :icon="store.state.name === 'admin' ? 'RectangleEllipsis' : 'Pencil'"
    type="button"
    visual="action"
    size="action"
    @click="openModal()"
  >
    {{ store.state.name === "admin" ? "Change password" : "Edit" }}
  </Button>

  <Modal
    v-if="show && store.state.name === 'admin'"
    teleport-to="body"
    title="Change password"
    @close-modal="closeModal()"
  >
    <div :class="style">
      <div
        v-for="field in store.state.fields?.filter((f) => f.key !== 'email')"
        :class="style.fieldItemStyle"
        :key="field.key"
      >
        <Field
          :key="field.key"
          :label="field.label"
          :type="field.type"
          :options="field.options"
          :default-checked="field.defaultChecked"
          v-model:value="data[field.key as keyof typeof data]"
        />
      </div>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button type="button" visual="outline" size="fit" @click="closeModal()">
        Cancel
      </Button>
      <Button type="button" visual="solid" size="fit" @click="updateData()">
        Confirm
      </Button>
    </div>
  </Modal>

  <Modal
    v-if="show && store.state.name !== 'admin'"
    teleport-to="body"
    :title="`Edit ${formatName(store.state.name ?? '')}`"
    @close-modal="closeModal()"
  >
    <div :class="style.root">
      <div
        v-for="field in store.state.fields"
        :class="
          field.type !== 'json'
            ? style.fieldItemStyle
            : style.fieldItemFullStyle
        "
        :key="field.key"
      >
        <Field
          :key="field.key"
          :label="field.label"
          :type="field.type"
          :options="field.options"
          :default-checked="field.defaultChecked"
          v-model:value="data[field.key as keyof typeof data]"
        />
      </div>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button type="button" visual="outline" size="fit" @click="closeModal()">
        Cancel
      </Button>
      <Button type="button" visual="solid" size="fit" @click="updateData()">
        Confirm
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { dataModal as style, modal as modalStyle } from "@/styles/modals";
import { Field } from "@/components/table";
import Modal from "./Modal.vue";
import { Button } from "@/components";
import type { EditDataModalProps } from "@/types/components/props";
import type {
  User,
  Website,
  Api,
  ApiType,
  Admin,
  Config,
} from "@/types/models";
import type { EditData } from "@/types/components/table";
import { defineProps, defineEmits, ref, reactive } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { Toast } from "@/utils";

const store = useDataTableStore();

const { id } = defineProps<EditDataModalProps>();

const show = ref<boolean>(false);
const item = ref<
  User | Website | Api | ApiType | Admin | Config | undefined | void
>(undefined);

const emit = defineEmits();

const openModal = async () => {
  await setData();

  if (item.value) show.value = true;
};

const closeModal = () => {
  show.value = false;
  resetFields();
};

const data = reactive<EditData>({
  name: "",
  domain: "",
  url: "",
  addToCartEndpoint: "",
  publicKey: "",
  privateKey: "",
  value: "",
  typeId: null,
  websiteId: null,
});

const setData = async () => {
  item.value = await store.show(id);

  if (!item.value)
    return Toast.error(
      "500 - Internal server error",
      "An error occurred while fetching data",
    );

  data.name = "name" in item.value ? item.value.name : "";
  data.domain = "domain" in item.value ? item.value.domain : "";
  data.url = "url" in item.value ? item.value.url : "";
  data.addToCartEndpoint =
    "addToCartEndpoint" in item.value ? item.value.addToCartEndpoint ?? "" : "";
  data.publicKey = "publicKey" in item.value ? item.value.publicKey : "";
  data.privateKey = "privateKey" in item.value ? item.value.privateKey : "";
  data.value = JSON.stringify("value" in item.value ? item.value.value : "");
  data.typeId = "typeId" in item.value ? (item.value.typeId as number) : null;
  data.websiteId =
    "websiteId" in item.value ? (item.value.websiteId as number) : null;
};

const resetFields = () => {
  data.name = "";
  data.domain = "";
  data.url = "";
  data.addToCartEndpoint = "";
  data.publicKey = "";
  data.privateKey = "";
  data.value = "";
  data.typeId = null;
  data.websiteId = null;
};

const clearData = () => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => value && key !== "password_confirmation",
    ),
  );
};

const updateData = async () => {
  const bodyData = clearData();

  const result = await store.update(id, bodyData);

  if (!result)
    return Toast.error(
      "500 - Internal server error",
      "An error occurred while updating data",
    );

  closeModal();
  Toast.success("200 - Success", "Data updated successfully");
};

const formatName = (name: string) => {
  if (name === "api") return "API";
  if (name === "api type") return "API type";
  return name;
};
</script>

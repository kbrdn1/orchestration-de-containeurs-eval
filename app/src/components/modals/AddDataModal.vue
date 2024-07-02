<template>
  <Button
    type="button"
    visual="solid"
    size="fit"
    icon="Plus"
    @click="openModal()"
  >
    Add {{ formatName(store.state.name ?? "") }}
  </Button>

  <Modal
    v-if="show"
    teleport-to="body"
    :title="`New ${formatName(store.state.name ?? '')}`"
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
      <Button type="button" visual="solid" size="fit" @click="postData()">
        Confirm
      </Button>
    </div>
  </Modal>

  <Modal
    v-if="showToken && store.state.name === 'user'"
    teleport-to="body"
    :title="`Token`"
    @close-modal="closeTokenModal()"
  >
    <div :class="style.tokenContainerStyle">
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
      <Button type="button" visual="solid" size="fit" @click="closeModal()">
        Close
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { dataModal as style, modal as modalStyle } from "@/styles/modals";
import { Field } from "@/components/table";
import Modal from "./Modal.vue";
import { Button } from "@/components";
import { Input } from "@/components/form";
import type { Data } from "@/types/components/table";
import { defineEmits, ref, reactive } from "vue";
import useDataTableStore from "@/stores/dataTable";
import { Toast } from "@/utils";

const store = useDataTableStore();

const show = ref<boolean>(false);
const showToken = ref<boolean>(false);
const token = ref<string>("");

const emit = defineEmits();

const openModal = () => {
  show.value = true;
};

const closeModal = () => {
  show.value = false;
  resetFields();
};

const closeTokenModal = () => {
  showToken.value = false;
};

const copyToken = () => {
  if (token) return navigator.clipboard.writeText(token.value);
  Toast.success("Action successful", "Token copied to clipboard");
};

const data = reactive<Data>({
  name: "",
  domain: "",
  email: "",
  password: "",
  password_confirmation: "",
  url: "",
  addToCartEndpoint: "",
  publicKey: "",
  privateKey: "",
  value: "",
  typeId: null,
  websiteId: null,
});

const resetFields = () => {
  data.name = "";
  data.domain = "";
  data.email = "";
  data.password = "";
  data.password_confirmation = "";
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

const postData = async () => {
  if (
    store.state.name === "admin" &&
    data.password !== data.password_confirmation
  )
    return Toast.error("Error", "Passwords do not match");

  const bodyData = clearData();

  const result = await store.store(bodyData);

  if (!result) return Toast.error("500 - Internal Server Error", "An error occurred while storing data");

  closeModal();
  Toast.success("Action successful", "Data stored successfully");
};

const formatName = (name: string) => {
  if (name === "api") return "API";
  if (name === "api type") return "API type";
  return name;
};
</script>

<template>
  <div :class="style.root">
    <div :class="style.titleContainerStyle">
      <h1 :class="style.titleStyle">
        {{ formatTitle(name) }}
        <span v-if="store.state.meta" :class="style.countStyle">
          {{ store.state.meta.total }}
        </span>
      </h1>
      <div :class="style.mainActionsStyle">
        <MultiActions />
        <AddDataModal :name :endpoint />
      </div>
    </div>
    <div :class="style.tableContainerStyle">
      <div :class="style.optionsContainerStyle">
        <Select
          name="Select a limit"
          :options="limits"
          size="fit"
          v-model:value="queries.limit"
        />
        <Input
          v-if="name !== 'admin'"
          name="name"
          placeholder="Name"
          type="text"
          v-model:value="queries.name"
        />
        <Input
          v-else-if="name === 'admin'"
          name="email"
          placeholder="Email"
          type="text"
          v-model:value="queries.email"
        />
        <Button
          type="button"
          icon="Filter"
          visual="secondary"
          size="icon"
          @click="openFilters()"
        />
        <Pagination />
      </div>
      <Table v-if="store.state.items" />
      <p v-else :class="style.loaderContainerStyle">Loading...</p>
      <div v-if="store.state.meta?.pages.length" :class="style.optionsContainerStyle">
        <Pagination />
      </div>
    </div>
  </div>

  <Modal
    v-if="show"
    title="Filters"
    teleport-to="body"
    @close-modal="closeFilters()"
  >
    <div :class="style.filterContainerStyle">
      <div
        :class="style.filterItemStyle"
        v-for="filter in store.state.filters"
        :key="filter.key"
      >
        <Filter
          :key="filter.key"
          :label="filter.label"
          :type="filter.type"
          :options="filter.options"
          :default-checked="filter.defaultChecked"
          v-model:value="queries[filter.key as keyof typeof queries]"
        />
      </div>
    </div>
    <div :class="modalStyle.footerStyle">
      <Button type="button" visual="outline" size="fit" @click="resetFilters()">
        Reset
      </Button>
      <Button type="button" visual="solid" size="fit" @click="closeFilters()">
        Apply
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { dataPages as style } from "@/styles/patterns";
import { modal as modalStyle } from "@/styles/modals";
import { Table, Pagination, MultiActions, Filter } from "@/components/table";
import Button from "@/components/Button.vue";
import { Select, Input } from "@/components/form";
import { Modal, AddDataModal } from "@/components/modals";
import type { DataPagesProps } from "@/types/components/props";
import type { Queries } from "@/types/utils/request";
import { debounce } from "@/utils";
import { ref, onMounted, defineProps, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { limits } from "@/constants/filter";
import useDataTableStore from "@/stores/dataTable";

const store = useDataTableStore();
store.resetSelected();

const { name, endpoint } = defineProps<DataPagesProps>();

const route = useRoute();
const show = ref<boolean>(false);

const queries = reactive<Queries>({
  name: "",
  email: "",
  domain: "",
  url: "",
  website: "",
  api: "",
  type: "",
  addToCartEndpoint: "",
  limit: (route.query.limit as string) || "50",
  page: Number(route.query.page) || 1,
  order: (route.query.order as string) || undefined,
  orderBy: (route.query.orderBy as string) || undefined,
  trash: (route.query.trash as string) || undefined,
});

watch(
  () => queries,
  debounce(async () => {
    store.state.queries = queries;
    await store.index();
  }, 300),
  { deep: true },
);

const resetFilters = () => {
  queries.name = "";
  queries.email = "";
  queries.domain = "";
  queries.url = "";
  queries.website = "";
  queries.api = "";
  queries.order = undefined;
  queries.orderBy = undefined;
  queries.trash = undefined;
};

const openFilters = () => {
  show.value = true;
};

const closeFilters = () => {
  show.value = false;
};

const formatTitle = (name: string) => {
  if (name === "api") return "APIs";
  if (name === "api type") return "API Types";
  return name.charAt(0).toUpperCase() + name.slice(1) + "s";
};

onMounted(async () => {
  await store.init(name, endpoint, queries);
});
</script>

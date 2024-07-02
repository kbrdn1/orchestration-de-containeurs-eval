<template>
  <AdminRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'admin'"
    :item="row as Admin"
  />
  <ApiRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'api'"
    :item="row as Api"
  />
  <ApiTypeRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'api type'"
    :item="row as ApiType"
  />
  <ConfigRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'config'"
    :item="row as Config"
  />
  <UserRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'user'"
    :item="row as User"
  />
  <WebsiteRow
    v-for="row in store.state.items"
    :key="row.id"
    v-if="store.state.name === 'website'"
    :item="row as Website"
  />
</template>

<script setup lang="ts">
import { Admin, Api, ApiType, Config, User, Website } from "@/types/models";
import {
  AdminRow,
  ApiRow,
  ApiTypeRow,
  ConfigRow,
  UserRow,
  WebsiteRow,
} from "./rows";
import useDataTableStore from "@/stores/dataTable";

const store = useDataTableStore();
</script>

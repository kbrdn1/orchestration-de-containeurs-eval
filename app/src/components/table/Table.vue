<template>
  <table :class="style.root">
    <thead :class="style.tableHeaderStyle">
      <tr>
        <th :class="style.checkCellStyle" style="width: fit;">
          <Checkbox
            style="max-width: 50px; width: fit"
            :value="store.state.selected?.length === store.state.items?.length"
            count
            :label="
              store.state.selected?.length
                ? `${store.state.selected?.length}`
                : ''
            "
            @click="store.selectAll()"
          />
        </th>
        <th
          :class="style.tableHeaderCellStyle"
          v-for="column in store.state.columns"
          :key="column.key"
        >
          {{ formatTitle(column.label) }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody :class="style.tableBodyStyle">
      <TableRow />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { table as style } from "@/styles/table";
import { formatTitle } from "@/utils";
import TableRow from "./TableRow.vue";
import { Checkbox } from "@/components/form";
import useDataTableStore from "@/stores/dataTable";

const store = useDataTableStore();
</script>

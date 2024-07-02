<template>
  <div :class="style.root" v-if="store.state.meta?.pages.length">
    <Button
      v-if="store.state.pages?.prev.length"
      type="button"
      icon="ChevronLeft"
      visual="outline"
      size="icon"
      @click="store.prevPage()"
    />
    <div :class="style.selectorStyle">
      <Button
        v-if="store.state.meta?.currentPage > 2"
        type="button"
        visual="outline"
        size="fit"
        @click="store.setPage(1)"
      >
        1
      </Button>
      <Icon
        v-if="store.state.meta?.currentPage > 3"
        name="Ellipsis"
        :stroke-width="1"
        color="gray"
      />
      <Button
        v-for="page in store.state.pages?.prev"
        type="button"
        visual="outline"
        size="fit"
        @click="store.setPage(page)"
        :key="page"
        :disabled="store.state.meta?.currentPage === 1"
      >
        {{ page }}
      </Button>
      <Button type="button" visual="solid" size="fit" disabled>
        {{ store.state.meta?.currentPage }}
      </Button>
      <Button
        v-for="page in store.state.pages?.next"
        type="button"
        visual="outline"
        size="fit"
        @click="store.setPage(page)"
        :key="page"
      >
        {{ page }}
      </Button>
      <Icon
        v-if="store.state.meta?.pagesCount - 2 > store.state.meta?.currentPage"
        name="Ellipsis"
        :stroke-width="1"
        color="gray"
      />
      <Button
        v-if="store.state.meta?.pagesCount - 1 > store.state.meta?.currentPage"
        type="button"
        visual="outline"
        size="fit"
        @click="store.setPage(store.state.meta?.pagesCount)"
      >
        {{ store.state.meta?.pagesCount }}
      </Button>
    </div>
    <Button
      v-if="store.state.pages?.next.length"
      type="button"
      icon="ChevronRight"
      visual="outline"
      size="icon"
      @click="store.nextPage()"
    />
  </div>
</template>

<script setup lang="ts">
import { pagination as style } from "@/styles/table";
import useDataTableStore from "@/stores/dataTable";
import { Button, Icon } from "@/components";

const store = useDataTableStore();
</script>

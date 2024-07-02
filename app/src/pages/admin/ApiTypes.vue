<template>
  <AdminLayout>
    <DataPages name="api type" endpoint="api-types" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

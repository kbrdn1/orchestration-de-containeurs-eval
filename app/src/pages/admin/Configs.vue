<template>
  <AdminLayout>
    <DataPages name="config" endpoint="config" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

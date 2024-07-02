<template>
  <AdminLayout>
    <DataPages name="admin" endpoint="admin" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

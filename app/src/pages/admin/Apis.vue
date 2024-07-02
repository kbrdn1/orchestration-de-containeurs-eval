<template>
  <AdminLayout>
    <DataPages name="api" endpoint="apis" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

<template>
  <AdminLayout>
    <DataPages name="website" endpoint="websites" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

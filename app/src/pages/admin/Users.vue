<template>
  <AdminLayout>
    <DataPages name="user" endpoint="users" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { DataPages } from "@/components/patterns";
</script>

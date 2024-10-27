<script setup lang="ts">
import { type Student } from '@/types'
defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="no-underline text-gray-800">
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <h2>{{ student.name }}</h2>
      <h2>{{ student.surname }}</h2>
      <span>{{ student.gpa }}</span>
    </div>
  </div>
</template>

<style scoped></style>

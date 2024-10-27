<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>
<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img v-for="image in event.images" :key="image" :src="image" alt="events images" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg">
  </div>
  <br>
  <p>Organizer detail</p>
  <p>{{ event.organizer.name }}</p>
  <div class="flex flex-row justify-center">
    <img v-if="event.organizer.images" :src="event.organizer.images[0]" alt="organizer image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg">
  </div>
</template>

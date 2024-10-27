<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / size.value)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)
const size = computed(() => props.size)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(size.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
        router.push({ name: 'network-error-view' })
      })
  })
})

const keyword = ref('')
function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === '' ) {
    queryFunction = EventService.getEvents(size.value, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, size.value, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    console.log('events' ,events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents)
  }).catch(() => {
    router.push({ name: 'network-error-view' })
  })
}
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <div>
      <BaseInput v-model="keyword" label="Search..." class="w-full" @input='updateKeyword'/>
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="flex w-[290]">
      <RouterLink class="flex-1 no-underline text-gray-800 text-left px-3"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }" rel="prev" v-if="page != 1">&#60; Prev
        Page</RouterLink>
      <RouterLink class="flex-1 no-underline text-right text-gray-800 px-3"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }" rel="next" v-if="hasNextPage">Next Page
        &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'; 
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import ImageUpload from '@/components/ImageUpload.vue';
const organizer = ref<Organizer>({
    id: 0,
    name: '',
    images: [],
    roles: []
})
const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    EventService.saveOrganizer(organizer.value)
        .then((response) => {
            router.push({ name: 'event-list-view'})
            store.updateMessage('You are successfully add a new organizer for ' + response.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch( () =>{
            router.push({ name: 'network-error-view'})
        })
}
</script>

<template>

    <div>
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent">
            <BaseInput v-model="organizer.name" type = "text" label="Name"/>
            <h3>The image of the Event</h3>
            <ImageUpload v-model="organizer.images" :maxUploads="1"/>
            <button class="button" type="submit">Submit</button>
        </form>

        <pre>{{ organizer }}</pre>
    </div>

</template>
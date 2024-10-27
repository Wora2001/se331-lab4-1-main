import axios from "axios";
import type { Organizer } from "@/types";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getOrgaizers() {
        return apiClient.get('/organizers')
    },
    saveOrganizer(organizer: Organizer) {
      return apiClient.post('/organizer', organizer)
    }
}
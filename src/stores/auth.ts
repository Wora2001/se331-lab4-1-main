import axios from 'axios'
import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'
import type { Organizer } from '@/types'
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as Organizer | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    },
    isAdmin(): boolean {
      return this.user?.roles.includes('ROLE_ADMIN') || false
    }
  },
  actions: {
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })
        .then((response) => {
          this.token = response.data.access_token
          this.user = response.data.user
          localStorage.setItem('access_token',this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          return response
        })
    },
    register(firstname: string, lastname: string, email: string, username: string, password: string) {
      return apiClient
        .post('/api/v1/auth/register', {
          firstname : firstname,
          lastname : lastname,
          email : email,
          username: username,
          password : password,
        })
        .then((response) => {
          this.user = response.data
        })
    },
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token:string,user: Organizer) {
      this.token = token
      this.user = user
    }
  }
})

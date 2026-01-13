import { defineStore } from 'pinia'
import api from '@/api/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // user: JSON.parse(localStorage.getItem('user')) || null,
    // token: localStorage.getItem('token') || null,
    // isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: { id: 'admin', name: '테스트 관리자' }, // UI 테스트용 임시 데이터
    token: 'fake-jwt-token',
    isLoggedIn: true,
    error: null,
    isLoading: false,
  }),

  actions: {
    async login(username, password) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post('/login', {
          id: username, // Map username to 'id' expected by backend LoginVO
          password: password,
        })

        const { token, user } = response.data

        this.token = token
        this.user = user
        this.isLoggedIn = true

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isLoggedIn', 'true')

        return true
      } catch (error) {
        this.error = error.response?.data || 'Login failed. Please check your credentials.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
    },

    initAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isLoggedIn = true
      }
    },
  },
})

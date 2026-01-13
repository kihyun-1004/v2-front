<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-vue-next'
import logoKoreanAir from '@/assets/logo__koreanair.svg'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    authStore.error = 'Please fill in all fields.'
    return
  }

  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-primary p-6 transition-colors duration-300 relative">
    <!-- Theme Toggle in Top Right -->
    <div class="absolute top-6 right-6">
      <ThemeSwitch />
    </div>

    <div class="w-full max-w-md">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <img :src="logoKoreanAir" alt="Korean Air"
          class="h-10 w-auto mx-auto mb-6" />
        <h1 class="text-2xl font-bold text-main tracking-tight">Welcome back</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
      </div>

      <!-- Login Card -->
      <div class="bg-surface border border-border rounded-2xl shadow-sm p-8 backdrop-blur-sm">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Error Message -->
          <div v-if="authStore.error"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg text-center animate-pulse">
            {{ authStore.error }}
          </div>

          <!-- Username Input -->
          <div class="space-y-1.5">
            <label for="username" class="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">Username</label>
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <User class="w-4 h-4" />
              </div>
              <input id="username" v-model="username" type="text" placeholder="Enter your username"
                class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-main"
                required />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between ml-1">
              <label for="password" class="text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" class="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
            </div>
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Lock class="w-4 h-4" />
              </div>
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="block w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-main"
                required />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input id="remember" type="checkbox"
              class="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500" />
            <label for="remember" class="ml-2 text-xs text-gray-600 dark:text-gray-400">Remember for 30 days</label>
          </div>

          <!-- Login Button -->
          <button type="submit" :disabled="authStore.isLoading"
            class="w-full bg-[#051766] hover:bg-[#0a208c] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2 group disabled:opacity-70">
            <span v-if="!authStore.isLoading">Sign in</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none">
                </circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Processing...
            </span>
            <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <!-- Social / Alternative -->
        <div class="mt-8 pt-6 border-t border-border text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Don't have an account?
            <a href="#" class="text-blue-600 font-bold hover:underline">Request Access</a>
          </p>
        </div>
      </div>

      <!-- Footer Help -->
      <p class="text-center mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
        Korean Air Enterprise Portal • Security Compliant
      </p>
    </div>
  </div>
</template>

<style scoped>
.bg-primary {
  background-image: radial-gradient(circle at 10% 20%, rgba(5, 23, 102, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(5, 23, 102, 0.02) 0%, transparent 40%);
}
</style>

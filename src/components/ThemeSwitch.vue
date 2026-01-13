<script setup>
import { ref, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  updateTheme()
})
</script>

<template>
  <button @click="toggleTheme"
    class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
    aria-label="Toggle Theme">
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </button>
</template>

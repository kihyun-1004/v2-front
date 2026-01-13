<script setup>
import { ref, onMounted } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  const html = document.documentElement
  
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  
  // 강제 리플로우를 통해 CSS 변수 즉시 적용
  void html.offsetHeight
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
    class="p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:scale-110 active:scale-95"
    aria-label="Toggle Theme">
    <Sun v-if="isDark" class="w-5 h-5 transition-transform duration-300" :class="{'rotate-180': isDark}" />
    <Moon v-else class="w-5 h-5 transition-transform duration-300" />
  </button>
</template>

<script setup>
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Users,
  PieChart,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight as ChevronRightIcon
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ThemeSwitch from '../ThemeSwitch.vue'
import logoKoreanAir from '@/assets/logo__koreanair.svg'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  isCollapsed: { type: Boolean, default: false }
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isSettingsExpanded = ref(route.path.startsWith('/settings'))

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', current: route.path === '/dashboard' },
  { name: 'Transactions', icon: CreditCard, href: '#', current: false },
  { name: 'Reports', icon: PieChart, href: '#', current: false },
  { name: 'Team', icon: Users, href: '#', current: false },
]

const settingsItems = [
  { name: 'User Management', icon: Users, href: '/settings/users', current: route.path === '/settings/users' },
  { name: 'Example 1', icon: Settings, href: '/settings/example1', current: route.path === '/settings/example1' },
  { name: 'General Settings', icon: Settings, href: '#', current: false },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const navigateTo = (href) => {
  if (href === '#') return
  router.push(href)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div>
    <!-- Mobile Hamburger -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border p-4 flex justify-between items-center text-main">
      <img :src="logoKoreanAir" alt="Korean Air Logo"
        class="h-6 w-auto" />
      <button @click="toggleMobileMenu" class="p-2" aria-label="Toggle mobile menu">
        <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Sidebar Container -->
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-[260px] bg-surface border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-border cursor-pointer" @click="navigateTo('/dashboard')">
        <img :src="logoKoreanAir" alt="Korean Air Logo"
          class="h-8 w-auto" />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <!-- Main Nav -->
        <a v-for="item in navigation" :key="item.name" @click="navigateTo(item.href)" :class="[
          item.current
            ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-accent'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100',
          'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer'
        ]">
          <component :is="item.icon" :class="[
            item.current ? 'text-blue-700 dark:text-accent' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
            'mr-3 flex-shrink-0 h-5 w-5'
          ]" aria-hidden="true" />
          {{ item.name }}
        </a>

        <!-- Settings (Collapsible) -->
        <div>
          <button 
            @click="isSettingsExpanded = !isSettingsExpanded"
            class="w-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <div class="flex items-center">
              <Settings class="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              Settings
            </div>
            <ChevronDown v-if="isSettingsExpanded" class="w-4 h-4 text-gray-400" />
            <ChevronRightIcon v-else class="w-4 h-4 text-gray-400" />
          </button>
          
          <div v-if="isSettingsExpanded" class="mt-1 ml-4 space-y-1 border-l border-border pl-2">
            <a v-for="item in settingsItems" :key="item.name" @click="navigateTo(item.href)" :class="[
              item.current
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-accent'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100',
              'group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer'
            ]">
              <component :is="item.icon" class="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
              {{ item.name }}
            </a>
          </div>
        </div>
      </nav>


      <!-- Footer / User / Theme -->
      <div class="border-t border-border p-4 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center overflow-hidden">
            <img class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#051766] font-bold text-xs" 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=TEST1"
              :alt="`${authStore.user?.name || 'User'} avatar`" />
            <div class="ml-3 min-w-0">
              <p class="text-sm font-medium text-main truncate">{{ authStore.user?.name || 'User' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.user?.userSe === 'USR' ? 'Employee' : 'Admin' }}</p>
            </div>
          </div>
          <ThemeSwitch />
        </div>
        
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors group">
          <LogOut class="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
          Log out
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" @click="toggleMobileMenu"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"></div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import {
  kpiData,
  spendingLimitsData,
  balanceHistoryData,
  transactionsData
} from '../data/mockData'

import Sidebar from '../components/dashboard/Sidebar.vue'
import KpiCard from '../components/dashboard/KpiCard.vue'
import SpendingLimits from '../components/dashboard/SpendingLimits.vue'
import BalanceChart from '../components/dashboard/BalanceChart.vue'
import TransactionTable from '../components/dashboard/TransactionTable.vue'
import { Search, Bell, Menu, LogOut } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarCollapsed = ref(false)
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-primary transition-colors duration-300">
    <!-- Sidebar -->
    <Sidebar :is-collapsed="isSidebarCollapsed" />

    <!-- Main Content -->
    <main class="min-h-screen flex flex-col transition-all duration-300 ease-in-out"
      :class="[isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-[260px]']">
      <!-- Top Header (Search & Notifications) -->
      <header
        class="sticky top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-border px-6 h-16 flex items-center justify-between shadow-sm dark:shadow-none">
        <div class="flex items-center gap-4">
          <!-- Desktop Sidebar Toggle -->
          <button @click="toggleSidebar"
            class="hidden lg:flex p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Menu class="w-5 h-5" />
          </button>

          <!-- Search Bar (Subtler) -->
          <div
            class="hidden md:flex items-center bg-gray-50 dark:bg-gray-800/50 border border-border rounded-lg px-3 py-2 w-96 focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-accent/50 transition-all">
            <Search class="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search..."
              class="bg-transparent border-none outline-none text-main placeholder-gray-400 w-full text-sm" />
          </div>
        </div>

        <!-- Mobile Title (Visible only when sidebar hidden/mobile) -->
        <div class="md:hidden text-lg font-bold text-main ml-10 lg:ml-0">
          Dashboard
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <button
            class="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Bell class="w-5 h-5" />
            <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          <button @click="handleLogout"
            class="p-2 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors"
            title="Logout">
            <LogOut class="w-5 h-5" />
          </button>
        </div>
      </header>

      <!-- Content Grid -->
      <div class="p-6 space-y-6 flex-1 max-w-[1440px] mx-auto w-full">

        <!-- KPI Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard v-for="kpi in kpiData" :key="kpi.id" :label="kpi.label" :value="kpi.value" :trend="kpi.trend"
            :trend-up="kpi.trendUp" />
        </div>

        <!-- Analytics Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Spending Limits (1/3 width on large) -->
          <div class="lg:col-span-1">
            <SpendingLimits :items="spendingLimitsData" />
          </div>

          <!-- Balance Chart (2/3 width on large) -->
          <div class="lg:col-span-2">
            <BalanceChart :data="balanceHistoryData" />
          </div>
        </div>

        <!-- Transaction Table -->
        <div class="w-full">
          <TransactionTable :data="transactionsData" />
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { 
  Search, 
  UserPlus, 
  Trash2, 
  Download, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCcw,
  Menu,
  LogOut,
  Home
} from 'lucide-vue-next'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { userManageApi } from '../../api/userManage'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarCollapsed = ref(false)

// State
const users = ref([])
const totalCount = ref(0)
const isLoading = ref(false)
const searchQuery = ref('')
const searchType = ref('이름')
const statusFilter = ref('전체')
const pageIndex = ref(1)

// Status mapping for API
const statusMap = {
  '전체': '0',
  '승인': 'P',
  '신청': 'A'
}

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const params = {
      searchCondition: searchType.value === '이름' ? '1' : '0',
      searchKeyword: searchQuery.value,
      sbscrbSttus: statusMap[statusFilter.value],
      pageIndex: pageIndex.value,
      recordCountPerPage: 10
    }
    const response = await userManageApi.getUsers(params)
    users.value = response.data.list
    totalCount.value = response.data.totalCount
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

// Watch for changes to refetch
watch([statusFilter, pageIndex], () => {
  fetchUsers()
})

const handleSearch = () => {
  pageIndex.value = 1
  fetchUsers()
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const navigateTo = (path) => {
  if (path !== '#') {
    router.push(path)
  }
}
</script>

<template>
  <div class="min-h-screen bg-primary transition-colors duration-300">
    <!-- Sidebar -->
    <Sidebar :is-collapsed="isSidebarCollapsed" />

    <!-- Main Content -->
    <main class="min-h-screen flex flex-col transition-all duration-300 ease-in-out"
      :class="[isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-[260px]']">
      
      <!-- Header -->
      <header
        class="sticky top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-border px-6 h-16 flex items-center justify-between shadow-sm dark:shadow-none">
        <div class="flex items-center gap-4">
          <button @click="toggleSidebar"
            aria-label="Toggle sidebar"
            class="hidden lg:flex p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Menu class="w-5 h-5" />
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button @click="handleLogout"
            aria-label="Logout"
            class="p-3 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors">
            <LogOut class="w-5 h-5" />
          </button>
        </div>
      </header>

      <!-- Content Grid -->
      <div class="p-6 space-y-6 flex-1 w-full">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <a @click="navigateTo('/dashboard')" class="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            <Home class="w-4 h-4" />
            <span>Home</span>
          </a>
          <ChevronRight class="w-4 h-4" />
          <a @click="navigateTo('/settings')" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            Settings
          </a>
          <ChevronRight class="w-4 h-4" />
          <span class="text-main font-medium">User Management</span>
        </nav>

        <!-- Summary & Actions -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div class="flex items-center gap-4 text-sm">
            <span class="text-gray-500">사용자수 <span class="font-bold text-[#051766] dark:text-accent">{{ totalCount }}</span></span>
            <div class="h-4 w-px bg-border"></div>
            <div class="flex items-center gap-2">
              <label for="status-filter" class="sr-only">Status filter</label>
              <select 
                id="status-filter"
                v-model="statusFilter" 
                class="bg-primary border border-border rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                <option>전체</option>
                <option>승인</option>
                <option>신청</option>
              </select>
            </div>
            <button @click="fetchUsers" 
              aria-label="Refresh data"
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 transition-colors" 
              :class="{'animate-spin': isLoading}">
              <RefreshCcw class="w-4 h-4" />
            </button>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex items-center bg-primary border border-border rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label for="search-type" class="sr-only">Search type</label>
              <select 
                id="search-type"
                v-model="searchType" 
                class="bg-transparent border-none outline-none text-xs text-gray-500 cursor-pointer mr-2 pr-2 border-r border-border">
                <option>이름</option>
                <option>아이디</option>
              </select>
              <label for="search-input" class="sr-only">Search input</label>
              <input 
                id="search-input"
                v-model="searchQuery"
                type="text" 
                placeholder="검색어 입력..."
                @keyup.enter="handleSearch"
                class="bg-transparent border-none outline-none text-xs text-main placeholder-gray-400 w-32 md:w-48" />
              <button @click="handleSearch" aria-label="Search">
                <Search class="w-4 h-4 text-gray-400 ml-2 hover:text-blue-500 transition-colors" />
              </button>
            </div>
            
            <button 
              aria-label="Add new user"
              class="flex items-center gap-2 bg-[#051766] hover:bg-[#041255] text-white px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-md min-h-[44px]">
              <UserPlus class="w-4 h-4" />
              <span class="hidden sm:inline">등록</span>
            </button>
            <button 
              aria-label="Delete selected users"
              class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/10 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg text-xs font-medium transition-all min-h-[44px]">
              <Trash2 class="w-4 h-4" />
              <span class="hidden sm:inline">삭제</span>
            </button>
            <button 
              aria-label="Export to Excel"
              class="flex items-center justify-center p-2 border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px]">
              <Download class="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-surface rounded-xl border border-border shadow-sm overflow-hidden relative">
          <!-- Loading Overlay -->
          <div v-if="isLoading" class="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
              <RefreshCcw class="w-8 h-8 text-blue-600 animate-spin" />
              <span class="text-xs font-medium text-blue-600">데이터를 불러오는 중...</span>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800/50 text-gray-500 font-medium text-xs uppercase tracking-wider border-b border-border">
                  <th class="px-6 py-4 w-4">
                    <label class="sr-only" for="select-all">Select all users</label>
                    <input id="select-all" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" aria-label="Select all users" />
                  </th>
                  <th class="px-6 py-4">아이디</th>
                  <th class="px-6 py-4 hidden md:table-cell">사용자이름</th>
                  <th class="px-6 py-4 hidden lg:table-cell">사용자이메일</th>
                  <th class="px-6 py-4 hidden xl:table-cell">전화번호</th>
                  <th class="px-6 py-4 hidden lg:table-cell">등록일</th>
                  <th class="px-6 py-4">가입상태</th>
                  <th class="px-6 py-4">설정</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border text-sm">
                <tr v-for="user in users" :key="user.uniqId" class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                  <td class="px-6 py-4">
                    <label class="sr-only" :for="`select-user-${user.uniqId}`">Select {{ user.emplyrNm }}</label>
                    <input :id="`select-user-${user.uniqId}`" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" :aria-label="`Select ${user.emplyrNm}`" />
                  </td>
                  <td class="px-6 py-4 font-medium text-main group-hover:text-blue-600">{{ user.emplyrId }}</td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{{ user.emplyrNm }}</td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell">{{ user.emailAdres }}</td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-xs hidden xl:table-cell">{{ user.moblphonNo || '-' }}</td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell">{{ user.sbscrbDe }}</td>
                  <td class="px-6 py-4">
                    <span :class="[
                      'px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap',
                      user.emplyrSttusCode === 'P' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                    ]">
                      {{ user.emplyrSttusCode === 'P' ? '승인' : '신청' }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <button 
                      aria-label="User settings"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-main">
                      <Filter class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr v-if="users.length === 0 && !isLoading">
                  <td colspan="8" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <div class="flex flex-col items-center gap-2">
                      <svg class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                      </svg>
                      <p class="font-medium">조회된 데이터가 없습니다</p>
                      <p class="text-xs text-gray-400">검색 조건을 변경하거나 새로운 사용자를 등록해보세요</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/20 border-t border-border flex items-center justify-between">
            <span class="text-xs text-gray-500">
              Showing {{ (pageIndex - 1) * 10 + 1 }} to {{ Math.min(pageIndex * 10, totalCount) }} of {{ totalCount }} results
            </span>
            <div class="flex items-center gap-1">
              <button 
                @click="pageIndex--" 
                :disabled="pageIndex === 1"
                aria-label="Previous page"
                class="p-2 border border-border rounded hover:bg-white dark:hover:bg-gray-800 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button 
                disabled
                aria-label="Current page"
                aria-current="page"
                class="px-3 py-1 border border-blue-500 bg-blue-600 text-white rounded text-xs font-medium min-w-[40px]">{{ pageIndex }}</button>
              <button 
                @click="pageIndex++"
                :disabled="pageIndex * 10 >= totalCount"
                aria-label="Next page"
                class="p-2 border border-border rounded hover:bg-white dark:hover:bg-gray-800 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.text-main {
  color: #1a1a1a;
}
.dark .text-main {
  color: #f3f4f6;
}
</style>

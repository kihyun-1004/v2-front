<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'
import { 
  Search, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronDown,
  Plus,
  Check,
  Upload,
  Trash2,
  Edit
} from 'lucide-vue-next'
import Sidebar from '../../components/dashboard/Sidebar.vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarCollapsed = ref(false)

// Tabulator 관련
const table = ref(null)
const tabulator = ref(null)

// Filter states
const ucName = ref('')
const item = ref('')
const instanceNumber = ref('')
const serialNumber = ref('')
const lotNumber = ref('')
const ucStatus = ref('All')
const mcName = ref('')
const mcStatus = ref('All')
const searchFor = ref('All')
const mcRevision = ref('Submit for Approval')

// Table data - reactive로 변경
const tableData = reactive([
  { id: 1, name: 'UC-001', status: 'Complete', item: 'A', mcName: 'MC-A01', instance: '01', mc: 'MC', serial: 'SN-001', lotStatus: 'Active', lot: 'LOT-001' },
  { id: 2, name: 'UC-002', status: 'Draft', item: 'B', mcName: 'MC-B01', instance: '02', mc: 'MC', serial: 'SN-002', lotStatus: 'Active', lot: 'LOT-002' },
  { id: 3, name: 'UC-003', status: 'Complete', item: 'C', mcName: 'MC-C01', instance: '03', mc: 'MC', serial: 'SN-003', lotStatus: 'Inactive', lot: 'LOT-003' },
  { id: 4, name: 'UC-004', status: 'Approval Pending', item: 'A', mcName: 'MC-A02', instance: '04', mc: 'MC', serial: 'SN-004', lotStatus: 'Active', lot: 'LOT-004' },
  { id: 5, name: 'UC-005', status: 'Complete', item: 'B', mcName: 'MC-B02', instance: '05', mc: 'MC', serial: 'SN-005', lotStatus: 'Active', lot: 'LOT-005' },
  { id: 6, name: 'UC-006', status: 'Quarantine', item: 'C', mcName: 'MC-C02', instance: '06', mc: 'MC', serial: 'SN-006', lotStatus: 'Inactive', lot: 'LOT-006' },
  { id: 7, name: 'UC-007', status: 'Complete', item: 'A', mcName: 'MC-A03', instance: '07', mc: 'MC', serial: 'SN-007', lotStatus: 'Active', lot: 'LOT-007' },
  { id: 8, name: 'UC-008', status: 'Draft', item: 'B', mcName: 'MC-B03', instance: '08', mc: 'MC', serial: 'SN-008', lotStatus: 'Active', lot: 'LOT-008' },
  { id: 9, name: 'UC-009', status: 'Complete', item: 'C', mcName: 'MC-C03', instance: '09', mc: 'MC', serial: 'SN-009', lotStatus: 'Inactive', lot: 'LOT-009' },
  { id: 10, name: 'UC-010', status: 'Expired', item: 'A', mcName: 'MC-A04', instance: '10', mc: 'MC', serial: 'SN-010', lotStatus: 'Active', lot: 'LOT-010' }
])

const ucStatusOptions = ['All', 'Approval Pending', 'Approval Rejected', 'Complete', 'Deactivate Quarantine', 'Draft', 'Expired', 'Incomplete', 'Quarantine']
const mcStatusOptions = ['All', 'Complete', 'Expired']
const searchForOptions = ['All', 'Installed Unit', 'Sub Unit', 'Unit']
const actionOptions = ['Submit for Approval', 'Create', 'Validate', 'Migrate', 'Remove', 'Update']

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

const handleAction = (action) => {
  console.log('Action:', action)
}

// Tabulator 초기화
onMounted(() => {
  tabulator.value = new Tabulator(table.value, {
    data: tableData,
    reactiveData: true,
    layout: 'fitDataStretch',
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 50, 100],
    movableColumns: true,
    resizableRows: true,
    responsiveLayout: 'collapse',
    columns: [
      {
        formatter: 'rowSelection', 
        titleFormatter: 'rowSelection', 
        hozAlign: 'center', 
        headerSort: false, 
        width: 60,
        cellClick: function(e, cell) {
          cell.getRow().toggleSelect()
        }
      },
      { title: 'UC Name', field: 'name', sorter: 'string', headerFilter: 'input' },
      { title: 'UC Status', field: 'status', sorter: 'string', headerFilter: 'list', headerFilterParams: { values: ucStatusOptions } },
      { title: 'Item', field: 'item', sorter: 'string', headerFilter: 'input' },
      { title: 'MC Name', field: 'mcName', sorter: 'string', headerFilter: 'input' },
      { title: 'Instance Number', field: 'instance', sorter: 'string', headerFilter: 'input' },
      { title: 'MC', field: 'mc', sorter: 'string' },
      { title: 'Serial Number', field: 'serial', sorter: 'string', headerFilter: 'input' },
      { title: 'Lot Status', field: 'lotStatus', sorter: 'string' },
      { title: 'Lot Number', field: 'lot', sorter: 'string', headerFilter: 'input' },
      {
        title: 'Actions',
        field: 'actions',
        hozAlign: 'center',
        headerSort: false,
        formatter: function(cell) {
          return '<button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-all">상세</button>'
        },
        cellClick: function(e, cell) {
          console.log('Detail clicked for:', cell.getRow().getData())
        }
      }
    ]
  })
})

// 검색 기능
const handleSearch = () => {
  const filters = []
  
  if (ucName.value) filters.push({ field: 'name', type: 'like', value: ucName.value })
  if (item.value) filters.push({ field: 'item', type: 'like', value: item.value })
  if (instanceNumber.value) filters.push({ field: 'instance', type: 'like', value: instanceNumber.value })
  if (serialNumber.value) filters.push({ field: 'serial', type: 'like', value: serialNumber.value })
  if (lotNumber.value) filters.push({ field: 'lot', type: 'like', value: lotNumber.value })
  if (ucStatus.value && ucStatus.value !== 'All') filters.push({ field: 'status', type: '=', value: ucStatus.value })
  if (mcName.value) filters.push({ field: 'mcName', type: 'like', value: mcName.value })
  if (mcStatus.value && mcStatus.value !== 'All') filters.push({ field: 'lotStatus', type: 'like', value: mcStatus.value })
  
  if (tabulator.value) {
    tabulator.value.setFilter(filters)
  }
}

// 초기화 기능
const handleReset = () => {
  ucName.value = ''
  item.value = ''
  instanceNumber.value = ''
  serialNumber.value = ''
  lotNumber.value = ''
  ucStatus.value = 'All'
  mcName.value = ''
  mcStatus.value = 'All'
  searchFor.value = 'All'
  mcRevision.value = 'Submit for Approval'
  
  if (tabulator.value) {
    tabulator.value.clearFilter()
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
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button @click="handleLogout"
            aria-label="Logout"
            class="p-3 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
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
            기준정보관리
          </a>
          <ChevronRight class="w-4 h-4" />
          <span class="text-main font-medium">Unit Configuration</span>
        </nav>

        <!-- Filter Section -->
        <div class="bg-surface rounded-xl border border-border shadow-sm p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <!-- UC Name -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">UC Name</label>
              <div class="relative">
                <input 
                  v-model="ucName"
                  type="text"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main"
                  placeholder="Search..." />
                <Search class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Item -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Item</label>
              <div class="relative">
                <input 
                  v-model="item"
                  type="text"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main"
                  placeholder="Search..." />
                <Search class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Instance Number -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Instance Number</label>
              <div class="relative">
                <input 
                  v-model="instanceNumber"
                  type="text"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main"
                  placeholder="Search..." />
                <Search class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Serial Number -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Serial Number</label>
              <div class="relative">
                <input 
                  v-model="serialNumber"
                  type="text"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main"
                  placeholder="Search..." />
                <Search class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Lot Number -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Lot Number</label>
              <div class="relative">
                <input 
                  v-model="lotNumber"
                  type="text"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main"
                  placeholder="Search..." />
                <Search class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- UC Status -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">UC Status</label>
              <div class="relative">
                <select 
                  v-model="ucStatus"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-main">
                  <option v-for="option in ucStatusOptions" :key="option">{{ option }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <!-- MC Name -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">MC Name</label>
              <input 
                v-model="mcName"
                type="text"
                class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-main" />
            </div>

            <!-- MC Status -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">MC Status</label>
              <div class="relative">
                <select 
                  v-model="mcStatus"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-main">
                  <option v-for="option in mcStatusOptions" :key="option">{{ option }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <!-- Search for -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Search for</label>
              <div class="relative">
                <select 
                  v-model="searchFor"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-main">
                  <option v-for="option in searchForOptions" :key="option">{{ option }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <!-- MC Revision -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">MC Revision</label>
              <div class="relative">
                <select 
                  v-model="mcRevision"
                  class="w-full bg-primary border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-main">
                  <option v-for="option in actionOptions" :key="option">{{ option }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 mt-6 pt-6 border-t border-border">
            <button 
              @click="handleSearch"
              aria-label="Search"
              class="flex items-center gap-2 bg-[#051766] hover:bg-[#041255] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-md">
              <Search class="w-4 h-4" />
              조회
            </button>
            <button 
              @click="handleReset"
              aria-label="Refresh"
              class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg text-sm font-medium transition-all">
              <RefreshCw class="w-4 h-4" />
              초기화
            </button>
          </div>
        </div>

        <!-- Tabulator Table -->
        <div class="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div ref="table"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.text-main {
  color: var(--text-main);
}
</style>
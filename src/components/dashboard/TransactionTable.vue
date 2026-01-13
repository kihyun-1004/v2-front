<script setup>
import { onMounted, ref, watch } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'

const props = defineProps({
  data: { type: Array, required: true }
})

const tableRef = ref(null)
const tabulator = ref(null)

// Custom Formatters
const statusFormatter = (cell) => {
  const value = cell.getValue()
  let classes = 'text-xs font-medium px-2 py-1 rounded-full '

  // Design brief: low-opacity backgrounds with high-opacity text
  // e.g., bg-emerald-500/10 text-emerald-500
  switch (value.toLowerCase()) {
    case 'completed':
    case 'approved':
      classes += 'bg-emerald-500/10 text-emerald-500'
      break
    case 'pending':
    case 'review':
      classes += 'bg-yellow-500/10 text-yellow-500' // or orange
      break
    case 'rejected':
      classes += 'bg-red-500/10 text-red-500'
      break
    default:
      classes += 'bg-blue-500/10 text-blue-500'
  }

  return `<span class="${classes}">${value}</span>`
}

const userFormatter = (cell) => {
  const user = cell.getValue()
  // Brief: Avatar + Name Inline
  return `
    <div class="flex items-center gap-3">
      <img src="${user.avatar}" class="w-8 h-8 rounded-full bg-gray-700" alt="${user.name}">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-main dark:text-gray-200">${user.name}</span>
        <span class="text-xs text-muted dark:text-gray-400">${user.email}</span>
      </div>
    </div>
  `
}

const currencyFormatter = (cell) => {
  const value = cell.getValue()
  return `<span class="font-semibold text-main dark:text-gray-100">$${value.toFixed(2)}</span>`
}

onMounted(() => {
  if (!tableRef.value) return

  tabulator.value = new Tabulator(tableRef.value, {
    data: props.data,
    layout: "fitColumns",
    responsiveLayout: "collapse",
    columns: [
      { title: "User", field: "user", formatter: userFormatter, widthGrow: 2, headerSort: false },
      { title: "Date", field: "date", sorter: "date", width: 120 },
      { title: "Description", field: "description", widthGrow: 2 },
      { title: "Amount", field: "amount", formatter: currencyFormatter, width: 120, hozAlign: "right" },
      { title: "Status", field: "status", formatter: statusFormatter, width: 120, hozAlign: "center" },
    ],
    // Pagination
    pagination: true,
    paginationSize: 8,
    // Styling config handled by CSS overrides
  })
})

// Update data if props change
watch(() => props.data, (newData) => {
  if (tabulator.value) {
    tabulator.value.replaceData(newData)
  }
})
</script>

<template>
  <div class="bg-surface rounded-card border border-border p-6 overflow-hidden">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg text-main">Latest Transactions</h3>
      <button class="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
    </div>

    <div ref="tableRef" class="w-full"></div>
  </div>
</template>

<style scoped>
/* Scoped overrides if necessary, but using global base.css for tabulator is safer for structure */
</style>

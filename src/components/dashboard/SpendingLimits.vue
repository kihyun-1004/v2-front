<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const totalLimit = computed(() => {
  return props.items.reduce((acc, item) => acc + item.limit, 0)
})

const totalSpent = computed(() => {
  return props.items.reduce((acc, item) => acc + item.spent, 0)
})

const percentageSpent = computed(() => {
  if (totalLimit.value === 0) return 0
  return Math.round((totalSpent.value / totalLimit.value) * 100)
})
</script>

<template>
  <div class="bg-surface rounded-card border border-border p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-bold text-lg text-main">Spending Limits</h3>
      <span class="text-sm font-medium text-gray-500">
        ${{ totalSpent.toLocaleString() }} / <span class="text-gray-400">${{ totalLimit.toLocaleString() }}</span>
      </span>
    </div>

    <!-- Progress Bars -->
    <div class="space-y-6">
      <div v-for="item in items" :key="item.id" class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-300 font-medium">{{ item.category }}</span>
          <span class="text-gray-500 font-medium">
            {{ Math.round((item.spent / item.limit) * 100) }}%
          </span>
        </div>

        <div class="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-700 ease-out" :class="item.color"
            :style="{ width: `${(item.spent / item.limit) * 100}%` }"></div>
        </div>

        <div class="text-xs text-right text-gray-400">
          ${{ item.spent.toLocaleString() }} remaining: ${{ (item.limit - item.spent).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

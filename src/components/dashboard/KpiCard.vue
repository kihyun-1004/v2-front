<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: String, required: true },
  trendUp: { type: Boolean, default: null }
})

const trendColor = computed(() => {
  if (props.trendUp === true) return 'text-emerald-500'
  if (props.trendUp === false) return 'text-red-500'
  return 'text-blue-500'
})

const TrendIcon = computed(() => {
  if (props.trendUp === true) return TrendingUp
  if (props.trendUp === false) return TrendingDown
  return Minus
})
</script>

<template>
  <div class="bg-surface rounded-card border border-border p-6 shadow-sm relative overflow-hidden group hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-0.5">
    <!-- Inner Top Shadow/Highlight for depth -->
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent">
    </div>

    <div class="flex justify-between items-start mb-4">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ label }}</h3>
      <div
        :class="['flex items-center text-xs font-semibold px-2.5 py-1 rounded-full transition-all', 
        trendColor === 'text-emerald-500' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
        trendColor === 'text-red-500' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
        'bg-blue-500/10 text-blue-600 dark:text-blue-400']">
        <component :is="TrendIcon" class="w-3 h-3 mr-1" />
        {{ trend }}
      </div>
    </div>

    <div class="text-3xl font-bold text-main tracking-tight">{{ value }}</div>
  </div>
</template>

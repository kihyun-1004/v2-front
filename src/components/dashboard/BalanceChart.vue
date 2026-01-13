<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({
  data: { type: Array, required: true }
})

const chartCanvas = ref(null)
let chartInstance = null
const isLoading = ref(true)

// Helper to get CSS variable values
const getCssVar = (name) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name
}

const renderChart = () => {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const isDark = document.documentElement.classList.contains('dark')

  // Resolve colors
  // Resolve colors
  const accentColor = getCssVar('--accent') // Now dynamic
  const inactiveColor = isDark ? '#262626' : '#E5E7EB' // gray-700 / gray-200
  const textColor = isDark ? '#A3A3A3' : '#6B7280'
  const gridColor = isDark ? '#262626' : '#E5E7EB'

  const labels = props.data.map(d => d.month)
  const dataValues = props.data.map(d => d.amount)

  // Custom colors array based on active state
  const backgroundColors = props.data.map(d => d.active ? accentColor : inactiveColor)
  // Add border radius to top corners
  const borderRadius = 8

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: {
          topLeft: borderRadius,
          topRight: borderRadius,
          bottomLeft: borderRadius,
          bottomRight: borderRadius
        },
        borderSkipped: false,
        barThickness: 40,
        // Make active bar glow?
        // Chart.js doesn't support selective glows strictly without plugins, 
        // but we can trust the color to pop.
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          titleColor: isDark ? '#FFFFFF' : '#000000',
          bodyColor: isDark ? '#A3A3A3' : '#666666',
          borderColor: isDark ? '#262626' : '#E5E7EB',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (context) => `$${context.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor }
        },
        y: {
          grid: {
            color: gridColor,
            borderDash: [5, 5]
          },
          ticks: {
            color: textColor,
            callback: (value) => `$${value / 1000}k`
          },
          border: { display: false }
        }
      },
      layout: {
        padding: 0
      }
    }
  })
}

// Watch for theme changes to re-render chart
// We can use a MutationObserver on document.documentElement
onMounted(() => {
  setTimeout(() => {
    renderChart()
    isLoading.value = false
  }, 300)

  const observer = new MutationObserver(() => {
    // Re-render to update colors
    renderChart()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<template>
  <div class="bg-surface rounded-card border border-border p-6 flex flex-col h-[400px]">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-bold text-lg text-main">Balance History</h3>
      <label for="chart-period" class="sr-only">Select time period</label>
      <select
        id="chart-period"
        class="bg-transparent border border-border rounded-lg text-sm px-3 py-1 text-gray-500 focus:outline-none focus:border-blue-500/50 cursor-pointer">
        <option>Last 6 Months</option>
        <option>Last Year</option>
      </select>
    </div>

    <div class="flex-1 w-full relative">
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm rounded-lg">
        <div class="flex flex-col items-center gap-3">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span class="text-sm text-gray-500">Loading chart...</span>
        </div>
      </div>
      <canvas ref="chartCanvas" :class="{'opacity-0': isLoading, 'opacity-100 transition-opacity duration-500': !isLoading}"></canvas>
    </div>
  </div>
</template>

<template>
<div class="h-screen bg-gray-100 p-6 overflow-hidden">
  <div
    class="bg-white rounded-xl shadow
           flex flex-col
           h-full relative
           overflow-y-auto
           [scrollbar-width:none]
           [-ms-overflow-style:none]
           [&::-webkit-scrollbar]:hidden"
  >


     

      <div class="flex flex-1 overflow-hidden min-h-0">
        <!-- LEFT SIDEBAR -->
        <aside class="w-[300px] border-r border-gray-200 p-5 space-y-4 shrink-0 overflow-y-auto">

          <!-- Header Section -->
          <div>
            <button 
              class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2 hover:text-gray-900 transition-colors"
              @click="$emit('back')"
            >
              <ArrowLeft class="w-4 h-4" />
              Configure dashboard
            </button>
            <p class="text-xs text-gray-500">
              Configure your dashboard to start viewing analytics
            </p>
          </div>

          <!-- Show data for Section -->
          <div class="border border-gray-200 rounded-lg p-3 bg-white">
            <label class="text-xs font-medium text-gray-700 block mb-2">Show data for</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All time</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <!-- Widget library Section -->
          <div class="border border-gray-200 rounded-lg p-3 bg-white">
            <label class="text-xs font-medium text-gray-700 block mb-1">Widget library</label>
            <p class="text-xs text-gray-500">Drag and drop your canvas</p>
          </div><br>

          <!-- Charts Section -->
          <details open class="border border-gray-200 rounded-lg bg-white">
            <summary class="px-3 py-2 font-medium text-gray-700 cursor-pointer flex items-center justify-between list-none hover:bg-gray-50 rounded-t-lg">
              <span>Charts</span>
              <ChevronUp class="w-4 h-4 text-gray-500" />
            </summary>
            <div class="px-2 py-2 space-y-1 border-t border-gray-200">
              <div
                v-for="chart in widgets.charts"
                :key="chart.label"
                draggable="true"
                @dragstart="startDrag(chart)"
                class="flex items-center gap-3 px-2 py-2 rounded-md cursor-grab hover:bg-gray-50 text-sm text-gray-700 transition-colors"
              >
                <GripVertical class="w-4 h-4 text-gray-400" />
                <component :is="chart.icon" class="w-4 h-4 text-gray-600" />
                <span>{{ chart.label }}</span>
              </div>
            </div>
          </details>

          <!-- Tables Section -->
          <details open class="border border-gray-200 rounded-lg bg-white">
            <summary class="px-3 py-2 font-medium text-gray-700 cursor-pointer flex items-center justify-between list-none hover:bg-gray-50 rounded-t-lg">
              <span>Tables</span>
              <ChevronUp class="w-4 h-4 text-gray-500" />
            </summary>
            <div class="px-2 py-2 space-y-1 border-t border-gray-200">
              <div
                draggable="true"
                @dragstart="startDrag({ type: 'table', label: 'Table' })"
                class="flex items-center gap-3 px-2 py-2 rounded-md cursor-grab hover:bg-gray-50 text-sm text-gray-700 transition-colors"
              >
                <GripVertical class="w-4 h-4 text-gray-400" />
                <Table class="w-4 h-4 text-gray-600" />
                <span>Table</span>
              </div>
            </div>
          </details>

          <!-- KPIs Section -->
          <details open class="border border-gray-200 rounded-lg bg-white">
            <summary class="px-3 py-2 font-medium text-gray-700 cursor-pointer flex items-center justify-between list-none hover:bg-gray-50 rounded-t-lg">
              <span>KPIs</span>
              <ChevronUp class="w-4 h-4 text-gray-500" />
            </summary>
            <div class="px-2 py-2 space-y-1 border-t border-gray-200">
              <div
                draggable="true"
                @dragstart="startDrag({ type: 'kpi', label: 'KPI Value' })"
                class="flex items-center gap-3 px-2 py-2 rounded-md cursor-grab hover:bg-gray-50 text-sm text-gray-700 transition-colors"
              >
                <GripVertical class="w-4 h-4 text-gray-400" />
                <Activity class="w-4 h-4 text-gray-600" />
                <span>KPI Value</span>
              </div>
            </div>
          </details>

        </aside>

        <!-- MAIN AREA -->
        <main class="flex  flex-col relative overflow-hidden min-h-0">

          <!-- CANVAS -->
          <div
            class="flex-1 bg-gray-50 p-6 overflow-hidden min-h-0"
            @dragover.prevent
            @drop="onDrop"
          >
            <div class="bg-white border border-gray-200 rounded-lg h-full relative overflow-hidden">
              
              <!-- Grid Canvas -->
              <div
                ref="gridRef"
                class="grid grid-cols-12 auto-rows-[80px] gap-3 p-4 relative z-10"
              >
                <!-- Existing Widgets -->
                <div
                  v-for="item in gridItems"
                  :key="item.id"
                  :class="[`col-span-${item.colSpan}`, `row-span-${item.rowSpan}`]"
                  class="group bg-white border border-gray-200 rounded-md flex flex-col cursor-grab hover:shadow-md transition-shadow"
                >
                  <!-- HEADER -->
                  <div class="flex justify-between items-center px-3 py-2 border-b border-gray-100">
                    <p class="text-xs font-medium text-gray-700">
                      {{ item.title || item.label }}
                    </p>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2
                        class="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                        @click="deleteWidget(item.id)"
                      />
                      <Settings
                        class="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
                        @click="configureWidget(item)"
                      />
                    </div>
                  </div>

                  <!-- BODY -->
                  <div class="flex-1 flex items-center justify-center p-2">
                    <p
                      v-if="item.type === 'kpi'"
                      class="text-3xl font-semibold text-gray-800"
                    >
                      {{ item.value }}
                    </p>
                    <div
                      v-else
                      class="text-gray-400 text-sm"
                    >
                      Configure {{ item.type }}
                    </div>
                  </div>
                </div>

                <!-- Grid Placeholders with Light Gray Background and Light Borders -->
                <div
                  v-for="i in (120 - gridItems.length)"
                  :key="`placeholder-${i}`"
                  class="bg-gray-50 border border-gray-100 rounded-md"
                >
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="border-t border-gray-200 bg-white px-6 py-4 flex justify-end gap-3 shrink-0">
            <button 
              class="px-6 py-2 border border-green-500 text-green-600 bg-white rounded-md font-medium hover:bg-green-50 transition-colors"
              @click="$emit('back')"
            >
              Cancel
            </button>
            <button
              class="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
              @click="saveDashboard"
            >
              Save
            </button>
          </div>
           <!-- Success Toast Notification (Top Right Corner) -->
      <div
        v-if="showToast"
        class="fixed top-4 right-100 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
      >
        <Check class="w-5 h-5 flex-shrink-0" />
        <span class="font-medium">All set! Your changes have been saved successfully</span>
        <button @click="showToast = false" class="ml-2 hover:bg-green-700 rounded p-1 transition-colors">
          <X class="w-4 h-4" />
        </button>
      </div>

         </main>
         <!-- BACKGROUND OVERLAY -->
       <div
        v-if="isConfigOpen"
        class="relative  flex place-items-end inset-0 bg-black/40 z-[9998]"
         @click="isConfigOpen = false"
        >

        <!-- RIGHT CONFIG PANEL -->
        <div   v-if="isConfigOpen"
        class="relative right-0 h-screen w-[400px]
         bg-white border-r border-gray-300
         shadow-2xl z-[9999]
         flex-1 flex-col justify-self-end animate-slide-in inset-y-0"
        >
        <!-- HEADER -->
         <div class="h-14 px-5 flex items-center justify-between border-b bg-white">
         <h3 class="text-sm font-semibold text-gray-800">
         Widget configuration
         </h3>
        <button @click="isConfigOpen = false">
        <X class="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </button>
         </div>

  <!-- BODY -->
  <div class="flex-1 overflow-y-auto px-5 py-4 space-y-6">

    <div>
      <label class="text-xs font-medium text-gray-700">
        Widget title *
      </label>
      <input
        v-model="selectedWidget.title"
        class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label class="text-xs font-medium text-gray-700">
        Widget type
      </label>
      <input
        disabled
        :value="selectedWidget.type"
        class="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>

    <div>
      <label class="text-xs font-medium text-gray-700">
        Description
      </label>
      <textarea
        rows="3"
        placeholder="Add description"
        class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
      ></textarea>
    </div>

    <div>
      <p class="text-xs font-semibold text-gray-800 mb-2">
        Widget size
      </p>
      <div class="grid grid-cols-2 gap-3">
        <select v-model="selectedWidget.colSpan" class="border rounded-md px-2 py-2 text-sm bg-white">
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="6">6</option>
        </select>

        <select v-model="selectedWidget.rowSpan" class="border rounded-md px-2 py-2 text-sm bg-white">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
        </select>
      </div>
    </div>

    <div>
      <p class="text-xs font-semibold text-gray-800 mb-2">
        Data setting
      </p>
      <div class="space-y-3">
        <select class="border rounded-md px-2 py-2 text-sm bg-white w-full">
          <option>Select metric *</option>
        </select>
        <select class="border rounded-md px-2 py-2 text-sm bg-white w-full">
          <option>Aggregation *</option>
        </select>
        <select class="border rounded-md px-2 py-2 text-sm bg-white w-full">
          <option>Data format *</option>
        </select>
        <input
          type="number"
          placeholder="Decimal precision"
          class="border rounded-md px-2 py-2 text-sm bg-white w-full"
        />
      </div>
    </div>

  </div>

  <!-- FOOTER -->
  <div class="h-14 px-5 flex items-center justify-end gap-3 border-t bg-white">
    <button
      class="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
      @click="isConfigOpen = false"
    >
      Cancel
    </button>
    <button
      class="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
      @click="applyConfig"
    >
      Save
    </button>
  </div>
</div>

</div><!--config end tag-->

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Sortable from "sortablejs"
import { 
  GripVertical, 
  BarChart3, 
  LineChart,
  PieChart,
  TrendingUp,
  ScatterChart,
  Activity, 
  Trash2, 
  Settings,
  ArrowLeft,
  Check,
  X,
  ChevronUp,
  Table
} from "lucide-vue-next"

const gridRef = ref(null)
const draggingItem = ref(null)
const gridItems = ref([
  {
    id: 1,
    type: 'kpi',
    label: 'KPI Value',
    title: 'Total Orders',
    value: 0,
    colSpan: 3,
    rowSpan: 2,
  }
])

const isConfigOpen = ref(false)
const selectedWidget = ref(null)
const showToast = ref(false)

const widgets = {
  charts: [
    { label: "Bar Chart", type: "chart", icon: BarChart3 },
    { label: "Line Chart", type: "chart", icon: LineChart },
    { label: "Pie Chart", type: "chart", icon: PieChart },
    { label: "Area Chart", type: "chart", icon: TrendingUp },
    { label: "Scatter Plot", type: "chart", icon: ScatterChart },
  ],
}

function startDrag(item) {
  draggingItem.value = item
}

function onDrop() {
  if (!draggingItem.value) return

  gridItems.value.push({
    id: Date.now(),
    type: draggingItem.value.type,
    label: draggingItem.value.label,
    title: "Untitled",
    value: 0,
    colSpan: 3,
    rowSpan: 2,
  })

  draggingItem.value = null
}

function deleteWidget(id) {
  gridItems.value = gridItems.value.filter(w => w.id !== id)
}

function configureWidget(widget) {
  selectedWidget.value = { ...widget }
  isConfigOpen.value = true
}

function applyConfig() {
  const index = gridItems.value.findIndex(w => w.id === selectedWidget.value.id)
  if (index !== -1) {
    gridItems.value[index] = { ...selectedWidget.value }
  }
  isConfigOpen.value = false
}

onMounted(() => {
  if (gridRef.value) {
    Sortable.create(gridRef.value, { 
      animation: 150,
      handle: '.group',
      filter: '.bg-gray-50' // Don't allow sorting placeholders
    })
  }
})

function saveDashboard() {
  showToast.value = true
  setTimeout(() => showToast.value = false, 5000)
}

</script>

<style scoped>
/* Hide default details marker */
details summary::-webkit-details-marker {
  display: none;
}

details summary::marker {
  display: none;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out forwards;
}

</style>

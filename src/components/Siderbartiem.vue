<!-- CHARTS -->
<div class="bg-gray-50 border rounded-lg p-2">
  <button class="w-full flex justify-between items-center text-sm font-medium px-2 py-1">
    Charts
    <span>⌄</span>
  </button>

  <div class="mt-2 space-y-1">
    <div
      v-for="item in widgets.charts"
      :key="item.type"
      draggable="true"
      @dragstart="startDrag(item)"
      @dragend="stopDrag"
      class="flex items-center gap-3 px-2 py-2 rounded-md
             hover:bg-gray-100 cursor-grab text-sm"
    >
      <!-- Drag dots -->
      <GripVertical class="w-4 h-4 text-gray-400" />

      <!-- Icon -->
      <component
        :is="item.icon"
        class="w-4 h-4 text-gray-600"
      />

      <!-- Label -->
      <span>{{ item.label }}</span>
    </div>
  </div>
</div>
<div class="bg-gray-50 border rounded-lg p-2 mt-3">
  <button class="w-full text-sm font-medium px-2 py-1">
    Tables
  </button>

  <div
    draggable="true"
    @dragstart="startDrag(widgets.tables[0])"
    @dragend="stopDrag"
    class="flex items-center gap-3 px-2 py-2 rounded-md
           hover:bg-gray-100 cursor-grab text-sm"
  >
    <GripVertical class="w-4 h-4 text-gray-400" />
    <Table class="w-4 h-4 text-gray-600" />
    Table
  </div>
</div>
<div class="bg-gray-50 border rounded-lg p-2 mt-3">
  <button class="w-full text-sm font-medium px-2 py-1">
    KPIs
  </button>

  <div
    draggable="true"
    @dragstart="startDrag(widgets.kpis[0])"
    @dragend="stopDrag"
    class="flex items-center gap-3 px-2 py-2 rounded-md
           hover:bg-gray-100 cursor-grab text-sm"
  >
    <GripVertical class="w-4 h-4 text-gray-400" />
    <Activity class="w-4 h-4 text-gray-600" />
    KPI Value
  </div>
</div>



<template>
  <!-- GRID AREA -->
  <div
    class="grid grid-cols-12 gap-2 bg-white p-4 border rounded-md"
  >
    <div
      v-for="i in 120"
      :key="i"
      class="h-10 bg-gray-200 rounded text-xs
             flex items-center justify-center text-gray-500"
    >
      {{ (i - 1) % 12 + 1 }}
    </div>
  </div>
</template>

<script setup>
// No script needed now
</script>

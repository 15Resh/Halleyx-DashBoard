<template>
  <div class="px-3 py-2 border-b text-sm font-medium bg-gray-50">
    {{ title }}
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>

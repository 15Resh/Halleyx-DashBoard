<template>
  <DashboardEmpty v-if="page === 'empty'" @configure="page = 'config'" />
  <ConfigureDashboard v-else @back="page = 'empty'" />
</template>

<script setup>
import { ref } from 'vue'
import DashboardEmpty from './views/DashboardEmpty.vue'
import ConfigureDashboard from './views/ConfigureDashboard.vue'

const page = ref('empty')
</script>

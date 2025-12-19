<template>
  <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen p-6">
    <!-- Main Container -->
    <div class="bg-white rounded-2xl shadow-2xl p-8 relative max-w-4xl mx-auto">

      <!-- Header -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-2xl font-bold text-indigo-900">
            Customer Orders
          </h1>
          <p class="text-sm text-indigo-600 mt-1">
            View and manage customer orders and details
          </p>

          <!-- Tabs -->
          <div class="flex gap-4 mt-6 text-sm">
            <button class="flex items-center gap-1 text-white bg-green-500 font-medium px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
              <span>Dashboard</span>
            </button>
            <button class="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg transition">
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="flex flex-col items-center justify-center py-32">
        <div
          class="w-20 h-20 border-2 border-purple-300 rounded-full flex items-center justify-center mb-4 text-3xl bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 text-purple-700 animate-pulse"
        >
          📈
        </div>

        <h2 class="text-lg font-semibold text-indigo-900">
          Dashboard Not Configured
        </h2>

        <p class="text-sm text-indigo-600 mt-2 text-center max-w-xs">
          Configure your dashboard to start viewing analytics
        </p>

        <!-- Dynamic Blue → Pink Button -->
        <button
          class="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-lg transform transition-all duration-300 ease-in-out hover:bg-pink-500 hover:scale-105 hover:shadow-2xl"
          @click="$emit('configure')"
        >
          ⚙ Configure dashboard
        </button>
      </div>
    </div>
  </div>
</template>

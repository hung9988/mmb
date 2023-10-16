<template>
  <div class="flex">
    <div
      class="flex-shrink-0 w-48 h-screen border-r border-gray-200 dark:border-gray-800"
    >
      <Navigation />
    </div>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

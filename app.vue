<template>
  <NuxtLayout class="bg-gray-50 dark:bg-gray-900">
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
</template>

<script setup lang="ts">
useHead({
  meta: [
    {
      property: "og:image",
      content: "/cover5 - Copy.jpg",
    },
    {
      property: "og:title",
      content: "LOLICON",
    },
    {
      property: "og:description",
      content: "A SITE ABOUT LOLIPOSTING",
    },
  ],
});
</script>

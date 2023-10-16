<script setup lang="ts">
import type { Database } from "@/types/supabase";

const supabase = useSupabaseClient<Database>();

const page = ref(1);

const { data: res, pending } = useAsyncData(
  async () => {
    const { data, count } = await supabase
      .from("activities")
      .select("*", { count: "exact" })
      .range((page.value - 1) * 7, page.value * 7)
      .order("start_time", { ascending: true });

    return { data, count };
  },
  {
    watch: [page],
  }
);

const card = {
  body: {
    base: "h-full",
    padding: "p-0 sm:p-0",
  },
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <UContainer class="mt-12 space-y-12">
    <div v-if="pending" class="grid grid-cols-4 gap-6">
      <UCard v-for="_ in Array(8).fill(0)" :ui="card" class="max-h-72">
        <template #header>
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-full mt-2" />
        </template>

        <USkeleton class="h-48 w-full" />
      </UCard>
    </div>

    <div v-else class="grid grid-cols-4 gap-6">
      <UCard v-for="row in res?.data" :ui="card" class="max-h-72">
        <template #header>
          {{ row.name }}
          <br />
          {{ row.start_time }}
        </template>

        <img
          v-if="row.image"
          class="h-full w-auto object-cover"
          :src="row.image"
        />
      </UCard>
    </div>

    <div class="flex justify-center">
      <UPagination
        v-if="res?.count"
        v-model="page"
        :page-count="8"
        :total="res.count"
      />
    </div>
  </UContainer>
</template>

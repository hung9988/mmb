<script setup lang="ts">
import type { Database } from "@/types/supabase";
const isOpen = ref(false);
const supabase = useSupabaseClient<Database>();

const page = ref(1);
const goToWebsite = (url) => {
  window.open(url);
};

const { data: res, pending } = useAsyncData(
  async () => {
    const { data, count } = await supabase
      .from("activities")
      .select("*", { count: "exact" })
      .range((page.value - 1) * 7, page.value * 7)
      .order("start_time", { ascending: false });

    return { data, count };
  },

  {
    watch: [page],
    transform: (res) => ({
      ...res,
      data: res.data?.map((data) => ({
        ...data,
        start_time: data.start_time ? new Date(data.start_time) : null,
        finish_time: data.finish_time ? new Date(data.finish_time) : null,
      })),
    }),
  }
);

const card = {
  body: {
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
      <UCard v-for="row in res?.data" :ui="card" class="">
        <template #header>
          {{ row.name }}
        </template>

        <img v-if="row.image" class="w-auto object-cover" :src="row.image" />

        <template #footer>
          <div class="flex justify-center pb-10">
            Ngày bắt đầu:
            {{
              row.start_time?.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </div>

          <div class="flex justify-center pb-10">
            Ngày kết thúc:
            {{
              row.finish_time?.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </div>

          <div class="flex justify-center">
            <UButton
              label="See details"
              @click="goToWebsite(row.detail)"
              target="blank"
            >
            </UButton>
          </div>
        </template>
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

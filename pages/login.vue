<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const toast = useToast();
const pending = ref(false);

const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const supabase = useSupabaseClient();
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = ref({
  email: undefined,
  password: undefined,
});
async function submit(event: FormSubmitEvent<Schema>) {
  pending.value = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password,
    });

    if (error) throw error;

    return navigateTo("/");
  } catch (error) {
    if (typeof error === "string") {
      toast.add({ title: "Error!", description: error });
    }
  } finally {
    toast.add({ title: "Successful!", description: "Check your email" });
    pending.value = false;
  }
}
</script>

<template>
  <main class="w-screen h-screen flex items-center justify-center">
    <UCard class="w-1/4 h-auto">
      <UForm
        :schema="schema"
        :state="state"
        @submit="submit"
        class="space-y-3 items-center justify-center"
      >
        <UFormGroup label="Email" name="email" size="xl">
          <UInput
            v-model="state.email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>
        <UFormGroup class="pb-10" label="Password" name="password" size="xl">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div class="flex justify-center">
          <UButton
            size="xl"
            block
            color="primary"
            :loading="pending"
            type="submit"
            class="w-1/2"
            >Sign in</UButton
          >
        </div>
      </UForm>

      <UCard class="flex items-center justify-center">
        <p>Dont' have an account ?</p>
        <NuxtLink
          to="/register"
          class="text-blue-50 flex items-center justify-center"
          ><u>Register</u></NuxtLink
        >
      </UCard>
    </UCard>
  </main>
</template>

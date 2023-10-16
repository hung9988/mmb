<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const toast = useToast();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
  passwordConfirm: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const pending = ref(false);

const state = ref({
  email: "",
  password: "",
  passwordConfirm: "",
});

const supabase = useSupabaseClient();

async function submit(event: FormSubmitEvent<Schema>) {
  pending.value = true;
  try {
    const { error } = await supabase.auth.signUp({
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
    toast.add({
      title: "Successful!",
      description: "You are signed up and logged in!",
    });
    pending.value = false;
  }
}
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <UCard class="w-1/4 h-auto">
      <UForm
        :schema="schema"
        :state="state"
        @submit="submit"
        class="space-y-3 items-center justify-center"
      >
        <UFormGroup label="Email" name="email" size="xl">
          <UInput v-model="state.email" placeholder="you@example.com" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" size="xl">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Confirm password" name="passwordConfirm" size="xl">
          <UInput v-model="state.passwordConfirm" type="password" />
        </UFormGroup>

        <UButton
          size="xl"
          block
          color="primary"
          :loading="pending"
          type="submit"
        >
          Sign up
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

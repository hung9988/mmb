<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();

const pending = ref(false);
const email = ref("");

async function signInWithOtp() {
  pending.value = true;

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: "http://localhost:3000/confirm",
      },
    });
    if (error) throw error;
  } catch (error: any) {
    toast.add({ title: "Error!", description: error });
  } finally {
    toast.add({ title: "Successful!", description: "Check your email" });
    pending.value = false;
  }
}
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center">
    <UCard class="max-w-sm">
      <form class="space-y-3" @submit.prevent="signInWithOtp">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UButton :loading="pending" block type="submit">Sign in</UButton>
      </form>
    </UCard>
  </main>
</template>

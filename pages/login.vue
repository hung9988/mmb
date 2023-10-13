<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();

const pending = ref(false);
const email = ref("");
const password = ref("");

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
  <UContainer class="flex w-screen h-20 bg-white items-center justify-center" >
    <NuxtLink class="pr-20" to="/confirm">UR</NuxtLink>
    <NuxtLink class="pr-20" to="/confirm">Mom</NuxtLink>
    <NuxtLink class="pr-20" to="/confirm">Gay</NuxtLink>
    
  </UContainer>
  <main class="w-full h-screen flex items-center justify-center bg-[#72807b]">
    <UCard class="w-3/4 h-1/2 flex items-center justify-center  border-black border-2 bg-[#ffffff]">
      <form class="space-y-3 w-96 pb-10" @submit.prevent="signInWithOtp">
        <UFormGroup block size="xl" label="Email" name="email">

          <UInput color="primary" variant="outline"
            v-model="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup class="pb-10" block size="xl" label="Password" name="passcode">

          <UInput color="primary" variant="outline"
            v-model="password"
          />
        </UFormGroup>

        <UButton size="xl" :loading="pending" block type="submit">Sign in</UButton>
      </form>

      <UCard class="flex justify-center border-2 border-[#000000]">
        <p>Don't have an account ?</p>
        <UButton to="/register" size="xl" block color="black" variant="solid">Sign up</UButton>
      </UCard>
    </UCard>
  </main>

  <UCard class="fixed bottom-auto" >

</UCard>
</template>
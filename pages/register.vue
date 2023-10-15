<script setup>
const toast = useToast();
const pending = ref(false);

const user = useSupabaseUser();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const supabase = useSupabaseClient();
const userRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match!';
    password.value = '';
    confirmPassword.value = '';
    setTimeout(() => {
      errorMsg.value = '';
    }, 3000);
    return;
  }
  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    if (error) throw error;
  } catch (error) {
    toast.add({ title: "Error!", description: error });
  } finally {
    toast.add({ title: "Successful!", description: "Check your email" });
    pending.value = false;
  }
};

watchEffect(() => {
  if (user.value) {
    return navigateTo('/');
  }
});
</script>

<template>
  <main class="w-screen h-screen flex items-center justify-center ">
    <UCard class=" w-1/4 h-auto">
      <form class="space-y-3 items-center justify-center pb-10" @submit.prevent="userRegister">
      
        <UFormGroup label="Email" name="email" size="xl">
          <UInput
            v-model="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>
        <UFormGroup class ="" label="Password" name="password" size="xl">
          <UInput
            v-model="password"
          />
        </UFormGroup>

        <UFormGroup class ="pb-10" label="Confirm password" name="re_enter" size="xl">
          <UInput
            v-model="confirmPassword"
          />
        </UFormGroup>

        <UButton size="xl" block color="primary" :loading="pending" type="submit">Sign up</UButton>
      </form>

      
    </UCard>
  </main>

  
</template>
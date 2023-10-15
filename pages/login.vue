<script setup>
const toast = useToast();
const pending = ref(false);

const user = useSupabaseUser();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const supabase = useSupabaseClient();
const userLogin = async () => {
  pending.value = true;
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
});
    email.value = '';
    password.value = '';
   
  if (error) throw error;
  } catch (error) {
    toast.add({ title: "Error!", description: error });
  } finally {
    toast.add({ title: "Successful!", description: "Check your email" });
    pending.value=false;
  
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
      <form class="space-y-3 items-center justify-center pb-10" @submit.prevent="userLogin">
      
        <UFormGroup label="Email" name="email" size="xl">
          <UInput
            v-model="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>
        <UFormGroup class ="pb-10" label="Password" name="password" size="xl">
          <UInput
            v-model="password"
          />
        </UFormGroup>

        <UButton size="xl" block color="primary" :loading="pending" type="submit">Sign in</UButton>
      </form>

      <UCard class="flex items-center justify-center">
        <p>Dont' have an account ?</p>
        <NuxtLink to="/register" class="text-blue-50 flex items-center justify-center"><u>Register</u></NuxtLink>
      </UCard>
    </UCard>
  </main>


</template>
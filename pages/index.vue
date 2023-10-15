<script setup>
const colorMode = useColorMode()
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const toggled = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})


const userLogout = async () => {
  await supabase.auth.signOut();
};
watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login');
  }
});
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  
<main class="w-screen h-screen flex items-center justify-center ">
  <UCard class="w-auto h-auto flex items-center justify-center ">
   <div class="pb-10"> hello, {{ user?.email }} </div>

  <UButton block @click="userLogout">Log out</UButton>

</UCard>
</main>
</template>
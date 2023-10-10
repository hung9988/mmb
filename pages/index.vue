<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

async function handleSignOut() {
  await supabase.auth.signOut();

  return navigateTo("/login");
}
</script>

<template>
  <UContainer class="text-center">
    <h1>hi, {{ user?.email }}</h1>

    <UButton @click="handleSignOut">Logout</UButton>
  </UContainer>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
() => {
if (user.value) {
      return navigateTo("/login");
    }
  }
async function handleSignOut() {
  await supabase.auth.signOut();

  return navigateTo("/login");
}
</script>

<template>
  <UContainer class="text-center">
    <h1>hi, {{ user?.value }}</h1>

    <UButton @click="handleSignOut">Logout</UButton>
  </UContainer>
</template>

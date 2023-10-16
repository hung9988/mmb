<script setup lang="ts">
const colorMode = useColorMode();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const links = [
  {
    label: "Home",
    to: "/",
  },
];

async function signOut() {
  await supabase.auth.signOut();
}
</script>

<template>
  <div class="flex flex-col h-full justify-between p-6">
    <UVerticalNavigation :links="links" />

    <div>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />

      <UButton v-if="user" @click="signOut" block>Sign out</UButton>
      <UButton v-else to="/login" block>Sign in</UButton>
    </div>
  </div>
</template>

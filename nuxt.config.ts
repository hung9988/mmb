// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/supabase","@nuxtjs/color-mode"],
  devtools: { enabled: true },
  supabase: {redirect: false},
});

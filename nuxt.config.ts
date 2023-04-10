// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui"],

  css: [
    "~/assets/css/main.css",
    "drawflow/dist/drawflow.min.css",
    "~/assets/css/style.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
});

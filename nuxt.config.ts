// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui"],
  app: {
    head: {
        // Font Family
        link: [
            {
                rel: 'stylesheet',
                href: 'https://rsms.me/inter/inter.css',
            },
        ],
    },
},
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
  build: {},
  // imports:{
  //   dirs:["components", "components/template" ]
  // }
});

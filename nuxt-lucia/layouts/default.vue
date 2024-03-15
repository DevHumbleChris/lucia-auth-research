<script setup lang="ts">
import { Toaster } from "vue-sonner";
useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { property: "og:title", content: `Nuxt Lucia Auth.` },
    {
      name: "description",
      content: "Nuxt Lucia Auth.",
    },
    {
      property: "og:description",
      content: "Nuxt Lucia Auth.",
    },
    { property: "og:url", content: "https://nuxt-lucia-auth.vercel.app/" },
    { name: "twitter:title", content: "Nuxt Lucia Auth." },
    {
      name: "twitter:description",
      content: "Nuxt Lucia Auth.",
    },
    { name: "twitter:site", content: "https://nuxt-lucia-auth.vercel.app/" },
    {
      property: "og:image:type",
      content: "image/png",
    },
  ],
  title: `Nuxt Lucia`,
});

defineOgImageComponent("Nuxt", {
  headline: "Lucia Auth 🛡️",
  title: "Nuxt Lucia Auth 🛡️",
  description: "Implementing Lucia Auth in Nuxt Apps",
});
</script>

<template>
  <main class="max-w-[90rem] mx-auto">
    <slot />
    <Toaster richColors closeButton />
  </main>
</template>

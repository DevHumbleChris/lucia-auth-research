<script lang="ts">
definePageMeta({
  middleware: ["protected"],
});

useHead({
  titleTemplate: "%s - Homepage",
});

const user = useAuthenticatedUser();
</script>

<template>
  <h1>Hello</h1>
</template>

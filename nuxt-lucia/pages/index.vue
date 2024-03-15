<script lang="ts">
definePageMeta({
  middleware: ["protected"],
});

const user = useAuthenticatedUser();
</script>

<template>
  <h1>Hello</h1>
</template>

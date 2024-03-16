export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const data = await useRequestFetch()("/api/user");
  if (!data) {
    return navigateTo("/");
  }
});

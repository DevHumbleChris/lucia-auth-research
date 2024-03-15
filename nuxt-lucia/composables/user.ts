const user = useUser();
export const useAuthenticatedUser = () => {
  return computed(() => {
    const userValue = unref(user);
    if (!userValue) {
      throw createError(
        "useAuthenticatedUser() can only be used in protected pages"
      );
    }
    return userValue;
  });
};

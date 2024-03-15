<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

useHead({
  titleTemplate: "%s - Homepage",
});

const user = useAuthenticatedUser();
</script>

<template>
  <!-- Connection Card -->
  <div
    class="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
  >
    <!-- Header -->
    <div class="p-3 md:pt-5 md:px-5 grid grid-cols-3 gap-x-2">
      <div>
        <span
          class="hidden md:inline-flex items-center gap-x-1.5 py-1.5 px-2.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200"
        >
          <span
            class="w-1.5 h-1.5 inline-block bg-gray-800 rounded-full dark:bg-neutral-200"
          ></span>
          Online
        </span>
      </div>

      <div
        class="flex-shrink-0 relative w-11 h-11 md:w-[62px] md:h-[62px] mx-auto"
      >
        <img
          class="flex-shrink-0 w-11 h-11 md:w-[62px] md:h-[62px] rounded-full"
          src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
          alt="Image Description"
        />
        <span
          class="absolute bottom-0 -end-0.5 block md:hidden w-3 h-3 rounded-full bg-teal-600 border-2 border-white dark:bg-teal-500 dark:border-neutral-700"
        ></span>
      </div>

      <div class="ms-auto">
        <!-- More Dropdown -->
        <div
          class="hs-dropdown relative inline-flex [--placement:bottom-right]"
        >
          <button
            id="hs-pro-dupc1"
            type="button"
            class="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
            aria-labelledby="hs-pro-dupc1"
          >
            <div class="p-1">
              <button
                type="button"
                class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </svg>
                Share connection
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  />
                  <path
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
                Hide connection
              </button>
            </div>
          </div>
          <!-- End Dropdown -->
        </div>
        <!-- End More Dropdown -->
      </div>
    </div>
    <!-- End Header -->

    <!-- Body -->
    <div class="p-3 pt-0 md:px-5 md:pb-5 text-center">
      <h3 class="md:text-lg font-medium text-gray-800 dark:text-neutral-200">
        Anna Richard
      </h3>

      <div class="inline-flex justify-center items-center gap-x-2">
        <svg
          class="flex-shrink-0 w-4 h-4 text-gray-500 dark:text-neutral-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
          <path d="M10 18h4" />
        </svg>
        <p class="text-sm text-gray-500 dark:text-neutral-500">Guideline</p>
      </div>
    </div>
    <!-- End Body -->

    <!-- Footer -->
    <div
      class="py-3 px-5 grid sm:flex sm:justify-between sm:items-center gap-y-1 sm:gap-y-0 gap-x-2 text-center sm:text-start border-t border-gray-200 dark:border-neutral-700"
    >
      <div>
        <p class="text-sm text-gray-500 dark:text-neutral-500">
          57 connections
        </p>
      </div>
      <div>
        <label
          for="hs-pro-dupccn1"
          class="relative py-2 px-3 w-full sm:w-auto block text-center sm:text-start rounded-lg cursor-pointer text-sm font-medium focus:outline-none"
        >
          <input
            type="checkbox"
            id="hs-pro-dupccn1"
            class="peer absolute top-0 start-0 w-full h-full bg-transparent border border-gray-200 text-transparent rounded-lg cursor-pointer focus:ring-white after:block after:w-full after:h-full after:rounded-md checked:after:bg-gray-200 checked:text-transparent checked:border-gray-200 checked:hover:border-gray-200 checked:focus:border-gray-200 checked:bg-none focus:bg-gray-100 checked:focus:after:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:checked:after:bg-neutral-600 dark:checked:border-neutral-700 dark:focus:ring-0 dark:focus:ring-offset-0 dark:focus:bg-neutral-700 dark:checked:focus:after:bg-neutral-700"
            checked
          />
          <span
            class="relative z-10 peer-checked:hidden text-gray-800 dark:text-white"
          >
            Connect
          </span>
          <span
            class="relative z-10 justify-center items-center gap-x-1.5 hidden peer-checked:flex peer-checked:text-gray-800 text-gray-200 dark:text-white dark:peer-checked:text-white"
          >
            <svg
              class="flex-shrink-0 w-3.5 h-3.5 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Connected
          </span>
        </label>
      </div>
    </div>
    <!-- End Footer -->
  </div>
  <!-- End Connection Card -->
</template>

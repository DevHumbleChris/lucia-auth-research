<script lang="ts" setup>
import { toast } from "vue3-toastify";

useHead({
  titleTemplate: "%s - Signup",
});

const user = useUser();

const email = useState("newEmail", () => "");
const password = useState("newPassword", () => "");
const isCreatingAccount = useState("isCreatingAccount", () => false);

watch(
  user,
  () => {
    if (user.value) {
      navigateTo("/");
    }
  },
  {
    immediate: true,
  }
);

const handleUserSignup = async () => {
  isCreatingAccount.value = true;
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    isCreatingAccount.value = false;
    email.value = "";
    password.value = "";
    await navigateTo("/");
  } catch (err: any) {
    isCreatingAccount.value = false;
    const errorMessage = err.data?.message ?? null;
    toast.error(errorMessage, {
      theme: "colored",
    });
  }
};
</script>

<template>
  <section class="py-12">
    <div class="mx-auto max-w-7xl">
      <div
        class="max-w-sm mx-auto bg-white border p-5 rounded-xl shadow drop-shadow-md"
      >
        <div class="text-center">
          <svg
            class="w-auto h-20 mx-auto"
            viewBox="0 0 1985 1038"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1149.67 395.986C1305.68 260.813 1721.95 647.12 1519.35 822.653C1491.59 846.72 1461.55 858.64 1430.8 861.066C1364.01 769.52 1269.27 699.706 1159.08 664.186C1102.51 563.906 1085.32 451.733 1149.67 395.986Z"
              fill="#0D100D"
            />
            <path
              d="M835.667 395.986C679.653 260.813 263.387 647.12 465.987 822.653C493.747 846.72 523.773 858.64 554.533 861.066C621.307 769.52 716.08 699.706 826.254 664.186C882.827 563.92 900.013 451.733 835.667 395.986Z"
              fill="#100F0D"
            />
            <path
              d="M316.08 0.586299C141.8 0.586299 0.506836 141.866 0.506836 316.159C0.506836 447.386 80.6402 559.893 194.627 607.479C211.294 577.746 229.974 549.053 250.56 521.6C185.814 485.92 143.12 415.906 146.12 337C150.36 225.586 244.12 138.693 355.547 142.933C441.08 146.173 512.12 202.2 538.613 278.453C565.613 264.213 593.507 251.199 622.24 239.493C587.987 102.266 463.92 0.586299 316.08 0.586299Z"
              fill="#100F0D"
            />
            <path
              d="M353.16 196.587C271.867 193.493 203.467 256.88 200.373 338.173C198.04 399.493 233.546 453.467 286.013 477.613C343.373 411.333 412.24 353.36 489.973 306.04C473.84 245.067 419.453 199.107 353.16 196.587Z"
              fill="#100F0D"
            />
            <path
              d="M1299.47 452.293C1344.97 452.293 1381.85 489.173 1381.85 534.68C1381.85 580.186 1344.97 617.066 1299.47 617.066C1253.96 617.066 1217.08 580.186 1217.08 534.68C1217.08 489.173 1253.96 452.293 1299.47 452.293Z"
              fill="white"
            />
            <path
              d="M1253.25 480.413C1298.76 480.413 1335.64 517.293 1335.64 562.8C1335.64 608.306 1298.76 645.187 1253.25 645.187C1207.75 645.187 1170.87 608.306 1170.87 562.8C1170.87 517.293 1207.75 480.413 1253.25 480.413Z"
              fill="#100F0D"
            />
            <path
              d="M1669.25 0.586299C1843.53 0.586299 1984.83 141.866 1984.83 316.159C1984.83 447.386 1904.69 559.893 1790.71 607.479C1774.04 577.746 1755.36 549.053 1734.77 521.6C1799.52 485.92 1842.21 415.906 1839.21 337C1834.97 225.586 1741.21 138.693 1629.79 142.933C1544.25 146.173 1473.21 202.2 1446.72 278.453C1419.72 264.213 1391.83 251.199 1363.09 239.493C1397.35 102.266 1521.41 0.586299 1669.25 0.586299Z"
              fill="#100F0D"
            />
            <path
              d="M1632.17 196.587C1713.47 193.493 1781.87 256.88 1784.96 338.173C1787.29 399.493 1751.79 453.466 1699.32 477.626C1641.96 411.346 1573.09 353.36 1495.36 306.04C1511.49 245.067 1565.88 199.107 1632.17 196.587Z"
              fill="#100F0D"
            />
            <path
              d="M685.867 452.293C731.374 452.293 768.254 489.173 768.254 534.68C768.254 580.186 731.374 617.066 685.867 617.066C640.361 617.066 603.48 580.186 603.48 534.68C603.48 489.173 640.361 452.293 685.867 452.293Z"
              fill="white"
            />
            <path
              d="M732.08 480.413C777.587 480.413 814.467 517.293 814.467 562.8C814.467 608.306 777.587 645.187 732.08 645.187C686.573 645.187 649.693 608.306 649.693 562.8C649.693 517.293 686.573 480.413 732.08 480.413Z"
              fill="#100F0D"
            />
            <path
              d="M992.667 785.693C1071.81 785.693 1135.97 818.747 1135.97 859.52C1135.97 895.453 1086.13 925.387 1020.13 931.987C1031.33 958.12 1079.2 1046.17 1189.56 980.013C1151.15 1047.87 1043.01 1054.55 992.667 1003.71C942.32 1054.55 834.187 1047.87 795.773 980.013C906.133 1046.17 954 958.12 965.2 931.987C899.2 925.387 849.36 895.453 849.36 859.52C849.36 818.747 913.52 785.693 992.667 785.693Z"
              fill="#100F0D"
            />
          </svg>
          <h1 class="mt-2 text-2xl font-bold text-gray-900">
            Create a Montana Inc Account.
          </h1>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-2">
          <a
            href="/sigin/github"
            class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Icon name="octicon:mark-github-16" class="w-5 h-5 mr-2 shrink-0" />
            Github
          </a>
          <a
            href="/sigin/google"
            class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Icon name="logos:google-icon" class="w-5 h-5 mr-2 shrink-0" />
            Google
          </a>
          <a
            href="/sigin/facebook"
            class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Icon name="devicon:facebook" class="w-5 h-5 mr-2 shrink-0" />
            Facebook
          </a>
        </div>

        <div class="relative mt-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>

          <div class="relative flex justify-center">
            <span class="px-2 text-sm text-gray-400 bg-white"> or </span>
          </div>
        </div>

        <form @submit.prevent="handleUserSignup" class="mt-2">
          <div class="space-y-3">
            <div>
              <label for="email" class="text-sm font-bold text-gray-900">
                Email
              </label>
              <div class="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email address"
                  v-model="email"
                  class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  required
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-bold text-gray-900">
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password (min. 6 character)"
                  v-model="password"
                  class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="inline-flex items-center gap-2 justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
              >
                <span
                  v-if="isCreatingAccount"
                  class="w-4 h-4 border-2 rounded-full border-dashed animate-spin border-white"
                ></span>
                {{ isCreatingAccount ? "Creating..." : "Create Account" }}
              </button>
            </div>
          </div>
        </form>

        <div class="mt-4 text-center">
          <p class="text-sm font-medium text-gray-900">
            Already have an account?
            <NuxtLink to="/signin" title="" class="font-bold hover:underline">
              Sign in now
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

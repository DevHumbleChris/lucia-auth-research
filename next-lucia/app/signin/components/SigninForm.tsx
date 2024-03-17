"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SigninForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUserSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      setIsLoggingIn(false);
      return toast.error(res.statusText, {
        position: 'top-right'
      })
    }

    setIsLoggingIn(false);
    return redirect("/");
  };
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-sm mx-auto bg-white border p-5 rounded-xl shadow drop-shadow-md">
          <div className="text-center">
            <svg
              className="w-auto h-20 mx-auto"
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
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              Login to Montana Inc.
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/signin/github"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 shrink-0"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27c-.68 0-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c-.15-.24-.6-.83-1.23-.82c-.67.01-.27.38.01.53c.34.19.73.9.82 1.13c.16.45.68 1.31 2.69.94c0 .67.01 1.3.01 1.49c0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"
                ></path>
              </svg>
              With Github
            </Link>
            <Link
              href="/signin/google"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 shrink-0"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              With Google
            </Link>
          </div>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-gray-400 bg-white"> or </span>
            </div>
          </div>
          <form onSubmit={(e) => handleUserSignin(e)} className="mt-2">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password (min. 6 character)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                >
                  {isLoggingIn && (
                    <span className="w-4 h-4 border-2 rounded-full border-dashed animate-spin border-white" />
                  )}
                  {isLoggingIn ? "Authenticating..." : "Sign in"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-gray-900">
              Don&rsquo;t have an account?
              <Link href="/signup" className="font-bold hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

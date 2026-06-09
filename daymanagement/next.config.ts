import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const pwa = withPWA({
  dest: "public",
  register: true,
  // Add these options to ensure more routes are cached
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst", // Tries network, falls back to cache
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  disable: process.env.NODE_ENV === "development",
});

// const withPWA = require("@ducanh2912/next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   // Add these options to ensure more routes are cached
//   workboxOptions: {
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,
//         handler: "NetworkFirst", // Tries network, falls back to cache
//         options: {
//           cacheName: "offlineCache",
//           expiration: {
//             maxEntries: 200,
//           },
//         },
//       },
//     ],
//   },
//   disable: process.env.NODE_ENV === "development",
// });

export default pwa(nextConfig);

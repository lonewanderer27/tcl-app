import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isWeb = mode === "web";

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        components: path.resolve(__dirname, "./src/components"),
        pages: path.resolve(__dirname, "./src/pages"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        atoms: path.resolve(__dirname, "./src/atoms"),
      },
    },
    plugins: [
      react(),
      legacy(),
      VitePWA({
        registerType: null, // Disable service worker registration
        includeAssets: ["favicon.ico", "favicon.png", "apple-touch-icon.png"],
        manifest: {
          name: "The Coffee Lounge",
          short_name: "TCL",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/pwa-maskable-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "/pwa-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
          start_url: "/",
          display: "standalone",
          background_color: "#e2e8f0",
          theme_color: "#50814c",
          description:
            "The Coffee Lounge is an E-commerce coffee app built with Ionic React. It features a unique 3D View that allows our customers to virtually visit the cafe, using only their mobile phone.",
        },
        workbox: {
          runtimeCaching: isWeb
            ? [
                // Match video files
                {
                  urlPattern: /\.(?:mp4|webm)$/, // Match video files by extension
                  handler: "CacheFirst",
                  options: {
                    cacheName: "video-cache",
                    expiration: {
                      maxEntries: 10, // Limit to 10 videos
                    },
                  },
                },
                // Other Static Assets
                {
                  urlPattern:
                    /\.(?:js|css|html|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|eot|ico)$/,
                  handler: "StaleWhileRevalidate",
                  options: {
                    cacheName: "static-assets-cache",
                    expiration: {
                      maxEntries: 200,
                      maxAgeSeconds: 60 * 60 * 24 * 30,
                    },
                  },
                },
              ]
            : undefined, // Disable cache for native apps
        },
      }),
    ],
    esbuild: {
      pure:
        mode === "production"
          ? ["console.log", "console.info", "console.error"]
          : [],
    },
    assetsInclude: ["**/*.lottie"],
  };
});

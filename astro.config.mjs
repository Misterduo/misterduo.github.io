export default defineConfig({
  site: "https://moshkingcode.github.io",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/webdevblog/",
});

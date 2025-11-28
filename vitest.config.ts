/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/vitest.setup.ts',

    // fail the pipeline if tests log errors
    onConsoleError: "fail",

    // isolate tests for stability
    isolate: true,

    // useful for CI: keep output minimal
    reporters: ["default"],

    // Coverage configuration (CI-friendly)
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov", "json"],
      reportsDirectory: "./coverage",
      all: true,
      exclude: ["**/node_modules/**", "**/dist/**"],
  },
    retry: 2,
}
})
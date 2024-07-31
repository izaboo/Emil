import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    testIdAttribute: 'data-automation-id',
    baseURL: `https://democentral.learnquicksight.online`,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'DemoCentral for Emil',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});

import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.steps.ts"],
  setupFilesAfterEnv: ["./jest-setup.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports",
        filename: "report.html",
        openReport: false,
        expand: true,
        enableMergeData: true,
        pageTitle: `Automation API Execution test at ${new Date().toUTCString()}`,
      },
    ],
  ],
  testTimeout: 60000,
};

export default config;

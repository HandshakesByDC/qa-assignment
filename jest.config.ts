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
        pageTitle: `Long test ${new Date()}`,
      },
    ],
  ],
  testTimeout: 60000,
};

export default config;

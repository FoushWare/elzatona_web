import type { StorybookConfig } from "@storybook/react-vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        nxViteTsPaths({
          root: path.resolve(__dirname, "../.."),
        }),
      ],
      resolve: {
        alias: {
          "@elzatona/contexts": path.resolve(
            __dirname,
            "../../shared-contexts/src/index.ts",
          ),
          "@elzatona/hooks": path.resolve(
            __dirname,
            "../../shared-hooks/src/index.ts",
          ),
          "@elzatona/shared-atoms": path.resolve(
            __dirname,
            "../../shared-atoms/src/index.ts",
          ),
          "@elzatona/types": path.resolve(
            __dirname,
            "../../shared-types/src/index.ts",
          ),
        },
      },
    });
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;

import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../pageStories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    // {
    //   name: "@storybook/addon-storysource",
    //   options: {
    //     loaderOptions: {
    //       injectStoryParameters: false,
    //     },
    //   },
    // },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;

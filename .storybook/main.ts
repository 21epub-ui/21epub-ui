import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: ['../packages/*/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-swc',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: (config) => {
    const mainFields = config.resolve?.mainFields ?? []

    return {
      ...config,
      resolve: {
        ...config.resolve,
        mainFields: ['source', ...mainFields],
      },
    }
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config

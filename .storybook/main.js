module.exports = {
  core: {
    builder: {
      name: 'webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
    disableTelemetry: true,
  },
  stories: ['../packages/*/stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-swc',
  ],
  framework: '@storybook/react',
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        mainFields: ['source', ...config.resolve.mainFields],
      },
    }
  },
}

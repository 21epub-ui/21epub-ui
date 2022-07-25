module.exports = {
  stories: ['../packages/**/stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  babel: (options) => ({
    ...options,
    presets: options.presets.map((option) => {
      if (option[0].includes('@babel/preset-react')) {
        return [
          '@babel/preset-react',
          {
            runtime: 'automatic',
            importSource: '@emotion/react',
          },
        ]
      }

      return option
    }),
  }),
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
        ],
      },
    }
  },
}

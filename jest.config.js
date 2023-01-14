module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!troublesome-dependency/.*)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*[Mm]ock*.{js,jsx,ts,tsx}',
    '!src/commons/*.ts',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>/src', 'node_modules'],
};


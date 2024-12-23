/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: 'jsdom'
    ,
    transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
      },
    }
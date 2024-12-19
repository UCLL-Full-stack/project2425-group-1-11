module.exports = {
    testEnvironment: 'jsdom'
    ,
    transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
      },
    }
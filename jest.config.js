module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', 
  },
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  rootDir: '.', 
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}", 
    "!src/**/*.test.ts",
    "!src/test/mocks/**"
  ],
  coverageDirectory: "./coverage", 
  testMatch: [
    "**/src/test/**/*.test.ts",
  ],
  coverageReporters: ["text", "lcov"],
};

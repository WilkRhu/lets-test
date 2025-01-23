module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  rootDir: 'src', 
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",        
    "!src/**/*.test.js",  
    "!src/**/*spec.js" 
  ],
  coverageDirectory: "../coverage",
};

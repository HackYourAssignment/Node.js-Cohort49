// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)/',
  ],
};

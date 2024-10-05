module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!node-fetch)'],
  testEnvironment: 'node',
};

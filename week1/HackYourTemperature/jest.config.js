export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!fetch-blob|node-fetch)"
  ]
};

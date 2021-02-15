module.exports = {
  setupFilesAfterEnv: ["./jest.setup.redis-mock.js"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
};

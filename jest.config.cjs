module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"], // Bu satırı ekleyin
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
};

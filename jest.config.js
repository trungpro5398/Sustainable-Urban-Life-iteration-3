module.exports = {
  roots: ["<rootDir>/src"], // This is where your test files are.
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Allow jest to understand JSX
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Setup files after environment setups
  testMatch: [
    "**/__tests__/**/?(*.)+(spec|test).js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
  ], // Specifies where Jest looks for test files
  moduleFileExtensions: ["js", "jsx"], // File extensions Jest will handle
};

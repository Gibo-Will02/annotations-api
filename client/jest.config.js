//configures the jest tester to actually run tests
const config = {
    verbose: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
        "^.+\\.svg$": "<rootDir>/svgTransform.js",
      },
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/setupJest.js'] ,
    setupFiles: ["dotenv/config"],
    testURL: 'http://localhost:3000/', 
  };
  
  module.exports = config;
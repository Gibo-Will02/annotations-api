const config = {
    verbose: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
      },
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/setupJest.js'] ,
    setupFiles: ["dotenv/config"],
    testURL: 'http://localhost:3000/', 
  };
  
  module.exports = config;
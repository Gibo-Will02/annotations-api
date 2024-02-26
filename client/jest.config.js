//configures the jest tester to actually run tests
const config = {
    verbose: true,
    //allows jest to convert .jsx files and .svg into a jest readable format
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
        "^.+\\.svg$": "<rootDir>/svgTransform.js",
      },
    //maps certain components so that jest recognizes them and converts them properly
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    testEnvironment: "jsdom",
    //nessary to further set up to enable certain mock functionality
    setupFilesAfterEnv: ['<rootDir>/setupJest.js'] ,
    setupFiles: ["dotenv/config"],
    testURL: 'http://localhost:3000/', 
  };
  
  module.exports = config;
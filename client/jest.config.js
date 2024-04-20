//This File is only used for Jest testing
//DO NOT DELETE
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
    //the designated test environment
    testEnvironment: "jsdom",
    //nessary to further set up to enable certain mock functionality
    setupFilesAfterEnv: ['<rootDir>/setupJest.js'] ,
    //ensures that tests utilize environment configs for testing in environment uses files in node_modules folder not in client
    setupFiles: ["dotenv/config"],
    //the basic test url for simulated testing.
    testURL: 'http://localhost:3000/', 
  };
  
  module.exports = config;
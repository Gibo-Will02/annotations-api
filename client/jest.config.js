const config = {
    verbose: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
      },
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs"
    },
  };
  
  module.exports = config;
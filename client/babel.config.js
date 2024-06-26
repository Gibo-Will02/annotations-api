//This File is only used for jest testing
//DO NOT DELETE
//configures babel which is software that translates different files for jest
module.exports = {
  //used babel presets
  "presets": ['@babel/preset-react', '@babel/preset-env'],
  //extra plugins needed to run certain tests
  "plugins": ['@babel/plugin-syntax-jsx', ['@babel/plugin-transform-react-jsx-development', 
  {
    "throwIfNamespace": false, // defaults to true
    "runtime": "automatic", // defaults to classic
    "importSource": "react" // defaults to react
  }]
]
}
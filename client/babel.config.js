module.exports = {
  "presets": ['@babel/preset-react', '@babel/preset-env'],
  "plugins": ['@babel/plugin-syntax-jsx', ['@babel/plugin-transform-react-jsx-development', 
  {
    "throwIfNamespace": false, // defaults to true
    "runtime": "automatic", // defaults to classic
    "importSource": "react" // defaults to react
  }]
]
}
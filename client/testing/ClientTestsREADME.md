type on command line | 
                     V
cd client
npm install

Installed Dependencies | run only if you have encountered any errors.
                       V
npm install --save-dev jest
npm install --save-dev babel-jest
npm install --save-dev jest-fetch-mock
npm install --save-dev react-test-renderer
npm install --save-dev @babel/preset-react
npm install --save-dev @babel/plugin-transform-react-jsx-development
npm install --save-dev @babel/plugin-syntax-jsx
npm install --save-dev jsdom
npm install --save-dev react-bootstrap

run tests with
$ npm test -- -u
as that reloads the snapshots
and 
$ npm test
for general testing

if you have any other questions about the client side or how the API works
Contact me at nsternecker@gmail.com
if you have any questions
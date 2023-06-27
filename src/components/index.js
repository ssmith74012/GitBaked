export { default as App } from './App';

module.exports = {
    ...require('./App'),
    ...require('./client'), // adds key/values from users.js
   ...require('./Orders'), // adds key/values from users.js
   ...require('./Cart'), // adds key/values from activites.js
   ...require('./Products'), // etc
   ...require('./Users') }
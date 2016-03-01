var Sequelize = require('sequelize');
var keys = require('../keys');

module.exports = new Sequelize('beerandchip', 'root', keys.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
   timestamps: false
  }
});


// module.exports = new Sequelize('heroku_50c8789c054e9e5', 'b8a52638ac3cd9', 'b95b5984', {
//   host: 'us-cdbr-iron-east-03.cleardb.net',
//   dialect: 'mysql',
//   define: {
//     timestamps: false
//   }
// });
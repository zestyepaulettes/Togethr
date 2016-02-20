var Sequelize = require('sequelize');

module.exports = new Sequelize('BeerAndChip', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
  	timestamps: false
  }
});
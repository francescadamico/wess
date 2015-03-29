'use strict';

// Development specific configuration
// ==================================
module.exports = {
  sequelize: {  
    options: {
      dialect: "postgres",
      port: process.env.PGPORT
    }
  },

  seedDB: true
};

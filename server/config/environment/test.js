'use strict';

// Test specific configuration
// ===========================
module.exports = {
  sequelize: {
    options: {
      dialect: "postgres",
      port: process.env.PGPORT
    }
  },

  seedDB: true
};

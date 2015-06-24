'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

/*module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "wess-secret",
  PGHOST: '134.2.49.179',
  PGPORT: '5432',
  PGDATABASE: 'WESS_Daten',
  PGUSER: 'uweller',
  PGPASSWORD: 'eiv4Eizegeiy',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};*/

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "wess-secret",
  PGHOST: '134.2.48.64',
  PGPORT: '',
  PGDATABASE: 'ammertal',
  PGUSER: 'amnet_admin',
  PGPASSWORD: 'eB3koono',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};


/*********** LOCAL DB *************/
 /* module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "wess-secret",
  PGHOST: '',
  PGPORT: '5432',
  PGDATABASE: 'ammertal_dev',
  PGUSER: 'amnet_admin',
  PGPASSWORD: 'Ammertal',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
/*********** SERVER DB amnet_web user *************/
/*module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "wess-secret",
  PGHOST: '134.2.48.64',
  PGPORT: '',
  PGDATABASE: 'ammertal',
  PGUSER: 'amnet_web',
  PGPASSWORD: 'XQ4=drjc',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
  };*/
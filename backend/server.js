const path = require('path');
require('dotenv').config({ path: path.join('config.env') });

const mongoose = require('mongoose');

const app = require('./app');
const database = require('./db');

// connect to database
mongoose
  .connect(database.url, { ...database.options })
  .then((con) => {
    console.log('  🔆🔆🔆    DATABASE CONNECTED SUCCESSFULLY  🔆🔆🔆    ');
  })
  .catch((err) => {
    console.log('   ⛔⛔⛔   DATABASE CONNECT FAILED!!!   ⛔⛔⛔');
    console.log(err);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`  🔆🔆🔆    Server runs on port: ${port}   🔆🔆🔆`);
  console.log(`   🛃🛃🛃   RUNNING ON MODE: ${process.env.NODE_ENV}    🛃🛃🛃`);
});

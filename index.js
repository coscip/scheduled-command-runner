const fs = require('fs');
const path = require('path');
const { runScheduler } = require('./scheduler');

(async () => {
  await runScheduler('/tmp/commands.txt');
})();

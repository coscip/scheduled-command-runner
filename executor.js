const { exec } = require('child_process');

function execCommand(command) {
  return new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
      if (err || stderr) {
        resolve(`ERROR: ${err?.message || stderr}`);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

module.exports = { execCommand };

const fs = require('fs');
const { execCommand } = require('./executor');
const { isTimeMatch, getRecurringInterval } = require('./utils');

const executedFile = 'executed.json';
let executedCommands = {};

if (fs.existsSync(executedFile)) {
  executedCommands = JSON.parse(fs.readFileSync(executedFile));
}

function saveExecuted() {
  fs.writeFileSync(executedFile, JSON.stringify(executedCommands, null, 2));
}

async function runScheduler(commandFilePath) {
  const lines = fs.readFileSync(commandFilePath, 'utf-8').trim().split('\n');
  const now = new Date();
  const log = [];

  for (const line of lines) {
    const parts = line.trim().split(' ');

    if (parts[0].startsWith('*/')) {
      const interval = getRecurringInterval(parts[0]);
      if (interval && now.getMinutes() % interval === 0) {
        const command = parts.slice(1).join(' ');
        const output = await execCommand(command);
        log.push(`[RECURRING ${parts[0]}] ${output}`);
      }
    } else {
      const [min, hr, day, month, year, ...cmdParts] = parts;
      const key = line.trim();

      if (!executedCommands[key] && isTimeMatch(now, min, hr, day, month, year)) {
        const command = cmdParts.join(' ');
        const output = await execCommand(command);
        executedCommands[key] = true;
        log.push(`[ONCE ${min} ${hr} ${day} ${month} ${year}] ${output}`);
      }
    }
  }

  saveExecuted();
  fs.appendFileSync('sample-output.txt', log.join('\n') + '\n');
}

module.exports = { runScheduler };

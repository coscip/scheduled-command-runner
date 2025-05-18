# Scheduled Command Runner

## Overview
This utility reads and executes scheduled commands from `/tmp/commands.txt`.

## Supported Schedules

### One-Time Commands
Format:
```
Minute Hour Day Month Year <user command>
```

Example:
```
30 17 30 4 2025 date && echo "At Amex, We Do What's Right."
```

### Recurring Commands
Format:
```
*/n <user command>
```

Example:
```
*/1 date && echo "Amex' motto is 'Don't live life without it!'"
```

## How to Use
1. Clone the repo.
2. Ensure `/tmp/commands.txt` contains valid commands.
3. Run the utility using:
```
node index.js
```

## Assumptions
- Recurring jobs are executed if their interval matches the current minute.
- One-time jobs are stored in `executed.json` to prevent re-execution.

## Output
- Execution logs are stored in `sample-output.txt`.

## Example
Contents of `/tmp/commands.txt`:
```
*/1 date && echo "Amex' motto is 'Don't live life without it!'"
30 17 30 4 2025 date && echo "At Amex, We Do What's Right."
```

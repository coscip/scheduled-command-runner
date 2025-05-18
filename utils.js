function getRecurringInterval(token) {
  const match = token.match(/\*\/(\d+)/);
  if (match) return parseInt(match[1]);
  return null;
}

function isTimeMatch(now, min, hr, day, month, year) {
  return (
    now.getMinutes() === parseInt(min) &&
    now.getHours() === parseInt(hr) &&
    now.getDate() === parseInt(day) &&
    now.getMonth() + 1 === parseInt(month) &&
    now.getFullYear() === parseInt(year)
  );
}

module.exports = { getRecurringInterval, isTimeMatch };

function billFor(month, activeSubscription, users) {  
  let totalMonthlyBill = 0;

  if (activeSubscription === 'undefined' && activeSubscription === null) {
    throw new Error('No active subscription');
  }
  
  if (users === 'undefined' && users === null) {
    throw new Error('No users');
  }
  
  if (Object.keys(users).length == 0) {
    return Number(totalMonthlyBill.toFixed(2));
  }

  const MONTH = new Date(month+' (UTC)');
  const dailyRate = getDailyRate(activeSubscription.monthlyPriceInDollars, MONTH);
  let day = firstDayOfMonth(MONTH);
  let lastDay = lastDayOfMonth(MONTH).getTime();
  
  for(day; day.getTime() <= lastDay; day = nextDay(day)) {
    let activeUsers = getActiveUsers(users, day);
    totalMonthlyBill += dailyRate * activeUsers;
  }
  
  return Number(totalMonthlyBill.toFixed(2));
}

/*******************
* Helper functions *
*******************/

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 1)

  Input type: Date
  Output type: Date
**/
function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 28)

  Input type: Date
  Output type: Date
**/
function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2019, 2, 7))  // => new Date(2019, 2, 8)
  nextDay(new Date(2019, 2, 28)) // => new Date(2019, 3, 1)

  Input type: Date
  Output type: Date
**/
function nextDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}

//  Functions
/**
 * @param  { number } rate
 * @param  { date } month
 */
function getDailyRate(rate, month) {
  let daysInMonth = lastDayOfMonth(month).getDate();
  return rate / daysInMonth;
}
/**
 * @param  { object } users
 * @param  { date } day
 */
function getActiveUsers(users, day) {
  let activeUsers = 0;

  if (Object.keys(users).length == 0) {
    return activeUsers;
  }

  users.forEach(user => {
    if (user.activatedOn.getTime() <= day.getTime() && 
      (user.deactivatedOn === null || user.deactivatedOn.getTime() >= day.getTime())) {
      activeUsers++;
    }
  });

  return activeUsers;
}

module.exports = {
  billFor,
  getActiveUsers
};
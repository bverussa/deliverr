const { TestWatcher } = require('jest');
const { billFor, getActiveUsers } = require('../src/app');

const userSignedUp = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2018-11-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2018-12-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 3,
    name: 'Employee #3',
    activatedOn: new Date('2019-01-10'),
    deactivatedOn: null,
    customerId: 1,
  },
];

const constantUsers = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2018-11-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2018-12-04'),
    deactivatedOn: null,
    customerId: 1,
  },
];

const newPlan = {
  id: 1,
  customerId: 1,
  monthlyPriceInDollars: 4,
};

const noUsers = [];

describe('billFor', () => {
  test('works when has no active users in a given day', () => {
    expect(getActiveUsers(noUsers, new Date('2019-01-01'))).toBe(0);
  });

  test('works when has active users in a given day', () => {
    expect(getActiveUsers(userSignedUp, new Date('2019-01-09'))).toBe(2);
  });
  
  test('works when the customer has no active users during the month', () => {
    expect(billFor('2019-01', newPlan, noUsers)).toBeCloseTo(0.00);
  });

  test('works when everything stays the same for a month', () => {
    expect(billFor('2019-01', newPlan, constantUsers)).toBeCloseTo(8.00);
  });

  test('works when a user is activated during the month', () => {
    expect(billFor('2019-01', newPlan, userSignedUp)).toBeCloseTo(10.84);
  });
});
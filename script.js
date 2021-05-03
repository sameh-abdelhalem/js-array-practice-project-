'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcAndDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, interests) => {
      if (interests >= 1) {
        return acc + interests;
      } else {
        return acc;
      }
    }, 0);
  labelSumInterest.textContent = `${interest} €`;
};
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(user => user[0])
      .join('')
      .toLowerCase();
  });
};
createUsernames(accounts);

// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // display movements
    containerApp.style.opacity = 100;
    displayMovements(currentAccount.movements);
    // display balance
    calcAndDisplayBalance(currentAccount.movements);
    // display summary
    calcDisplaySummary(currentAccount);

    console.log('loggedIn');
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['f', 'g', 'h', 'i', 'j'];

// console.log(arr.slice(2));
// console.log(arr.slice());

// SPLICE Mutates array

// REVERSE Mutates the array

// CONCAT
const letters = arr.concat(arr2);

// console.log(letters);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement < 0) {
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   } else {
//     console.log(`you deposited ${Math.abs(movement)}`);
//   }
// }

// movements.forEach((movement, i) => {
//   movement < 0
//     ? console.log(`movement ${i + 1} you withdrew ${Math.abs(movement)}`)
//     : console.log(`movement ${i + 1} you deposited ${Math.abs(movement)}`);
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const currenciesUnique = new Set(['USD', 'GBP', 'EUR']);
// currenciesUnique.forEach((value, _, map) => {
//   console.log(`${vaue} : ${value}`);
// });
// console.log(currenciesUnique);

/* coding challenge 1:  Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉*/
const juliaSurvey = [3, 5, 2, 12, 7];
const kateSurvey = [4, 1, 15, 8, 3];

const checkDogs = function (juliaDogs, kateDogs) {
  const juliaFixedogs = juliaSurvey.slice(1, 3);
  const allDogs = [...juliaFixedogs, ...kateDogs];

  allDogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`dog number ${i + 1} is an adult and is ${dog}`);
    } else if (dog < 3 && dog > 0) {
      console.log(`dog number ${i + 1} is a puppy and is ${dog}`);
    } else {
      console.log('wrong dog age!');
    }
  });
};

// checkDogs(juliaSurvey, kateSurvey);
// checkDogs(kateSurvey);

const eurToUsd = 1.1;
const usdMovements = movements.map(mov => Math.trunc(mov * eurToUsd));

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `movement ${i + 1} you ${mov < 0 ? 'withdrew' : 'deposited'} ${Math.abs(
      mov
    )}`
);
const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// reduce method
const globalBalance = movements.reduce((acc, curr, i, arr) => acc + curr, 0);

// console.log(globalBalance);

// Maximum Value

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

// console.log(max);

/* Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4] */

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => {
//     if (age <= 2) {
//       return 2 * age;
//     } else if (age > 2) {
//       return 16 + age * 4;
//     }
//   });
//   const adultDogs = humanAges.filter(age => age >= 18);

//   const avgAdultsAge =
//     adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;

//   console.log(`The dogs human ages are ${humanAges}`);
//   console.log(`The adult dogs ages are ${adultDogs}`);
//   console.log(`The average age of the adult dogs is ${avgAdultsAge}`);
//   return avgAdultsAge;
// };
const calcAvgHumanAge = dogAgesArr =>
  dogAgesArr
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const depositsUsdSum = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov, i, arr) => acc + mov, 0);

const firstWithdrawal = movements.find(mov => {
  return mov < 0;
});

// console.log(firstWithdrawal);

const account = accounts.find(account => account.owner === 'Jessica Davis');

// console.log(account);

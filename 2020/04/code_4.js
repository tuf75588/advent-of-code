const { access } = require('fs');

function extractInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n\n');
}

const sampleData = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const input = extractInput();
// split this text into a list of entries

// using replace
// replace new lines with spaces, then split on each space
// each array index will be a set with passport abbreviation as key

// cid can be treated as optional so I won't include it, but all others are required to be considered valid
const properties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const entryArrays = input.map(
  (entry) =>
    new Set(
      entry
        .replace(/\n/g, ' ')
        .split(' ')
        .map((keyValuePair) => keyValuePair.split(':')[0])
    )
);
// convert the resulting array into a set

const legalCount = entryArrays.filter((element, i) =>
  properties.every((x) => element.has(x))
).length;

// 228

/* PART TWO */

const entryArrays2 = input.map((entry) =>
  entry
    .replace(/\n/g, ' ')
    .split(' ')
    .map((keyValuePair) => keyValuePair.split(':'))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
);

// validator functions

function completenessCheck(obj) {
  return properties.every((key) => key in obj);
}

// for each object, check if all the required fields are there

function checkInRange(numString, min, max) {
  const num = parseInt(numString);
  return min <= num && num <= max;
}

function validityCheck({ byr, iyr, eyr, hgt, hcl, ecl, pid }) {
  // return a new object
  const byrCheck = checkInRange(byr, 1920, 2002);
  const iyrCheck = checkInRange(iyr, 2010, 2020);
  const eyrCheck = checkInRange(eyr, 2020, 2030);
  const eclCheck = /^(?:amb|blu|brn|gry|grn|hzl|oth)$/g.test(ecl);
  const unit = hgt.slice(-2);
  const hgtCheck =
    unit === 'cm' ? checkInRange(hgt, 150, 193) : checkInRange(hgt, 59, 76);
  const hclCheck = /^#[0-9A-F]{6}$/i.test(hcl);
  const pidCheck = /^\d{9}$/.test(pid);
  const results = {
    byrCheck,
    iyrCheck,
    eyrCheck,
    eclCheck,
    hgtCheck,
    hclCheck,
    pidCheck,
  };
  // return (
  //   byrCheck &&
  //   iyrCheck &&
  //   eyrCheck &&
  //   eclCheck &&
  //   hgtCheck &&
  //   hclCheck &&
  //   pidCheck
  // );
  return Object.values(results).every((bool) => bool);
}

const completeValues = entryArrays2.filter((entry) => {
  return completenessCheck(entry) && validityCheck(entry);
}).length;

console.log(completeValues);

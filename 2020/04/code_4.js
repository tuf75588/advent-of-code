function extractInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((passport) => ({ passport }));
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

// split this text into a list of entries
const inputSampleList = sampleData.trim().split('\n\n');

//split entries into lines
const lineList = inputSampleList.map((entry) => entry.split('\n'));
// convert lines into arrays
console.log(lineList);
// combine the arrays into a single array

// convert the resulting array into a set

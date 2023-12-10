import { readTextFileFrom } from '../util.ts';

const input = await readTextFileFrom(import.meta.url, './input.txt');

let calibrationValueSum = 0;

for (const line of input.split('\n')) {
  let firstDigit: string | undefined;
  let secondDigit: string | undefined;
  for (const char of line) {
    if (Number.parseInt(char)) {
      // Find first digit
      if (firstDigit === undefined) {
        firstDigit = char;
      }
      // Find second digit
      secondDigit = char;
    }
  }
  if (firstDigit !== undefined && secondDigit !== undefined) {
    // Turn two digits into a number (calibration value)
    const calibrationValue = firstDigit + secondDigit;
    // Add calibration value to sum
    calibrationValueSum += Number.parseInt(calibrationValue);
  }
}

console.log(calibrationValueSum);

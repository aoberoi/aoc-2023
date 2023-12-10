import { readTextFileFrom } from '../util.ts';

const input = await readTextFileFrom(import.meta.url, './input.txt');

const numberTextToValue = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function findDigitTextAt(haystack: string, startingAt: number): string | undefined {
  const truncatedHaystack = haystack.slice(startingAt);
  for (const [text, value] of Object.entries(numberTextToValue)) {
    if (truncatedHaystack.startsWith(text)) {
      return value.toString();
    }
  }
  return;
}

let calibrationValueSum = 0;

for (const line of input.split('\n')) {
  let firstDigit: string | undefined;
  let secondDigit: string | undefined;
  let potentialDigit: string | undefined;
  for (const [indexString, char] of Object.entries(line)) {
    if (Number.parseInt(char)) {
      potentialDigit = char;
    } else {
      potentialDigit = findDigitTextAt(line, Number.parseInt(indexString));
    }
    if (potentialDigit !== undefined) {
      // Find first digit
      if (firstDigit === undefined) {
        firstDigit = potentialDigit;
      }
      // Find second digit
      secondDigit = potentialDigit;
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

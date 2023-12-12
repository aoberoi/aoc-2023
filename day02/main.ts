import { readTextFileFrom } from '../util.ts';

const input = await readTextFileFrom(import.meta.url, './input.txt');

const maximumCubesByColor = {
  red: 12,
  green: 13,
  blue: 14,
};

console.debug('Cubes available', maximumCubesByColor);

let sumOfPossibleGameNumbers = 0;

for (const line of input.split('\n')) {
  if (!line) continue;

  // Parse input into data structures
  const [gameLabel, rollsText] = line.split(': ');

  const [_, gameNumberText] = gameLabel.split(' ');
  const gameNumber = Number.parseInt(gameNumberText);

  console.debug(`Game ${gameNumber}`);

  const rolls = rollsText.split('; ').map((rollText) => {
    const singleColors = rollText.split(', ').map((singleColorText) => {
      const [numberText, color] = singleColorText.split(' ');
      const number = Number.parseInt(numberText);
      return { number: number, color: color };
    });

    const roll = singleColors.reduce<{ [color: string]: number }>((r, singleColor) => {
      r[singleColor.color] = singleColor.number;
      return r;
    }, {});

    return roll;
  });

  console.debug('Parsed rolls', rolls);

  // Find the minimum number of balls of each color necessary
  const minimumCubesByColorForGame = rolls.reduce<{ [color: string]: number }>((m, roll) => {
    for (const [color, number] of Object.entries(roll)) {
      if (m[color] === undefined || m[color] < number) {
        m[color] = number;
      }
    }
    return m;
  }, {});

  console.debug('Minimum cubes necessary for game', minimumCubesByColorForGame);

  // Decide whether or not game is possible, and accumulate game number
  let possible = true;
  for (const [color, number] of Object.entries(maximumCubesByColor)) {
    // If the minimum is undefined, it is essentially 0, and 0 is less than any maximum, so we short circuit.
    if (minimumCubesByColorForGame[color] !== undefined && minimumCubesByColorForGame[color] > number) {
      possible = false;
      console.debug(`NOT POSSIBLE: For ${color} ${minimumCubesByColorForGame[color]} cubes are necessary, which is larger than ${number}`);
      break;
    }
  }
  if (possible) {
    sumOfPossibleGameNumbers += gameNumber;
    console.debug('POSSIBLE')
  }

  console.debug('-----')
}

console.log(sumOfPossibleGameNumbers);


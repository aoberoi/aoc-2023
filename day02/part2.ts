import { readTextFileFrom } from '../util.ts';

const input = await readTextFileFrom(import.meta.url, './input.txt');

let sumOfPowers = 0;

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

  const power = Object.values(minimumCubesByColorForGame).reduce((p, n) => { return p * n }, 1);

  console.debug('Power', power);

  sumOfPowers += power;

  console.debug('-----')
}

console.log(sumOfPowers);


const getRandomNumber = (min: number, max: number):number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomFloat = (min: number, max: number, scale:number):number =>
  +(Math.random() * (max - min + 1) + min).toFixed(scale);

function getRandomElement<T>(array: T[]): T {
  return array[getRandomNumber(0, array.length - 1)];
}

export { getRandomNumber, getRandomElement, getRandomFloat };

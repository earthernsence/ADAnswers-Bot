export function getLogBase(base: number, value: number): number {
  return Math.log(value) / Math.log(base);
}

export function normDist(z: number): number {
  const t = 1 / (1 + 0.2315419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) probability = 1 - probability;
  return probability;
}
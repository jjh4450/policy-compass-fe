/**
 * Computes the optimal step size for a numeric slider such that:
 * 1. Every marker is aligned with a multiple of the step.
 * 2. The step reflects the maximum decimal precision present in the marker set.
 * 3. The step is no smaller than the smallest non-zero distance between markers.
 *
 * This is especially useful for sliders where precise alignment with non-integer markers is required.
 *
 * @param markers - Array of numeric marker positions.
 * @returns A step value that can be used for sliders like <input type="range">.
 */
export default function getOptimalStep(markers: number[]): number {
  if (markers.length < 2) return 0;

  const uniqueMarkers = [...new Set(markers)];
  if (uniqueMarkers.length < 2) return 0;

  const precision = markers.reduce((p, n) => {
    const dotIndex = n.toString().indexOf(".");
    const decimals = dotIndex === -1 ? 0 : n.toString().length - dotIndex - 1;
    return Math.max(p, decimals);
  }, 0);
  const scale = 10 ** precision;

  const ints = uniqueMarkers
    .map((m) => Math.round(m * scale))
    .sort((a, b) => a - b);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const deltas: number[] = [];
  for (let i = 1; i < ints.length; i++) {
    const diff = ints[i] - ints[i - 1];
    if (diff > 0) {
      deltas.push(diff);
    }
  }

  if (deltas.length === 0) return 0;

  let g = deltas[0];
  for (let i = 1; i < deltas.length; i++) {
    g = gcd(g, deltas[i]);
    if (g === 1) break;
  }

  const step = g / scale;
  return precision === 0 ? step : Number(step.toFixed(precision));
}

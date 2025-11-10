/**
 * Returns all multiples of the given numbers within the specified range,
 * without duplication. Supports automatic scaling for non-integer ranges.
 * Now supports real numbers as base numbers.
 *
 * @param nums - Array of base numbers to find multiples of (can include real numbers).
 * @param maxRange - Inclusive upper bound of the range.
 * @param minRange - Inclusive lower bound of the range (default: 0).
 * @param autoScale - Whether to normalize the range to an integer grid
 *                    and scale the result back (default: false).
 * @returns Array of multiples within the range, without duplicates.
 * @throws {RangeError} If maxRange exceeds safe memory bounds for integer processing,
 *                      if minRange is invalid,
 *                      or if nums includes non-positive numbers.
 */
const MAX_SAFE_RANGE = 100_000_000;
const GRID_SIZE = 1000;
const PRECISION_DIGITS = 6;

const generateMultiples = (
  nums: number[],
  maxRange: number,
  minRange: number = 0,
  autoScale: boolean = false,
): number[] => {
  validateInputs(nums, minRange, maxRange, autoScale);

  if (nums.length === 0) return [];

  const allInputsAreIntegers =
    Number.isInteger(minRange) && Number.isInteger(maxRange);
  const allNumsAreIntegers = nums.every(Number.isInteger);

  if (autoScale) {
    if (allInputsAreIntegers && allNumsAreIntegers) {
      if (maxRange > MAX_SAFE_RANGE) {
        throw new RangeError(
          `maxRange (${maxRange}) exceeds safe limit (${MAX_SAFE_RANGE}) for integer processing, even with autoScale enabled for integer inputs.`,
        );
      }
      return generateIntegerMultiples(nums, minRange, maxRange);
    } else {
      return generateScaledMultiples(nums, minRange, maxRange);
    }
  } else {
    // If we have real numbers in nums, we need to use scaled approach even without autoScale
    if (!allNumsAreIntegers || !allInputsAreIntegers) {
      return generateRealMultiples(nums, minRange, maxRange);
    }
    return generateIntegerMultiples(nums, minRange, maxRange);
  }
};

/**
 * Validates input parameters and throws appropriate errors
 */
function validateInputs(
  nums: number[],
  minRange: number,
  maxRange: number,
  autoScale: boolean,
): void {
  if (!nums.every(isPositiveNumber)) {
    throw new RangeError("All base numbers must be positive non-zero numbers.");
  }

  if (minRange > maxRange) {
    throw new RangeError(
      `Invalid range: minRange=${minRange}, maxRange=${maxRange}.`,
    );
  }

  if (!autoScale) {
    const allNumsAreIntegers = nums.every(Number.isInteger);
    const allInputsAreIntegers =
      Number.isInteger(minRange) && Number.isInteger(maxRange);

    if (allNumsAreIntegers && allInputsAreIntegers) {
      if (maxRange > MAX_SAFE_RANGE) {
        throw new RangeError(
          `maxRange (${maxRange}) exceeds safe limit (${MAX_SAFE_RANGE}) when autoScale is false.`,
        );
      }
    }
  }
}

/**
 * Checks if a number is positive (including real numbers)
 */
function isPositiveNumber(n: number): boolean {
  return typeof n === "number" && !isNaN(n) && n > 0;
}

/**
 * Generates multiples for integer ranges using bit array for deduplication
 */
function generateIntegerMultiples(
  nums: number[],
  minRange: number,
  maxRange: number,
): number[] {
  const result: number[] = [];
  const seen = new Uint8Array(maxRange + 1);

  for (const num of nums) {
    const startMultiple = calculateStartMultiple(num, minRange);

    for (let multiple = startMultiple; multiple <= maxRange; multiple += num) {
      if (multiple < 0) continue;
      if (!seen[multiple]) {
        seen[multiple] = 1;
        result.push(multiple);
      }
    }
  }

  return result;
}

/**
 * Generates multiples for real number cases
 */
function generateRealMultiples(
  nums: number[],
  minRange: number,
  maxRange: number,
): number[] {
  const result = new Set<number>();

  for (const num of nums) {
    const startMultiplier = Math.max(1, Math.ceil(minRange / num));
    const endMultiplier = Math.floor(maxRange / num);

    for (
      let multiplier = startMultiplier;
      multiplier <= endMultiplier;
      multiplier++
    ) {
      const multiple = num * multiplier;

      if (isWithinRange(multiple, minRange, maxRange)) {
        const roundedValue = Number(multiple.toFixed(PRECISION_DIGITS));
        result.add(roundedValue);
      }
    }
  }

  return Array.from(result).sort((a, b) => a - b);
}

/**
 * Calculates the first multiple of num that's >= minRange
 */
function calculateStartMultiple(num: number, minRange: number): number {
  const effectiveMinRange = Math.max(minRange, 0);
  return Math.ceil(effectiveMinRange / num) * num;
}

/**
 * Generates multiples for non-integer ranges using grid scaling
 */
function generateScaledMultiples(
  nums: number[],
  minRange: number,
  maxRange: number,
): number[] {
  const gridMultiples = generateMultiples(nums, GRID_SIZE, 0, false);
  const span = maxRange - minRange;
  const mappedValues = new Set<number>();

  for (const gridMultiple of gridMultiples) {
    const scaledValue = minRange + (gridMultiple / GRID_SIZE) * span;
    const roundedValue = Number(scaledValue.toFixed(PRECISION_DIGITS));

    if (isWithinRange(roundedValue, minRange, maxRange)) {
      mappedValues.add(roundedValue);
    }
  }

  return Array.from(mappedValues).sort((a, b) => a - b);
}

/**
 * Checks if a value is within the specified range (inclusive)
 */
function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export default generateMultiples;

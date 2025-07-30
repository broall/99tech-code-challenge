/**
 Three ways to sum to n
 Provide 3 unique implementations of the following function in TypeScript.
  - Comment on the complexity or efficiency of each function.

  **Input**: `n` - any integer
  *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
  **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

/**
 * First solution: Just implement a simple loop to calculate the sum of all integers
 * Time complexity: O(n)
 * Space complexity: O(1)
 * This is the most native way to implement. This is also flexible to modify the logic
 * (if needed) inside the loop.
 * @param n
 * @returns
 */
function sumToN1(n: number): number {
  let sumValue = 0;
  // If n < 0, the loop won't be triggered. Thus, the sum value will be 0 as expected.
  for (let i = 1; i <= n; i++) {
    sumValue += i;
  }
  return sumValue;
}

/**
 * Second solution: Use match formula to calculate the sum of first n integers.
 * Time complexity: O(1)
 * Space complexity: O(1)
 * This is more optimized than 1st solution thanks to math formula, but it's unlikely that
 * we have math formula for any problem in real business.
 * @param n
 * @returns
 */
function sumToN2(n: number): number {
  // Set this condition to avoid the case that n is negative
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
}

/**
 * Use functional programming approach
 * Time complexity: O(n)
 * Space complexity: O(n)
 * This approach seems to be the most complicated to me. However, the benefit of this approach
 * is to follow the idea from functional programming, that is to make the code easier to
 * read, understand and maintain.
 * As compared to 1st solution, this one has overhead for memory and the additional step
 * to generate array. If n is big, this is much slower than 1st solution.
 * @param n
 * @returns
 */
function sumToN3(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((sumValue, i) => sumValue + i, 0);
}

/**
 * Use recursion, which is basic in programing.
 * Time complexity: O(n)
 * Space complexity: O(n)
 * The time complexity of this solution is similar to 1st solution, however this one uses
 * lots of memory to keep data in stack, which is unoptimized and could cause stack
 * overflow issue.
 * In production, recursion should be carefully reviewed if we would like to apply it.
 * @param n
 * @returns
 */
function sumToN4(n: number): number {
  if (n <= 0) return 0;
  return n + sumToN4(n - 1);
}

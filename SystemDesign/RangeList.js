/**
 * Updates intensity values for a range of numbers.
 * This class allows adding and setting intensity values for ranges of numbers.
 * It maintains a list of segments, each defined by a start and end point,
 * and the intensity value for that segment.
 * Runtime: O(log n) for add and set operations, where n is the number of segments.
 * Space: O(n) for storing segments.
 */
class RangeList {
  constructor() {
    this.segments = [];
  }
  /**
   * Add an amount to the intensity for a range [from, to)
   * @param {number} from - Start of the range (inclusive)
   * @param {number} to - End of the range (exclusive)
   * @param {number} amount - Amount to add to the intensity
   */
  add(from, to, amount) {
    if (from >= to) return; // Invalid range
    const newSegments = [];
    let i = 0;
    const n = this.segments.length;

    // Add all segments before `from`
    while (i < n && this.segments[i][0] < from) {
      newSegments.push([...this.segments[i]]);
      i++;
    }

    // Handle start of the range
    const prevValue = this.#_getIntensityAt(from);
    if (i === 0 || this.segments[i - 1][0] < from) {
      newSegments.push([from, prevValue + amount]);
    } else if (i > 0) {
      newSegments[i - 1][1] += amount;
    }

    // Handle middle segments
    while (i < n && this.segments[i][0] < to) {
      if (this.segments[i][0] > from) {
        newSegments.push([this.segments[i][0], this.segments[i][1] + amount]);
      }
      i++;
    }

    // Handle end of the range
    if (i === 0 || (i > 0 && this.segments[i - 1][0] < to)) {
      const endValue = i < n ? this.segments[i][1] : 0;
      newSegments.push([to, endValue]);
    }

    // Add remaining segments
    while (i < n) {
      newSegments.push([...this.segments[i]]);
      i++;
    }

    // Merge and clean segments
    this.segments = this.#_mergeSegments(newSegments);
  }
  /**
   * Set the intensity for a range [from, to) to a specific amount
   * @param {number} from - Start of the range (inclusive)
   * @param {number} to - End of the range (exclusive)
   * @param {number} amount - Amount to set the intensity to
   * @returns
   */
  set(from, to, amount) {
    if (from >= to) return; // Invalid range
    const point = this.#_getIntensityAt(from);
    this.add(from, to, amount - point);
  }

  /**
   * Get the intensity at a specific point
   * @param {number} point - The point to check
   * @returns {number} The intensity at the given point
   */
  #_getIntensityAt(point) {
    let left = 0,
      right = this.segments.length - 1;
    let ret = 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.segments[mid][0] <= point) {
        ret = this.segments[mid][1];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return ret;
  }

  /**
   * Merges adjacent segments with the same intensity
   * @param {Array} segments - Array of segments to merge
   * @returns {Array} Merged segments
   */
  #_mergeSegments(segments) {
    if (segments.length === 0) return [];

    const merged = [segments[0]];
    for (let i = 1; i < segments.length; i++) {
      const last = merged[merged.length - 1];
      if (last[1] !== segments[i][1]) {
        merged.push([...segments[i]]);
      }
    }
    // Remove leading segment if intensity is 0 (default)
    if (merged.length > 0 && merged[0][1] === 0) {
      merged.shift();
    }

    return merged;
  }
  /**
   * Returns the current segments
   * @returns {Array} Array of segments
   */
  getSegments() {
    return this.segments;
  }
}

module.exports = RangeList;

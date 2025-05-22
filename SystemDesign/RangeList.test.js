const { describe, test, expect, beforeEach } = require("@jest/globals");
const RangeList = require("./RangeList");

describe("RangeList", () => {
  let rangeList;

  beforeEach(() => {
    rangeList = new RangeList();
  });

  test("initial state is empty", () => {
    expect(rangeList.getSegments()).toEqual([]);
  });

  test("add single range", () => {
    rangeList.add(10, 30, 1);
    expect(rangeList.getSegments()).toEqual([
      [10, 1],
      [30, 0],
    ]);
  });

  test("add overlapping ranges", () => {
    rangeList.add(10, 30, 1);
    rangeList.add(20, 40, 1);
    expect(rangeList.getSegments()).toEqual([
      [10, 1],
      [20, 2],
      [30, 1],
      [40, 0],
    ]);
  });

  test("add to reduce intensity", () => {
    rangeList.add(10, 30, 1);
    rangeList.add(20, 40, 1);
    rangeList.add(10, 40, -2);
    expect(rangeList.getSegments()).toEqual([
      [10, -1],
      [20, 0],
      [30, -1],
      [40, 0],
    ]);
  });

  test("multiple subtractions leading to negative intensities", () => {
    rangeList.add(10, 30, 1);
    rangeList.add(20, 40, 1);
    rangeList.add(10, 40, -1);
    expect(rangeList.getSegments()).toEqual([
      [20, 1],
      [30, 0],
    ]);
    rangeList.add(10, 40, -1);
    expect(rangeList.getSegments()).toEqual([
      [10, -1],
      [20, 0],
      [30, -1],
      [40, 0],
    ]);
  });

  test("set replaces intensity correctly", () => {
    rangeList.add(10, 20, 5);
    rangeList.set(10, 20, 2);
    expect(rangeList.getSegments()).toEqual([
      [10, 2],
      [20, 0],
    ]);
  });

  test("set on empty range is no-op", () => {
    rangeList.set(10, 10, 5);
    expect(rangeList.getSegments()).toEqual([]);
  });

  test("add on empty range is no-op", () => {
    rangeList.add(5, 5, 1);
    expect(rangeList.getSegments()).toEqual([]);
  });

  test("disjoint range addition", () => {
    rangeList.add(0, 10, 1);
    rangeList.add(20, 30, 2);
    expect(rangeList.getSegments()).toEqual([
      [0, 1],
      [10, 0],
      [20, 2],
      [30, 0],
    ]);
  });

  test("merging of adjacent segments with same intensity", () => {
    rangeList.add(10, 20, 1);
    rangeList.add(20, 30, 1);
    expect(rangeList.getSegments()).toEqual([
      [10, 1],
      [30, 0],
    ]);
  });
});

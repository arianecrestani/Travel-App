import {
  formatDate,
  calculateDaysBetweenDates,
} from "../src/client/js/date.js";



describe("Testing format Date", () => {
  test("fomatDate should be on this format", () => {
    const date = new Date("2000.04.29");
    expect(formatDate(date)).toBe("29/4/2000");
  });
});

describe("Testing how many days ", () => {
  test("fomatDate should be on this format", () => {
    expect(
      calculateDaysBetweenDates(new Date("2000.04.29"), new Date("2000.04.30"))
    ).toBe(1);
    expect(
        calculateDaysBetweenDates(new Date("2000.04.29"), new Date("2000.04.30"))
      ).toBe(1);
  });
});

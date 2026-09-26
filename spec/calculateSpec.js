const { calculateInterest } = require("../script.js");

describe("calculateInterest", function () {

  it("correctly calculates simple interest for valid numeric inputs", function () {
    // principal=1000, rate=5%, time=2 years -> (1000*5*2)/100 = 100
    const result = calculateInterest(1000, 5, 2);
    expect(result).toBe(100);
  });

  it("correctly converts string inputs to numbers before calculating", function () {
    // Inputs arrive as strings from HTML form fields (input.value is always a string)
    const result = calculateInterest("2000", "3.5", "4");
    expect(result).toBe(280);
  });

});

/**
 * Interest Rate Calculator - business logic
 * Fixed version:
 *  - All inputs are explicitly converted to Number() before use (Task 2.2)
 *  - Guards against non-numeric / empty input so no TypeErrors are thrown (Task 2.1)
 */

/**
 * Calculates simple interest.
 * @param {number|string} principal - the principal amount
 * @param {number|string} rate - annual interest rate (percentage)
 * @param {number|string} time - time period in years
 * @returns {number} the simple interest, rounded to 2 decimal places
 */
function calculateInterest(principal, rate, time) {
  // Explicitly convert every input to a Number to prevent string
  // concatenation bugs / TypeErrors further down the line.
  const p = Number(principal);
  const r = Number(rate);
  const t = Number(time);

  if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t)) {
    throw new Error("Invalid input: principal, rate and time must all be numbers.");
  }

  const interest = (p * r * t) / 100;

  // Round to 2 decimal places without floating point artifacts.
  return Math.round(interest * 100) / 100;
}

/**
 * Wires up the calculator form in the browser.
 * Wrapped in a DOM-existence check so this file can also be safely
 * required by Jasmine/Node for unit testing calculateInterest().
 */
function initCalculatorUI() {
  const form = document.getElementById("interest-form");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const principalInput = document.getElementById("principal").value;
    const rateInput = document.getElementById("rate").value;
    const timeInput = document.getElementById("time").value;

    try {
      const interest = calculateInterest(principalInput, rateInput, timeInput);
      const total = Math.round((Number(principalInput) + interest) * 100) / 100;

      resultBox.classList.remove("error");
      resultBox.innerHTML =
        "Interest: $" + interest.toFixed(2) + "<br>Total Amount: $" + total.toFixed(2);
    } catch (err) {
      resultBox.classList.add("error");
      resultBox.textContent = "Please enter valid numeric values in all fields.";
    }
  });
}

// Only attach UI logic when running in a browser with a real DOM and
// the expected elements present (prevents TypeErrors when this file
// is loaded in Node/Jasmine, where `document` is undefined).
if (typeof document !== "undefined" && document.getElementById("interest-form")) {
  initCalculatorUI();
}

// Export for Jasmine / Node-based unit testing (Task B).
// In the browser, `module` is undefined, so this block is skipped safely.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateInterest };
}

// Tracks all entries
let record = [];

// Only numnbers no invalid values
let validResults = [];

// Keep prompting for two numbers and operation until user clicks cancel
let promptLoop = true;
while (promptLoop) {
  let first = prompt("Enter first number (x):");
  if (first === null) break;

  let second = prompt("Enter second number (y):");
  if (second === null) break;

  let op = prompt("Enter operator (+, -, *, /, %):");
  if (op === null) break;

  let output;
  let x = parseFloat(first);
  let y = parseFloat(second);

  // Make sure number entries are numerical values
  if (isNaN(x) || isNaN(y)) {
    output = "<span class='error'>Invalid number</span>";
  } else if (!["+", "-", "*", "/", "%"].includes(op)) {
    // Check operator validity
    output = "<span class='error'>Invalid operator</span>";
  } else {
    // Execute operation
    if (op === "+") output = x + y;
    else if (op === "-") output = x - y;
    else if (op === "*") output = x * y;
    else if (op === "/") output = (y !== 0) ? x / y : "<span class='error'>Division by zero</span>";
    else if (op === "%") output = (y !== 0) ? x % y : "<span class='error'>Division by zero</span>";
  }

  record.push({ first, op, second, output });

  // Results only hold correctly executed operations
  if (typeof output === "number" && !isNaN(output)) {
    validResults.push(output);
  }
}

// Build results table
document.write("<table>");
document.write("<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>");
record.forEach(entry => {
  document.write("<tr><td>" + entry.first + "</td><td>" + entry.op + "</td><td>" + entry.second + "</td><td>" + entry.output + "</td></tr>");
});
document.write("</table>");

// Build summary table excluding the invalid operations based on validResults
if (validResults.length > 0) {
  let minVal = Math.min(...validResults);
  let maxVal = Math.max(...validResults);
  let sum = validResults.reduce((acc, n) => acc + n, 0);
  let average = sum / validResults.length;

  document.write("<table>");
  document.write("<tr><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>");
  document.write("<tr><td>" + minVal + "</td><td>" + maxVal + "</td><td>" + average.toFixed(2) + "</td><td>" + sum + "</td></tr>");
  document.write("</table>");
} else {
  document.write("<p><strong>No valid results to summarize.</strong></p>");
}

// Holds every user entry (for the main table)
let record = [];

// Holds only valid numeric outputs (for summary stats)
let validResults = [];

// Main input loop (runs until user cancels)
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

  // Validate numbers first
  if (isNaN(x) || isNaN(y)) {
    output = "<span class='error'>Invalid number</span>";
  } else if (!["+", "-", "*", "/", "%"].includes(op)) {
    // Check operator validity
    output = "<span class='error'>Invalid operator</span>";
  } else {
    // Perform operation
    if (op === "+") output = x + y;
    else if (op === "-") output = x - y;
    else if (op === "*") output = x * y;
    else if (op === "/") output = (y !== 0) ? x / y : "<span class='error'>Division by zero</span>";
    else if (op === "%") output = (y !== 0) ? x % y : "<span class='error'>Division by zero</span>";
  }

  // Add this calculation attempt to history
  record.push({ first, op, second, output });

  // Keep only valid numbers for later stats
  if (typeof output === "number" && !isNaN(output)) {
    validResults.push(output);
  }
}

// Build main results table
document.write("<table>");
document.write("<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>");
record.forEach(entry => {
  document.write("<tr><td>" + entry.first + "</td><td>" + entry.op + "</td><td>" + entry.second + "</td><td>" + entry.output + "</td></tr>");
});
document.write("</table>");

// Build summary table based on only valid computations
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

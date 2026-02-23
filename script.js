const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let justEvaluated = false;
// Button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (currentInput === "Error" || currentInput === "Infinity") {
      currentInput = "";
    }
    if (!isNaN(value) || value === ".") {
      // Number or decimal
      if (justEvaluated) {
        currentInput = "";
        justEvaluated = false;
      }
      currentInput += value;
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Operators
      console.log("Clicked:", value, value.charCodeAt(0));
      const lastChar = currentInput.slice(-1);
      // Prevents double operators
      if (["+", "-", "*", "/"].includes(lastChar)) return;
      justEvaluated = false;
      currentInput += value;
    } else if (value === "=") {
      // Evaluate
      try {
        currentInput = eval(currentInput).toString();
        justEvaluated = true;
      } catch {
        currentInput = "Error";
      }
    } else if (value === "AC") {
      currentInput = "";
      justEvaluated = false;
    } else if (value === "←" || value === "<-") {
      // Backspace (handles both symbols)
      currentInput = currentInput.slice(0, -1);
      justEvaluated = false;
    } else if (value === "%") {
      // Percentage
      try {
        currentInput = (eval(currentInput) / 100).toString();
        justEvaluated = true;
      } catch {
        currentInput = "Error";
      }
    }
    updateDisplay();
  });
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (currentInput === "Error" || currentInput === "Infinity") {
    currentInput = "";
  }
  if (!isNaN(key) || key === ".") {
    // Number or decimal
    if (justEvaluated) {
      currentInput = "";
      justEvaluated = false;
    }
    currentInput += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    // Operators
    const lastChar = currentInput.slice(-1);
    // Prevents double operators
    if (["+", "-", "*", "/"].includes(lastChar)) return;
    justEvaluated = false;
    currentInput += key;
  } else if (key === "Enter") {
    // Evaluate
    try {
      currentInput = eval(currentInput).toString();
      justEvaluated = true;
    } catch {
      currentInput = "Error";
    }
  } else if (key === "Escape") {
    currentInput = "";
    justEvaluated = false;
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    justEvaluated = false;
  } else if (key === "%") {
    try {
      currentInput = (eval(currentInput) / 100).toString();
      justEvaluated = true;
    } catch {
      currentInput = "Error";
    }
  }
  updateDisplay();
});

function updateDisplay() {
  display.textContent = currentInput || "0";
}

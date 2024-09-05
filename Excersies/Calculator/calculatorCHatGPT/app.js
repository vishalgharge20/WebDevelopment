const displayScreen = document.querySelector('#displayScreen');
let calculated = false;

function appendToDisplay(input) {
    if (calculated) {
        displayScreen.value = '';  // Clear after equals button was pressed
        calculated = false;
    }
    
    const lastChar = displayScreen.value.slice(-1);
    if (isOperator(lastChar) && isOperator(input)) {
        return;  // Prevent adding multiple operators in a row
    }
    
    displayScreen.value += input;
}

function clearDisplay() {
    displayScreen.value = '';
}

function calculate() {
    try {
        let result = eval(displayScreen.value);
        displayScreen.value = parseFloat(result).toFixed(2); 
        calculated = true;  // Set flag to clear on next input
    } catch (error) {
        displayScreen.value = "Error";
    }
}

// Helper function to check if the input is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Enable keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        displayScreen.value = displayScreen.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

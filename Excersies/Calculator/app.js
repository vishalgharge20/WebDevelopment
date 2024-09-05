

 const displayScreen = document.querySelector('#displayScreen') 


function appendToDisplay(input){
    displayScreen.value = displayScreen.value + input
}


function clearDisplay(){
    displayScreen.value = ""
}


function calculate(){
    try {
        let result = eval(displayScreen.value);
        if (Number.isInteger(result)) {
            displayScreen.value = result;  // No decimals needed
        } else {
            displayScreen.value = parseFloat(result).toFixed(2);  // Keep up to 2 decimals
        }
    } catch (error) {
        displayScreen.value = "Error";
    }

}

function clearLastInput(){
    displayScreen.value = displayScreen.value.slice(0, -1);
}


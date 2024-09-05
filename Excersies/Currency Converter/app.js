const url = 'https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/USD_EUR.json'

const dropdowns = document.querySelectorAll('#dropdownContainer select')
const enterAmt = document.querySelector('#Amt')
const fromDropdown = document.querySelector("#from")
const toDropdown = document.querySelector("#to")
const GetExchange = document.querySelector('#submit')
const convertedAmt = document.querySelector('#outputAmt')



//// Adding all options to the select dropdown
for(let select of dropdowns){
    for(currentCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currentCode
        newOption.value = currentCode

        if (select.name==="from" && currentCode==="USD"){
            newOption.selected= true
        }
        else if (select.name==="to" && currentCode==="INR"){
            newOption.selected= true
        }

        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

// updating flag
const updateFlag = (element)=>{
    let currentCode = element.value
    let countryCode = countryList[currentCode]
    let newimg = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newimg
}



enterAmt.addEventListener('change',function(){
    const amount = enterAmt.value
    console.log(amount)
})

enterAmt.addEventListener('focus',function(){
    enterAmt.value = '';
    convertedAmt.value = '';
})

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click',function(){
    convertedAmt.value = '';})
    updateFlag(dropdown) // Update flag when dropdown changes
})

GetExchange.addEventListener('click',async(evt)=>{
    evt.preventDefault()
    try {
        const fromCurrency = fromDropdown.value;
        const toCurrency = toDropdown.value;
        const response = await fetch(`https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${fromCurrency}_${toCurrency}.json`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    let data = await response.json();
    let rate = data.rate;
    console.log(data)
    let convertedAmount = enterAmt.value/ rate;
    convertedAmt.value = convertedAmount.toFixed(2);   
    }
    catch (error) {
        console.error('Error fetching exchange rate:', error);
        showToast('Error fetching exchange rate. Please try again later.'); // Added: Show toast on error
    }
    disableUI()
})

const disableUI = () => {
    GetExchange.style.backgroundColor = 'grey';
    GetExchange.style.cursor = 'not-allowed';
    GetExchange.disabled = true;
    dropdowns.forEach(dropdown => dropdown.disabled = true);
    convertedAmt.disabled = true
};

const enableUI = () => {
    GetExchange.style.backgroundColor = '';
    GetExchange.style.cursor = '';
    GetExchange.disabled = false;
    dropdowns.forEach(dropdown => dropdown.disabled = false);
    convertedAmt.disabled = true
};

enterAmt.addEventListener('click',function(){
    enableUI()
})

const showToast = (message) => {
    if (toast) { // Check if toast element exists
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000); // Hide toast after 3 seconds
    } else {
        console.error('Toast element not found');
    }
};
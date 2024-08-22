

// const btn = document.querySelector('#btn');
// const cont = document.querySelector('.container');

// // change background color
// btn.addEventListener('click', function() {    
//     randomCol = makeRandomCol()
//     document.body.style.background = randomCol;
// // display rgb code
//     document.querySelector('h1').innerText = randomCol

// });

// function makeRandomCol(){
//     const red = Math.floor(Math.random() * 256);
//     const green = Math.floor(Math.random() * 256);
//     const blue = Math.floor(Math.random() * 256);

//     const randomCol = `rgb(${red}, ${green}, ${blue})`;
//     return randomCol
// }




///// /////////////////

const btn = document.querySelector('#btn');
const h1 = document.querySelector('h1');

// Function to generate a random color and return RGB values
function makeRandomCol() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const randomCol = `rgb(${red}, ${green}, ${blue})`;
    return { red, green, blue, randomCol };
}

// Change background color and update h1 color
btn.addEventListener('click', function() {    
    // Get random color and RGB values
    const { red, green, blue, randomCol } = makeRandomCol();

    // Set the background color of the body
    document.body.style.background = randomCol;

    // Update the h1 text color based on RGB values
    if (red < 50 && green < 50 && blue < 50) {
        h1.style.color = 'rgb(255, 255, 255)'; // Set h1 text color to white
    } else {
        h1.style.color = 'rgb(0, 0, 0)'; // Set h1 text color to black
    }

    // Display the RGB code in the h1 element
    h1.innerText = randomCol;
});


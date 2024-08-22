
// function makeRandomCol(){
//     const red = Math.floor(Math.random() * 256);
//     const green = Math.floor(Math.random() * 256);
//     const blue = Math.floor(Math.random() * 256);

//     const randomCol = `rgb(${red}, ${green}, ${blue})`;
//     return randomCol
// }

// let btns = document.querySelectorAll('Button')
// let par = document.querySelectorAll('p')

// for(let button of btns){
//     button.addEventListener('click',function(){
//         button.style.backgroundColor = makeRandomCol()
//         button.style.color = makeRandomCol()
//     })
// }


// for(let p of par){
//     p.addEventListener('click',function(){
//         p.style.backgroundColor = makeRandomCol()
//         p.style.color = makeRandomCol()
//     })
// }



/// using this keyword

function makeRandomCol(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const randomCol = `rgb(${red}, ${green}, ${blue})`;
    return randomCol
}


let btns = document.querySelectorAll('Button')
let par = document.querySelectorAll('p')


function colorize(){
    this.style.backgroundColor = makeRandomCol()
    this.style.color = makeRandomCol()
}

for(let button of btns){
    button.addEventListener('click',colorize)
}


for(let p of par){
    p.addEventListener('click',colorize)
}

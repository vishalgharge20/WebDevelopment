

const btn2 = document.querySelector('#v2');

// btn2.onclick = function(){
//     alert('What?')
// }

// Arrow function 
// btn2.onclick = ()=>{
//     alert('What?')
// }

/// or we can define a function and use it

function askWhat(){
    console.log('what?')
}
btn2.onclick = askWhat

function shout(){
    console.log('shout!')
}

function screem(){
    console.log("AHHHHHHH AHHHHHH AHHHHHH!")
}

const btn3 = document.querySelector('#v3');

btn3.onmouseenter = screem


//// addEventListener 

const btn4 = document.querySelector('#v4');

btn4.addEventListener('click',function(){
    console.log("You used addEventListener")
})

const btn5 = document.querySelector('#v5');

btn5.addEventListener('click',shout,{once:true})
btn5.addEventListener('click',askWhat)
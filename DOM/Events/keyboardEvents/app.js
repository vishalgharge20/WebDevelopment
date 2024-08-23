

let inp = document.querySelector('input')

// inp.addEventListener('keydown',function(){
//     console.log("Down")
// })
// inp.addEventListener('keyup',function(){
//     console.log("Up")
// })


// inp.addEventListener('keydown',function(evt){
//     switch(evt.code){
//         case 'ArrowUp':
//             console.log("UP!")
//             break
//         case 'ArrowDown':
//             console.log("DOWN!")
//             break
//         case 'ArrowRight':
//             console.log("Right!")
//             break
//         case 'ArrowLeft':
//             console.log("LEFT!")
//             break                
//     }
// })



// selecting form
const nameSubmit = document.querySelector('#nameform')
//selecting input holder
const input = document.querySelector('#petType')
// selecting ul list
const list =  document.querySelector('#pets')


nameSubmit.addEventListener('submit',function(evt){
    evt.preventDefault()
    // store the input into userInput variable
    userInput = input.value
    // create new li
    const newLI = document.createElement('li')
    //place the cat name in the empty li
    newLI.innerText = userInput
    // appened in list
    list.append(newLI)
    //clear the input
    input.value = ''    
})

// deleting wrong entries
list.addEventListener('click',function(evt){
    // evt.target.remove()
    // console.dir(evt.target)
    // we can add if conditon to only remove li if it is li, sometimes user may click on padding also
    if(evt.target.nodeName==='LI'){
        evt.target.remove()
    }
})




//// change event ///////

// const searchinput = document.querySelector('#search')

// searchinput.addEventListener("change",function (evt){
//     console.log("Changed")
// })



///// input event ////////////
// const searchinput = document.querySelector('#search')
// const h3 = document.querySelector('h3')
// searchinput.addEventListener("input",function (evt){
//     h3.innerText = searchinput.value
// })


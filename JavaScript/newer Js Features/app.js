

// function rollDice(numberOfSides){
//     if(numberOfSides===undefined){
//         numberOfSides=6
//     }
//     return Math.floor(Math.random()*numberOfSides)+1
// }

// using default param
// function rollDice(numberOfSides=6){
//     return Math.floor(Math.random()*numberOfSides)+1
// }

// const res = [100,95,80,76,50];
// const [gold,silver,bronze] =res

// console.log(silver)
// console.log(gold)


const user = {
    email: 'abc@gmail.com',
    password: 123456,
    firstname: 'Tim',
    lastname: 'David',
    born: 1990,
    country: 'Australia'
}

//console.log(user.email) 
// or

// const email = user.email;

const {email,firstname} = user
console.log(email)
console.log(firstname)
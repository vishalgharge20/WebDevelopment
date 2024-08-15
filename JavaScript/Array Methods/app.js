

//let num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

function print(user_input){
    console.log(user_input)
}

// print("Hello")

// for(let n of num){
//     print(n)
// }

// num.forEach(function(element){
//     console.log(element)
// })


// forEach

// let movies = [
//     {
//         title:'Alien',
//         score:85
//     },
//     {
//         title:'Don',
//         score:100
//     },
//     {
//         title:'TopGun',
//         score:80
//     },
//     {
//         title:'Speed',
//         score:95
//     }
// ]

// movies.forEach(function(movie){
//     console.log(`${movie.title} - ${movie.score}/100`)
// })


// Map

const texts = ['Rolf','lol','omg']
// const capTexts = texts.map(function(text){
//     return text.toUpperCase();
// })

// // or 
// const capTexts = texts.map((text)=>{
//  return text.toUpperCase();
// })
// console.log(capTexts)

// const square = (x)=>{
//     return x*x
// }

// console.log(square(7))

// const rollDice = ()=>{
//     console.log(Math.floor(Math.random()*6)+1)
// }

// rollDice()

// const even = num.filter((n)=>{
//     return n%2===0;
// })

// print(even)

/// Reduce

let num = [11,21,31,41,51,61,71,81,9,10,11,12,13,14,15]

// let total = 0
// for(n of num){
//     total=total+n
// }
// print(total)

//using reduce

// let total = 0
// total = num.reduce((total,n)=>{
//     return total+n
// })
// print(total)


let minPrice = 0
minPrice = num.reduce((min,currentPrice)=>{
    if(currentPrice<min){
        return currentPrice
    }
    else{
        return min
    }
})

print(minPrice)
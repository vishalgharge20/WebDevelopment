function add(a,b){
    return a+b
 }

const  pi = 3.14

const sub = (a,b)=>{
    return a-b
}

function square(a){
    return a*a
}


// console.log(add(5,6))
// console.log(pi)
// console.log(sub(10,5))

module.exports.add = add
module.exports.sub = sub
module.exports.pi = pi
module.exports.square = square
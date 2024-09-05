/// Promises are used to overcome CallBack Hell


// function getPromise(){
//     return new Promise((resolve,reject)=>{
//         console.log("I am a promise")
//         // reject("error")
//         resolve(123)
//     })
// }

// let myPromise = getPromise()
//     myPromise.then((res)=>{
//         console.log("Promise FullFilled",res)
//     })
//     myPromise.catch((err)=>{
//         console.log("Rejected",err)
//     })



///// promise chain 

// function asyncFunc1(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("Data1")
//             resolve("Success")
//         },4000)
//     })
// }

// console.log("Fetching Data........")
// let p1 = asyncFunc1()
// p1.then((res)=>{
//     console.log(res)
// })



///////  chaining the .then

function asyncFunc1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Data1")
            resolve("Success")
        },4000)
    })
}

function asyncFunc2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Data2")
            resolve("Success")
        },4000)
    })
}


// console.log("Fetching Data1........")
// let p1 = asyncFunc1()
// p1.then((res)=>{
//     console.log("Fetching Data2........")
//     let p2 = asyncFunc2()
//     p2.then((res)=>{
//     })
// })

//or 

console.log("Fetching Data1........")
asyncFunc1().then((res)=>{
    console.log("Fetching Data2........")
    asyncFunc2().then((res)=>{
    })
})





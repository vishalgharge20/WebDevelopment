//// callback hell



// Normal code

// function getData(dataId){
//     // 2sec time out
//     setTimeout(()=>{
//     console.log("data :",dataId)
//     },2000)
// }

// // this is not the correct way
// getData(1);
// getData(2);
// getData(3);
// getData(4);




// use callback 

// function getData(dataId,getNextData){
//     // 2sec time out
//     setTimeout(()=>{
//     console.log("data :",dataId)
//     if (getNextData){
//         getNextData()
//     }
//     },2000)
// }


// getData(1,()=>{
//     getData(2,()=>{
//         getData(3,()=>{
//             getData(4)
//         })
//     });
// });




//// using promises chain

function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("data :",dataId)
            resolve("Success")
        },1000)
    })
}

// let p1 = getData(1);
// p1.then((res)=>{
//     console.log(res)
// })

// or

// getData(1).then((res)=>{
// return getData(2)
// })
// .then((res)=>{
// return getData(3)
// })
// .then((res)=>{
// return getData(4)
// })
// .then((res)=>{
// console.log(res)
// })



//// more improved and most used-----> Async-Await

// async function getAllData() {
//     console.log("Getting Data1.....");
//     await getData(1)
//     console.log("Getting Data2.....");
//     await getData(2);
//     console.log("Getting Data3.....");
//     await getData(3);
//     console.log("Getting Data4.....");
//     await getData(4);
// }

// execute without invoking  (IIFE)

// (async function() {
//     console.log("Getting Data1.....");
//     await getData(1)
//     console.log("Getting Data2.....");
//     await getData(2);
//     console.log("Getting Data3.....");
//     await getData(3);
//     console.log("Getting Data4.....");
//     await getData(4);
// })();

//or use arrow function

(async () => {
    console.log("Getting Data1.....");
    await getData(1)
    console.log("Getting Data2.....");
    await getData(2);
    console.log("Getting Data3.....");
    await getData(3);
    console.log("Getting Data4.....");
    await getData(4);
})();


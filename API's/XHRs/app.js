// https://swapi.dev/api/

/// old method
// const request = new XMLHttpRequest()

// request.onload = function(){
//     console.log("it's Loaded")
//     const data = JSON.parse(this.responseText)
//     console.log(data)
// }

// request.onerror = function(){
//     console.log("ERROR!!!!!")
//     console.log(this)
// }

// request.open("GET","https://swapi.dev/api/people/1/")
// request.send();



//// New Method FETCH

// fetch("https://swapi.dev/api/people/1/")
// .then(res =>{
//     console.log("Resolved",res)
//     return res.json()
// })
// .then(data=>{
//     console.log("Json Done",data)
//     return fetch("https://swapi.dev/api/people/2/")
// })
// .then(res =>{
//     console.log("Resolved")
//     return res.json()
// })
// .then(data=>{
//     console.log("Json DOne",data)
// })
// .catch((e)=>{
//     console.log("ERROR!",e)
// })


//// Async Method

// const loadStarWarsPeople = async()=>{
//     try{
//     const result1 = await fetch("https://swapi.dev/api/people/1/")
//     const data1 = await result1.json()
//     console.log(data1)
//     const result2 = await fetch("https://swapi.dev/api/people/2/")
//     const data2 = await result2.json()
//     console.log(data2)
//     }
//     catch (e){
//         console.log("ERROR!!!",e)
//     }
// }
// loadStarWarsPeople()



/// using Axios


// axios.get("https://swapi.dev/api/people/1/")
// .then((res)=>{
//     console.log("Response:",res.data)
// })
// .catch((e)=>{
//     console.log("ERROR0,e")
// })

// //async 
// const loadStarWarsPeople = async()=>{
//     try{
//         const req = await axios.get("https://swapi.dev/api/people/1/")
//         console.log(req.data)
//     }
//     catch(e){
//         console.log("ERROR!",e)
//     }
// }

// loadStarWarsPeople()


//Setting Headers with Axios

let newJokeBtn = document.querySelector('#newJoke')
let jokes = document.querySelector('#jokes')

async function addNewJoke(){
    let newJoke = await getDadJokes()
    const newLI = document.createElement('li')
    newLI.append(newJoke)
    jokes.append(newLI)
}


const getDadJokes = async()=>{
    try{
        const config = {headers:{Accept: 'application/json',}}
        const req = await axios.get("https://icanhazdadjoke.com/",config)
        return req.data.joke
    }
    catch(e){
        console.log("ERROR!",e)
    }
}

newJokeBtn.addEventListener('click',addNewJoke)

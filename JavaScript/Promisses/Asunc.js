// async function hello(){
// }


// const login = async(username,password) => {
//     if(!username || !password) throw 'Missing Credentials'
//     if(password==='123456') return 'Welcome'
//     throw 'Invalid Password'

// }


// login('trtrtryt','123456')
//     .then(msg =>{
//     console.log("Logged in")
//     console.log(msg)
// })
// .catch(err=>{
//     console.log("Login failed");
//     console.log(err)
// })



///// delayed colour change using Promises

const delayedColorChange = (color,delay) =>{
    return new Promise((resolve,reject)=> {
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve()
        },delay)
    })
}

// delayedColorChange('red',1000)
// .then(()=> delayedColorChange('orange',1000))
// .then(()=> delayedColorChange('yellow',1000))



///// delayed colour change using async and await
async function changeColor() {
    await delayedColorChange('orange',1000)
    await delayedColorChange('yellow',1000)
    return "All Done"
}
changeColor().then(()=>console.log("End of Test"))





























































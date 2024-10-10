const bcrypt = require('bcrypt')

// create a hashed password
// const hashPassword = async(pw)=>{
//     const salt = await bcrypt.genSalt(12)
//     const hash = await bcrypt.hash(pw,salt)
//     console.log(salt)
//     console.log(hash)
// }
//or 
const hashPassword = async(pw)=>{
    const hash = await bcrypt.hash(pw,12)
    console.log(hash)
}

// hashPassword('vishal')


// compare the hased password and entred password
const login = async function(pw,hashedPw){
    const result = await bcrypt.compare(pw,hashedPw)
    if(result){
        console.log("Logged you in! Successful Match")
    }
    else{
        console.log("Wrong Password")
    }
}

login('vishal','$2b$12$KBqdoUTMumDVyTqlEvYu8eadfTK.ww3A3k2BWI0PtHnRqhw7XR62.')
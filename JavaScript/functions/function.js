

function sayHello(){
    console.log("Hi")
    console.log("Hello")
    console.log("There")
}


function greet(name){
    console.log(`Hi, ${name}!`);
}

function getName(firstName,lastName){
    console.log(`Hi my firstName is ${firstName} and lastName is ${lastName}`)
}

function repeat(str,rep){
    let res = ' '
    for(i=0;i<rep;i++){
        console.log(str)
        res = res+str
    }
    console.log(res)
}


function fullName(firstName,lastName){
    return (firstName+' '+lastName)
}


fullName= fullName("vishal","Gharge")
console.log(fullName)
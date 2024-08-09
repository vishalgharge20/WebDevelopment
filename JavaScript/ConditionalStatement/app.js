console.log("Hello");

let num1 = 510;
let num2 = 490;
let total = num1+num2;
console.log(total);


// let rating = 3
// if(rating===3){
//     console.log("You are a SuperStar!")
// }


// let day= "Monday";

// if(day==="Monday"){console.log("I hate Monday!");}
// else if(day==="Saturday"){
//     console.log("I Love Saturday");
// }
// else if(day=="Sunday"){
//     console.log("Sunday!!!")
// }



// const age =75;
// if(age<5){
//     console.log("You are a baby. you get in for Free");
// }
// else if(age<10){
//     console.log("You are a Child. Pay $10")
// }
// else if(age<65){
//     console.log("You are a Adult. Pay $20")
// }
// else if(age>65){
//     console.log("You are a Senior. Pay $10")
// }


// const day = prompt('Enter a day of the week').toLowerCase();

// if(day==='monday'){
//     console.log("I hate Monday")
// }
// else if(day==='saturday'){
//     console.log("I Love Saturday")
// }
// else if(day==='sunday'){
//     console.log("Funday")
// }
// else{
//     console.log("It's a Weekday")
// }



// Nested Conditional Statement

//Password must be 6 charcters long
// Password must not contain any space

// const pass = prompt('Enter Your New Password');

// if(pass.length>=6){
//     if(pass.indexOf(' ')===-1){
//         console.log("Valid Password")
//     }
//     else{
//         console.log("Password cannot contain Space")
//     }
// }
// else{
//     console.log("Password is too Short")
// }


// Logical Operator

// // AND &&
// const pass = prompt('Enter Your New Password');

// if(pass.length>=6 && pass.indexOf(' ')===-1 ){
//     console.log("Valid Password")
// }
// else{
//     console.log("Invalid Password Format")
// }

// // OR ||

// const pass = prompt('Enter Your New Password');

// if(pass.length>=6 || pass.indexOf(' ')===-1 ){
//     console.log("Valid Password")
// }
// else{
//     console.log("Invalid Password Format")
// }

// const age =prompt('Enter age');
// if((age>=0 && age<=5)||age>=65 && age<100){
//     console.log("You get in for Free");
// }
// else if(age>0 && age<=10){
//     console.log("You Pay $10")
// }
// else if((age>0 && age<65) && age<100){
//     console.log("You Pay $20")
// }
// else{
//     console.log("Invalid Age")
// }




// // Switch

const day = parseInt(prompt('Enter a Number'));

switch(day){
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    default:
        console.log("Invalid Number")
}


function makeBetweenFunc(min,max){
    return function(num){
       return num>=min && num<=max
    }
}


function isbetween(num){
    return num>=10 && num<=20
}



const cat = {
    name: 'Belly',
    color: 'grey',
    age: 4,
    meow(){
        console.log("MEOW MEOW Meow")
        console.log(this.name)
    }

}
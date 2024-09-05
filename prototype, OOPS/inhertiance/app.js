class Pets{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    eat(){
        return `${this.name} is Eating`
    }
}


class Dog extends Pets{
    constructor(name,age,gender){
    super(name,age);
    this.gender = gender
}
    bark(){
       return `woof woof`
    }

}

class Cat extends Pets{
    meow(){
        return `meow meow`
     }
 
}
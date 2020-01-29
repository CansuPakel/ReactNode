class Person{
    constructor(name = 'Anonymous', age=0){
        this.name = name;
        this.age = age;
    }
    getGreeting(){
       return `Hi, my name is ${this.name}!`;
    }

    getDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person{
   constructor(name,age,major){
    super(name,age);
    this.major=major;
   }

   //check of a student has a major
   hasMajor(){
       return !!this.major;
   }

   getDescription(){
       let description = super.getDescription();
       if(this.hasMajor()){
        description += `Their major is: ${this.major}`
       }
       return description;
   }
}

class Traveller extends Person{
    constructor(name,age,homeLocation){
        super(name,age);
        this.homeLocation = homeLocation;
    }

    getGreeting(){
        let gretting = super.getGreeting();
        if(this.homeLocation){
            gretting += ` I'm visiting from ${this.homeLocation}`;
        }
        return gretting;
    }
}

//const me = new Student('Cansu Pakel',21, 'ICT');
//console.log(me.getDescription());

//const other = new Student();
//console.log(other.getDescription());


//Challenge
const me = new Traveller('Cansu Pakel',21, 'Gent');
console.log(me.getGreeting());

const other = new Traveller();
console.log(other.getGreeting());
//arguments object => no longer bound 
const add =  (a,b) => {
    //console.log(arguments);gaat niet met arrow
    return a+b;
}
console.log(add(55,1));



//this keyword - no longer bound

const user ={
    name: 'Cansu',
    cities:['Gent','Evergem'],
    printPlaces: function(){ // hier geen arrow function anders zal this.cities niet werken
       console.log( this.name);

       const that = this;
       this.cities.forEach(function (city){
           //this.name werkt niet hier maar met than
           console.log(that.name);
           console.log(city)
       })

       this.cities.forEach( (city) =>{
        //this.name werkt 
        console.log(this.name);
        console.log(city)
    })
    }
};
user.printPlaces();




const user2 ={
    name: 'Cansu',
    cities:['Gent','Evergem'],
    printPlaces(){ 
        return this.cities.map((city)=> this.name + ' and ' + city); //return array
    }
};
console.log(user2.printPlaces());



//Challenge
const multiplier = {
    number:[1,2,3,4],
    multiplyBy: 2,
    multiply(){
       return this.number.map((oneOutArray)=> oneOutArray * this.multiplyBy);
    }
}

console.log(multiplier.multiply())
//OBJECT DESTRUCTER//
const person = {
    name: 'Cansu',
    age: 21,
    location:{
        city:'Gent',
        temp:2 
    }
};

const { name: firstname = 'Anonymous', age} = person; //destructered statement
console.log(`${firstname} is ${age}`);

const { city, temp: temperature} = person.location
if(city && temperature){
    console.log(`${city} is ${temperature} graden`);
}


const book ={
    title: 'Boek1',
    author:'Een auteur',
    publisher:{
         name: 'Maan'
    }
}

const {title, author, publisher} = book;
const {name: publisherName='Zon'} = book.publisher;

if(publisherName){
    console.log(`Title: ${title} Author: ${author} Publisher: ${publisherName}`);
}




//ARRAY DESTRUCTER//
const address = ['desmetstraat','Gent','9000'];
const [street, , zip= '0000'] = address;
console.log(`Odisee: ${street} ${zip}`);



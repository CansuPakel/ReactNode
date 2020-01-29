var nameVar = 'Cansu';
var nameVar = 'Mike';
console.log('nameVar', nameVar);


let nameLet = 'Jen';
nameLet = 'JenTwo';

console.log('nameLet', nameLet);


const nameConst = "ken";
// nameConst = "frank";

console.log('nameConst', nameConst);


//block scoping
const fullName="Cansu Pakel";
let firstName;
if(fullName){
     firstName = fullName.split(' ')[0];
    console.log(firstName);
}

console.log(firstName);

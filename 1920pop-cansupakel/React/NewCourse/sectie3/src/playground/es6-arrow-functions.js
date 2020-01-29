/**const square = function (x) {
    return x * x; 
};**/

function square(x){
    return x * x;
}
console.log(square(3));

//moet een naam hebben
const squareArrow = (x) => {
    return x * x;
};
console.log(squareArrow(4));


const squareArrow2 = (x) => (x * x);
console.log(squareArrow(2));


//Challenges

const getFullname = (firstname) => {
    return firstname.split(' ')[0];
};

const getFullName2 = (firstname) => firstname.split(' ')[0];

console.log("Oef", getFullname('Cansu Pakel'));
console.log("Oef2", getFullName2('Cansu Pakel'));

import { cpus } from "os";

const promise = new Promise((resolve, reject) =>{
    setTimeout(()=>{
      //  resolve({
      //      name:'Cansu',
      //      age:21
      //  });
      //  resolve('This is my other resolved data'); //zal genegeerd worden

      reject('Something went wrong') //we krijgen een js error als je dat niet wilt 
      //moet je een catch hebben bij u promise

    },3000) //3sec
});

console.log('before');

promise.then((data) =>{
    console.log(data)
}).catch((error)=>{
    console.log(error);
});

console.log('after')

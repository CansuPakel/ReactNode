import { setTimeout } from "timers"

const doWorkPromise = new Promise((resolve,reject)=>{
    resolve([7,4,1])
 //   reject('Wrong')
})


//only execute wanneer het goed verloopt
doWorkPromise.then((result)=> {
    console.log('Succes',result)
}).catch((error)=>{
    console.log('Error',error)
})


const add = (a,b) => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve(a + b)
        }, 2000)
    })
}

// add(1,2).then((sum)=>{
//     console.log(sum)
//     add(sum,5).then((sum2) =>{
//         console.log(sum2)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

//Promise chaning new syntax 

add(1,1).then((sum)=>{
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})
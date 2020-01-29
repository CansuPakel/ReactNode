
const names = ['Cansu', 'Test']
const shortNames = names.filter((name)=>{
    return name.length <=3
})

const geocode = (address, callback) => {
    setTimeout(()=>{
        const data = {
            latitude:0,
            longitude:0
        }
        callback(data)
    },2000)
    
}

 geocode('Belgium', (data) =>{
    console.log(data)
 })

const add = (a,b,callback) => {
    setTimeout(()=> {
        callback(a+b)
    },2000)
}

 add(1,4, (sum) => {
     console.log(sum)
 })

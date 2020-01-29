const name = 'Cansu'
const userAge= 21
const user = {
    name,
    age:userAge,
    location: 'Belgium'
}

console.log(user)

//object destructering
const product = {
    label:'Notebook',
    price: 5,
    stock: 20,
    salePrice: undefined,
    rating:4.2
}

const {label: productLabel, stock, rating=5} = product
console.log(productLabel)
console.log(stock)
console.log(rating)

const transaction = (type,{ label,stock =0, price } = {}) => {
   console.log(type,label,stock, price)
}

transaction('order',product)
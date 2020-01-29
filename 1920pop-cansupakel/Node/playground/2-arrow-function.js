import { SIGQUIT, EBADF } from "constants"

const square = function (x) {
    return x * x
}

const square = (x) => {
    return x*x
}

console.log(square(3));


const event = {
    name: 'Birthday',
    guestList: ['Cansu','Test'],
    printGuestList:  () =>{
        console.log('Guest list for' +  this.name)

        this.guestList.forEach(guest => {
            console.log(guest + ' is attending ' + this.name)
        });
    }
}

event.printGuestList();
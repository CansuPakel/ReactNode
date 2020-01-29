const sgMail= require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcome = (email,name) =>{
    sgMail.send({
        to: email,
        from: 'cansupakel6@gmail.com',
        subject: 'Welcome to POP!',
        text:`Yey hello ${name}`
    })
}

const sendCancelation = (email,name) =>{
    sgMail.send({
        to: email,
        from: 'cansupakel6@gmail.com',
        subject: 'Cancel from POP!',
        text:`Bye ${name} :( )`
    })
}



module.exports = {
    sendWelcome,
    sendCancelation
}
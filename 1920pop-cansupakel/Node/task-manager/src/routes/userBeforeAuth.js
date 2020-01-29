const express = require('express')
const router = new express.Router()
const User =require('../modules/user')
const auth = require('../middleware/auth')


router.post('/users', async (req, res)=> {
    const user = new User(req.body)
    try{
        await  user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(error)
    }
})


router.post('/users/login',async (req,res) =>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res )=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        }) //false and removings

        await req.user.save()
        res.send() //200
    }catch (e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res )=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send() //200
    }catch (e){
        res.status(500).send()
    }
})

//only when authenticated
router.get('/users/me', auth , async (req,res) => {
    res.send(req.user)
    // User.find({}).then((users) =>{
    //     res.send(users)
    // }).catch((e) =>{
    //     res.status(500).send() //when db conn is down
    // })
})


router.get('/users/:id', async (req,res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send() //user was not found
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
    // User.findById(id).then((user) =>{
    //     if(!user){
    //         return res.status(404).send() //user was not found
    //     }
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.patch('/users/:id', async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdate = ['name','age','email','password'] //de rest zal een error krijgen
    const isValidOperation = updates.every((updateItem)=>{
        return allowUpdate.includes(updateItem)
    }) 

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        //const id = req.params.id
        //new true, je krijgt meteen de geupdatede versie in user met nieuwe data
        //const user = await User.findOneAndUpdate(id, req.body, { new:true, runValidators:true})
        
        const user = await User.findById(req.params.id)
        updates.forEach((update) =>{
            user[update] = req.body[update]
        })

        await user.save() //middleware zie userschema in user mpdule

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})  


router.delete('/users/:id' , async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
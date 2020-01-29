const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task =require('../models/task')

router.post('/tasks', auth, async (req, res)=> {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})


//stuurt een array terug
//GET /tasks?completed=true
//limit & skip pagination GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth ,async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts =  req.query.sortBy.split(':')
        //desc nieuwste eerst
        //asc eerste eerst
        sort[parts[0]]  = parts[1] === 'desc' ? -1 : 1
    }
    try{
        // const tasks = await Task.find({
        //     owner:req.user._id
        // })
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send() //when db conn is down
    }
})

router.get('/tasks/:id',auth, async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findOne({
            _id,
            owner:req.user._id
        })

        if(!task){
            return res.status(404).send() //user was not found
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})



router.patch('/tasks/:id',auth, async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdate = ['description','completed'] 
    const isValidOperation = updates.every((updateItem)=>{
        return allowUpdate.includes(updateItem)
    }) 

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        
        const task = await Task.findOne({ 
            _id:req.params.id,
            owner: req.user._id
        })

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) =>{ 
            task[update] = req.body[update]
        })

        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})  

router.delete('/tasks/:id',auth , async (req,res) =>{
    try{
        const task = await Task.findOneAndDelete({
          _id:  req.params.id,
          owner:req.user._id
        })

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
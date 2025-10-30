const express =require('express');
const app= express();
app.use(express.json());

let slots=5
let booking =[]
let waiting =[]
app.post('/book',(req,res)=>{
    const {email,name,age}=req.body;
    if(slots===0){
        res.send('Added to waiting list')
        waiting.push({
            email,
            name,
            age
        })
    }
    else{
    booking.push({
        email,
        name,
        age
})
slots--;
res.send('booking confirmed')
    }

})
app.post('/available',(req,res)=>{
    slots++;
    booking.shift();
    if(waiting.length>0){
        const next=waiting.shift();
        booking.push(next)
        slots--;

    }
    res.send('availaible/alloted')
    
})
app.get('/book',(req,res)=>{
    res.json(booking)
})
app.listen(9001,()=>{
    console.log('booking live')
})
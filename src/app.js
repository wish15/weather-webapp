const geocode=require('./utils/geocode.js')
const forcast=require('./utils/weather.js')
const hbs=require('hbs')
const path =require('path')
const express=require('express')
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const app=express()
const publicd=path.join(__dirname,'../public')
const viewsp=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views',viewsp)
app.use(express.static(publicd))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vishal Rochlani'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help:'This is very helpfull... lol ',
        name:'wishcode'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:'Vishal Rochlani'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please enter valid address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
            return res.send({error}) 
        
        forcast(latitude,longitude,(error,forcastData)=>{
            //console.log(latitude,forcastData,error,)
            if(error){
                return res.send({error})
            }
            //res.send("vishal")
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    }
)
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search tearm'
        })
    }
    console.log(req.query.lol)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Help article not found",
        name:"wishcode"
    })
})
app.get("*",(req,res)=>{
    res.render('404',{
        msg:'404',
        title:'Page not found',
        name:'wishcode'
    })
})
app.listen(3000,()=>{
    console.log('Server is up')  
})
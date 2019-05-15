const request=require('request')
const forcast=(long,lati,callback)=>{
    const url='https://api.darksky.net/forecast/682582974b1468fc0668dec75f4dd5f9/'+encodeURIComponent(long)+","+encodeURIComponent(lati)+'?units=si'
    //console.log(url)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("network error",undefined)
        }
        else 
        if(response.body.error){
            callback("unable to trace location",undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees out "+".The high today is"+response.body.daily.data[0].temperatureHigh+" with a low of "+response.body.daily.data[0].temperatureLow+" .There is "+response.body.currently.precipProbability+" % chances of rain"
            )
        }
    })
}
module.exports=forcast
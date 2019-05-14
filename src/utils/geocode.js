const request = require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid2lzaGNvZGUiLCJhIjoiY2p2ZjJzYTU2MmhnODQ0bjN2ZHcwcXhjNiJ9.r8IyTY1oc_lnuB-AVEc98w'
    request({url:url,json:true},(error,responce)=>{
        if(error){
            //console.log("")
            callback('network error',undefined)
        }
        else
        if(responce.body.features.length===0){
            callback('Unable to find address',undefined)
        }
        else{
            
            callback(undefined,{
                latitude:responce.body.features[0].center[1],
                longitude:responce.body.features[0].center[0],
                location:responce.body.features[0].place_name
            })
        }
    })
    //callback()
}
module.exports=geocode
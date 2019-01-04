const request=require('request');

var geocodeAddress=(address,callback)=>{
var uri=encodeURIComponent(address);
request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${uri}`,
    json:true
},(error,response,body)=>{
    if(error || response.statusCode===404){
        callback('Couldnt connect to Google');
    }
    else if(body.status==='ZERO_RESULTS'){
        callback('Try a different address');
    }
    else if(body.status==='OK'){
    callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
    });
    }
})
};


module.exports={
    geocodeAddress
};

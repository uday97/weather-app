const request=require('request');

var getWeather=(lat,lng,callback)=>{
    request({
    url:`https://api.darksky.net/forecast/ce02b70acd07d713419367f6e728dd87/${lat},${lng}`,
    json:true
},(error,response,body)=>{
    if(!error && response.statusCode===200){
    callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
    });
    }
    else{
        callback('Unable to fetch weather');
    }
})
};

module.exports.getWeather=getWeather;
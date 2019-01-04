const yargs=require('yargs');
const axios=require('axios');
const fs=require('fs');

var d=fs.readFileSync('default.json');
d=JSON.parse(d);
if(Object.keys(d).length===0){
    var b=true;
}
else{
    var b=false;
}
const argv=yargs
    .options({
        a:{
            demand:false,
            alias:'address',
            describe:'Address for which weather is to be fetched',
            string:true
        },
        def:{
            demand:b,
            alias:'default',
            describe:'Default address in case of absence of an address',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;
    if(b){
        fs.writeFileSync('default.json',JSON.stringify({address:argv.def}));
        argv.a=argv.def;
    }
    else if(argv.a===undefined && b===false){
        argv.a=d.address;
    }
    //console.log(argv);
var uri=encodeURIComponent(argv.a);
var geocodeUrl=`http://maps.googleapis.com/maps/api/geocode/json?address=${uri}`;
axios.get(geocodeUrl).then((response)=>{
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Try a different address');
    }
    console.log(response.data.results[0].formatted_address);
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    var weatherUrl=`https://api.darksky.net/forecast/ce02b70acd07d713419367f6e728dd87/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature=response.data.currently.temperature;
    var apparentTemperature=response.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature}, feels like ${apparentTemperature}`);
    console.log(`Precipitation probability: ${response.data.currently.precipProbability}`);
    console.log(`Humidity is : ${response.data.currently.humidity}`);
    console.log(`Summary : ${response.data.daily.summary}`);
}).catch((e)=>{
    if(e.code==='ENOTFOUND'){
    console.log('Couldnt connect to API servers');
    }
    else{
        console.log(e.message);
    }
});
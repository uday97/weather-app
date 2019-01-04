const yargs=require('yargs');
const geocode=require('./geocode/geocode')
const weather=require('./weather/weather');

const argv=yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address for which weather is to be fetched',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.a,(errorMsg,results)=>{
    if(errorMsg){
        console.log(errorMsg);
    }
    else{
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errorMsg,weatherResults)=>{
         if(errorMsg){
            console.log(errorMsg);
        }
        else{
            console.log(`Its currently ${weatherResults.temperature}, feels like ${weatherResults.apparentTemperature}`);
        }
    });
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apiKey = "f6260bc38b6bce4d9b9a282a991f6e3a";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
//View engine setup
app.set('view engine', 'ejs');

//Without Middleware
app.get('/', function(req,res) {
    //Rendering index.ejs page
    res.render('index', {weather:null, error:null})

})

app.post('/', function(req, res) {
    let city = req.body.city;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(req.body.city);
    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again.'}) 
            // This info is sent to the index.ejs file
        } 
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render("index", {weather: null, error: 'Error, please try again.'})
            }
            else {
                let weatherText = `It is ${weather.main.temp} degrees Celcius with ${weather.weather[0].main} in ${weather.name}.`
                res.render("index", { weather: weatherText, error: null });
                console.log("body: ", body)
            }
        }
    }) 

})

app.listen(3000, function() {
    console.log('WeatherHeather app listening on port 3000');
})
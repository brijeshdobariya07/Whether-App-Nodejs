const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function (req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "9c30cea312b14aa5bea60ecb3451f518";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on("data",function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const desc = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // console.log("Tempreature : ",temp,"\n","Feels Like : ",feelsLike,"\n","Description : ",desc);
            
            // res.send("<h1>The Tempreture in London is : "+temp+" degree</h1>"); 
            // OR YOU CAN DO
            
            res.write("<img src=" + imageURL + ">");
            res.write("<p>Weather is currently "+ desc + " </p>");
            res.write("<h1>The Tempreture in "+query+" is : "+temp+" degree</h1>");
            res.send();

                    // const object = {
            //     name : "Brijesh",
            //     place : "USA"
            // }
            // console.log(JSON.stringify(object));
        })
    })
    // res.send("Hello Brother");


});

app.listen(3000,function () {
    console.log("Server start at 3000 port");
});








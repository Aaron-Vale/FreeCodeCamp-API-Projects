var express = require('express');
var app = express();

function checkDate(date){
    date= date.toString();
    date= date.replace("%20", " ");
    date= date.replace(",","");
    var dateArr= date.split(" ");
    var letters=dateArr[0].toLowerCase();
    if (letters != "january" && letters != "february" && letters != "march" && letters != "april" && letters != "may" && letters != "june" && letters != "july" && letters != "august" && letters != "september" && letters != "october" && letters != "november" && letters != "december"){
        return false;
    }
    var mid=Number(dateArr[1]);
    var end= dateArr[2];
    var end2= end.replace(/[^0-9]/,"");
    if (end!==end2 || end.length!=4){
        return false;
    }
    end2=Number(end2);
    if (letters==="september" || letters==="april" || letters==="june" || letters==="november"){
        if (mid<1 || mid>30){
            return false;
        }
    }
    else if (letters==="january" || letters==="march" || letters==="may" || letters==="july" || letters === "august" || letters === "october" || letters === "december"){
        if (mid<1 || mid>31){
            return false;
        }
    }
    else if (letters==="february"){
        if (end2%4 ===0){
            if (mid<1 || mid>29){
                return false;
            }
        }
        else if (end2%4 !==0){
            if (mid<1 || mid>28){
                return false;
            }
        }
    }
    return true;   
}

app.get('/', function(req,res){
    res.send('<h1>Usage:<br>/December%2015,%202015<br>/1450137600</h1>');
});

app.get('/:time', function(req,res){
    var time= req.params.time;
    var numCheck= time.replace(/[^0-9]/,"");
    if (numCheck==time){
        time=Number(time);
        var date = new Date(time);
        var month= date.getMonth();
        switch(month){
            case 0:
                month="January";
                break;
            case 1:
                month="February";
                break;
            case 2:
                month="March";
                break;
            case 3:
                month="April";
                break;
            case 4:
                month="May";
                break;
            case 5:
                month="June";
                break;
            case 6:
                month="July";
                break;
            case 7:
                month="August";
                break;
            case 8:
                month="September";
                break;
            case 9:
                month="October";
                break;
            case 10:
                month="November";
                break;
            case 11:
                month="December";
                break;
            default:
                month="null";   
            }
    
        var natural = month + " " + date.getDate() + ", " +  date.getFullYear();
        var object = '{ "unix": '+time+ ', "natural": '+natural+'" }'; 
        res.send(object);
    }
    else if (checkDate(time) === true){
        var natural = time;
        var first = natural[0].toUpperCase();
        var rest="";
        for (var i=1;i<natural.length;i++){
            rest+=natural[i];
        }
        var natural2= first+rest;
        natural2=natural2.replace(",","");
        var arr= natural2.split(" ");
        var month=arr[0];
        switch(month){
            case "January":
                month=0;
                break;
            case "February":
                month=1;
                break;
            case "March":
                month=2;
                break;
            case "April":
                month=3;
                break;
            case "May":
                month=4;
                break;
            case "June":
                month=5;
                break;
            case "July":
                month=6;
                break;
            case "August":
                month=7;
                break;
            case "September":
                month=8;
                break;
            case "October":
                month=9;
                break;
            case "November":
                month=10;
                break;
            case "December":
                month=11;
                break;
            default:
                month="null";   
            }
        var day= Number(arr[1]);
        day--;
        var year= Number(arr[2]);
        var years= year-1970;
        var unix= (years*31556952000)+(month*2592000000)+(day*86400000);
        time=time.replace(" ","%20");
        var object = '{ "unix": '+unix+ ', "natural": '+natural2+'" }'; 
        res.send(object);
    }
    else{
        res.send('{ "unix": null, "natural": null }');
    }
});

app.listen(process.env.PORT || 3000);
var express = require('express');
var app = express();

function checkDate(date){
    date= date.toString();
    date= date.replace("%20", " ");
    var dateArr= date.split(" ");
    var letters=dateArr[0].toLowerCase();
    if (letters != "january" && letters != "february" && letters != "march" && letters != "april" && letters != "may" && letters != "june" && letters != "july" && letters != "august" && letters != "september" && letters != "october" && letters != "november" && letters != "december"){
        return false;
    }
    var mid=dateArr[1];
    if (mid[0] != 0 && mid[0] != 1 && mid[0] != 2 && mid[0] != 3 && mid[0] != 4 && mid[0] != 5 && mid[0] != 6 && mid[0] != 7 && mid[0] != 8 && mid[0] != 9){
        return false;
    }
    if (mid[1] !==","){
        return false;
    }
    var end= dateArr[2];
    var end2= end.replace(/[^0-9]/,"");
    if (end!==end2 || end.length!=4){
        return false;
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
        var day= Number(arr[1].replace(",",""))-1;
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

app.listen(8080, function () {
  console.log('Live on port 8080!');
})
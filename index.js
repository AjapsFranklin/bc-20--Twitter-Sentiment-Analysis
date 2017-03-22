var readLineSync = require('readline-sync');
var tweets = require('twit');
var configFile = require('./twitter-config');
var fs = require('fs');
var stopWords = require('./stopWords');
var storeTweet = require('./output');

var iny = require('readline-sync');

const progress = require('progressbar').create();
progress.setTotal(100);


//To get input from the command Line
var userID = process.argv[2]; //Stores 2nd element passed in the command line
var meData;
if(typeof(userID)==="undefined"){
    userID = readLineSync.question("UserID:   ");//get UserID if it wasn't passed
}


if(userID[0]=="@")//Removes '@' if present
    userID=userID.substring(1,userID.length)

//Call function to validate UserID
if (checkUserID(userID) ===true)
{
    progress.step('1').setTick(10)
    getTweets(userID);
    progress.step('2').setTick(40)
    var tweetObj =extractData();
    progress.step('3').setTick(70)
    wordFrequecy(tweetObj);
    progress.step('4').setTick(90)


}


//TEST for edge cases
AcceptedChar = "^[a-zA-Z0-9\s_]+$";
function checkUserID(userID){
    if(userID === null)
        return console.log("\n invalid input \n");
      else if(userID.length>15)
        return console.log("\n UserID cannot be more than 15 characters \n");
          else if(!(userID.match("^[a-zA-Z0-9\s_]+$")))
            return console.log("\n UserID should only be composed of A-Z, 0-9 and _(underscore) \n");
              else
                return true;
}

//GET Tweets
function getTweets(userID){
    //progress.setTick(20)
    var myTweets = new tweets(configFile)
    var yep;
    /*
    myTweets.get('search/tweets', { q: userID, count: 100 }, function(err, data, response) {
        progress.setTick(70)
        var meData = data.toString();
        */
        userDefined = { q: userID, count: 1000 };
        //q: 'banana since:2011-07-11'

        myTweets.get('search/tweets', userDefined, callback)
        function callback(err, data, response) {
            //extractData(data, userID);
            //Write output to file
        fs.writeFile("output.json", JSON.stringify(data), function(err){
            if(err)
                return console.error(err);
            //console.log(err);
        });

        }

        //data(meData);
        //extractData(data, userID);
        
        
        /*
        //Write output to file
        fs.writeFile("output.json", convData, function(err){
            if(err)
                return console.error(err);
            //extractData(data);
            console.log("File was written successfully");
            console.log(err);
        });
        */
   // });
}


//Extract data from output json file
//function extractData(rawData, userID){
    function extractData(){
    //progress.setTick(90)
    var tweetData = fs.readFileSync('output.json');
    tweetData = JSON.parse(tweetData);
    tweetData = tweetData.statuses;
    var arrayTweet="";

    //Filter tweets and store in a list
    for(i=0; i<tweetData.length; i++){
        if(!(tweetData[i].text.match(RegExp(userID,'gi'))))
            arrayTweet+=" \n "+tweetData[i].text;  
}

/*
  fs.writeFile("output.json", JSON.stringify(rawData), function(err){
            if(err)
                return console.error(err);
        });
        */
        return arrayTweet; 
}

//Function to sort words according to their Frequency
function wordFrequecy(data){
    //progress.setTick(95)
    var obj = stopWords["stopWords"];
        for(i=0; i<obj.length; i++)
        {
            var rExp = '\\s+\\b'+obj[i]+'\\b\\s+';            
            rExp =new RegExp(rExp,'gi');
            data= data.replace(rExp, " ");
        }


        var temp1=[];
        temp1 = data.split(" ");
        objFreq={};
        for(i=0; i<temp1.length; i++){
            count =0;
            if(temp1[i].match('@'))
                continue;
            if(temp1[i].match('\\n'))
                continue;
            if(temp1[i]=='')
                continue;
            for(j=0; j<temp1.length; j++){
                if(temp1[i] === temp1[j])
                    count++;
            }
            objFreq[temp1[i]] = count; 

        }
        console.log(objFreq);  
}
//console.log(meData);

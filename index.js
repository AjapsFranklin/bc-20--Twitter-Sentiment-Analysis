var readLineSync = require('readline-sync');
var tweets = require('twit');
var configFile = require('./twitter-config');
var fs = require('fs');
var stopWords = require('./stopWords');
//var storeTweet = require('./output');

//Progress bar Module
const progress = require('progressbar').create();
progress.setTotal(100);

//User defined criteria for fetching tweets
userDefined = { q: "andelaframky007", count: 100 };

//To get input from the command Line
var userID = process.argv[2]; //Stores 2nd element passed in the command line
var startDate = process.argv[3];
var meData;
var getDate = false;

if(startDate=='undefinded')
    getDate=checkDateFormat(startDate);
    else
        getDate = checkDateFormat(startDate);

//get UserID if it wasn't passed
while(typeof(userID)==="undefined")
    userID = readLineSync.question("UserID:   ");

//get UserID if it wasn't passed
while(getDate==false && (startDate!='y'|| startDate!='y')){
    startDate = readLineSync.question("startTime:   ");
    getDate = checkDateFormat(startDate);
}

//to Check validity of date provided
function checkDateFormat(startDate){
    if(typeof(startDate)!='undefinded'){
        console.log("\n Invalid date format!  valid Date format 2001-11-23 or 'Y' to continue\n" );
        return false;
    
    }
        else if(startDate.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) || startDate.toLowerCase()==="y")
            return true;

            else{
                console.log("\n No input detected! 'Y' to fetch tweets without startDate\n" );
                return false;
            }
}


if(userID[0]=="@")//Removes '@' if present
    userID=userID.substring(1,userID.length)

console.log("\nGetting tweets from "+"@"+userID+" starting from "+ startDate+"\n");

//Call function to validate UserID
if (checkUserID(userID) ===true)
{
    if (getDate && startDate.toLowerCase()!='y'){
        userDefined['q'] = userID + "since:"+startDate;
    }
    else
        userDefined['q'] = userID;

    progress.step('1').setTick(10); //progressBar timer
    getTweets(userID);
    progress.step('2').setTick(40);
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
        myTweets.get('search/tweets', userDefined, callback)
        function callback(err, data, response) {
            
            extractData(data, userID);
            
            
            //Write output to file
        fs.writeFile("output.json", JSON.stringify(data), function(err){
            if(err)
                return console.error(err);
        });
        

        }
}


//Extract data from output json file
    function extractData(data, userID){
        var tweetData = data
        
        if(tweetData==="")
            return console.log("\nCould not get Tweets, make sure you're connected to the Internet \n");
            else{
                tweetData = tweetData.statuses;
                var arrayTweet="";
                //Filter tweets and store in a list
                for(i=0; i<tweetData.length; i++){
                    if(!(tweetData[i].text.match(RegExp(userID,'gi'))))
                        arrayTweet+=" \n "+tweetData[i].text.toLowerCase();
                }
                wordFrequecy(arrayTweet);
                return arrayTweet; 
        }
    }

//Sort words according to their Frequency
function wordFrequecy(data){
    //progress.setTick(95)
    countArray=[];
    var objFreq={};
    data = data.replace(/^\\D/," ");
    var obj = stopWords["stopWords"];
        for(i=0; i<obj.length; i++)
        {
            var rExp = '\\s+\\b'+obj[i]+'\\b';            
            rExp =new RegExp(rExp,'gi');
            data= data.replace(rExp, " ");
        }

        //Filter no word characters in the Tweets
        var temp1=[];
        temp1 = data.split(" ");
        for(i=0; i<temp1.length; i++){
            count =0;
            if(temp1[i].match(/^\d/)) //Exclude white spaces
                continue;
            if(temp1[i].match(/\W/)) //Exclude white spaces
                continue;
            if(temp1[i]=='')  //Exclude empty String
                continue;
            if(temp1[i].match(/[^\w\s]/g,'')) //Exclude non word characters
                continue;
            for(j=0; j<temp1.length; j++){
                if(temp1[i] === temp1[j])
                    count++;
            }
            if(count in objFreq){// if key exists in array
                var temp = objFreq[String(count)];
                var reg = RegExp(temp1[i].toString(), 'g');
                if(!(temp.match(reg)))
                objFreq[String(count)] = temp + ","+temp1[i];
            }
            else{
                objFreq[String(count)] = temp1[i];
                countArray.push(count); 
            }
        }

        
        //OUTPUT result to console
        if(data=="")
            console.log("\nCould not find tweets with  @" + userID+"  userID\n")
            else{
                //Print Top 10 words from the key:value Array
                countArray.sort(function(a,b){return b-a});
                var tenWords = {};
                var countWords = 0;

                for(i=0; i<countArray.length; i++){
                    if(countWords>9) break;
                    var spltWords = objFreq[countArray[i]].split(",");
                    for(j=0; j<spltWords.length; j++){
                        console.log(spltWords[j] +" : " + countArray[i]);
                        countWords++
                        if(countWords>9)break;
                    }
                }

            }
}

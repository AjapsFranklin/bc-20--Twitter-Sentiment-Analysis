var readLineSync = require('readline-sync');
var tweets = require('twit');
var configFile = require('./twitter_config');
console.log(configFile);


//To get input from the command Line
var userID = process.argv[2]; //Stores 2nd element passed in the command line
if(typeof(userID)==="undefined"){
    userID = readLineSync.question("UserID:   ");//get UserID if it wasn't passed
}


//Call function to validate UserID
if (checkUserID(userID) ===true)
{
    getTweets("@"+userID);
}


if(userID[0]="@")
    userID=userID.substring(1,userID.length)

//TEST for edge cases
AcceptedChar = "^[a-zA-Z0-9\s_]+$";
function checkUserID(userID){
    if(userID === null)
        return "invalid input";
      else if(userID.length>14)
        return "UserID cannot be more than 15 characters";
          else if(!(userID.match("^[a-zA-Z0-9\s_]+$")))
            return "UserID should only be composed of A-Z, 0-9 and _(underscore)";
              else
                return true;
}

//GET Tweets
function getTweets(userID){
    var myTweets = new tweets(configFile)

    myTweets.get('search/tweets', { q: 'banana since:2016-07-11', count: 100 }, function(err, data, response) {
    console.log(response);
})



}


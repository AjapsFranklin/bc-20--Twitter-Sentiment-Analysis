var readLineSync = require('readline-sync');
var tweets = require('twit');
var configFile = require('./twitter-config');
var fs = require('fs');
var stopWords = require('./stopWords');
var library = require('./library');
var colors = require('colors');

//Progress bar Module
const progress = require('progressbar').create();
progress.setTotal(100);

//User defined criteria for fetching tweets
userDefined = { q: "andelaframky007", count: 1000 };

//To get input from the command Line
var userID = process.argv[2];
var startDate;
var meData;
var getDate = false;
textJson = {};
var arrayTweet="";

//get UserID if it wasn't passed
while(typeof(userID)==="undefined" || !library.checkUserID(userID)){
  console.log('\n');
  userID = readLineSync.question("UserID:   ");
}


//get StartTime
while(getDate==false){
  console.log('\n');
  startDate = readLineSync.question("startTime:   ");
  getDate = library.checkDateFormat(startDate);
}

//Call function to validate UserID
if (library.checkUserID(userID) ===true)
{
  if (startDate.length>4){
    userDefined['q'] = userID + " since:"+startDate;
  }
  else{
    userDefined['q'] = userID;
  }

  progress.step('1').setTick(10);
  getTweets(userID);
  progress.step('2').setTick(40);
}

//GET Tweets
function getTweets(userID){
  progress.setTick(20)
  var myTweets = new tweets(configFile.twitter_config)
  var yep;
  myTweets.get('search/tweets', userDefined, callback)
  function callback(err, data, response) {
    if(err)
      console.log("Could not connect to twitter service at the moment, check your internet connection and try again".bold.red);            
    else{
      extractData(data, userID);
    }
  }
}


//Extract data from output json file
function extractData(data, userID){
  var tweetData = data
  if(tweetData===""){
    return console.log("\nCould not get Tweets, make sure you're connected to the Internet \n".bold.red);
  }
  else{
    tweetData = tweetData.statuses;
    for(i=0; i<tweetData.length; i++){
      if(!(tweetData[i].text.match(RegExp(userID,'gi'))))
        arrayTweet+=tweetData[i].text.toLowerCase() + " \n ";
        textJson["text"+i] = tweetData[i].text;
    }
    //Write output to file
    fs.writeFile("output.json", JSON.stringify(textJson), function(err){
      if(err){
        return console.error(err);
      }
    });
    wordFrequecy(arrayTweet)
    return arrayTweet; 
  }
}

//Sort words according to their Frequency
function wordFrequecy(data){
  countArray=[];
  var objFreq={};
  data = data.replace(/,/," ");
  data = data.replace(/^\\D/," ");
  var obj = stopWords["stopWords"];
  for(i=0; i<obj.length; i++){
    var rExp = '\\s+\\b'+obj[i]+'\\b';            
    rExp =new RegExp(rExp,'gi');
    data= data.replace(rExp, " ");
  }

  //Filter non word characters in the Tweets
  var temp1=[];
  temp1 = data.split(" ");
  for(i=0; i<temp1.length; i++){
    count =0;
    if(temp1[i].match(/^\d/)){
      continue;
    }
    if(temp1[i].match(/\W/)){
      continue;
    }
    if(temp1[i]==''){
      continue;
    }
    if(temp1[i].match(/[^\w\s]/g,'')){
      continue;
    }
    for(j=0; j<temp1.length; j++){
      if(temp1[i] === temp1[j]){
        count++;
      }
    }
    if(count in objFreq){
      var temp = objFreq[String(count)];
      var reg = RegExp(temp1[i].toString(), 'g');
      if(!(temp.match(reg))){
        objFreq[String(count)] = temp + ","+temp1[i];
      }
    }
    else{
      objFreq[String(count)] = temp1[i];
      countArray.push(count); 
    }
  }

//OUTPUT result to console
  if(data==""){
    if(startDate.length>4){
      console.log(colors.bold.red("\nCould not find tweets from StartTme: "+ startDate +" by  @" + userID+"\n"));
    }
    else{
      console.log(colors.bold.red("\nCould not find tweets by  @" + userID+"  userID\n"));
    }
  }
  else{
    countArray.sort(function(a,b){return b-a});
    var tenWords = {};
    var countWords = 0;
    for(i=0; i<countArray.length; i++){
      if(countWords>9) break;{
        var spltWords = objFreq[countArray[i]].split(",");
      }
      for(j=0; j<spltWords.length; j++){
        console.log(spltWords[j] +" : " + countArray[i]);
        countWords++
        if(countWords>9){
          break;
        }
      }
    }

    //Analysing Tweet sentiments using Alchemy API
    var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1'); 
    var alchemy_language = new AlchemyLanguageV1(configFile.alchemyKey);
    var params = {text: arrayTweet};          
    alchemy_language.sentiment(params, function (err, response) {
      if (err){
        console.log('error:', err);
      }
      else{
        var sentimentInfo = response.docSentiment.type;
        console.log("\n@"+ userID + " average sentiment from tweets is: " + colors.blue(sentimentInfo.toUpperCase()+"\n"));
      }
    });
  }
}

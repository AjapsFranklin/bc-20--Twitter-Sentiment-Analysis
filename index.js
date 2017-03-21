var readLineSync = require('readline-sync');

//To get input from the command Line
var userID = process.argv[2]; //Stores 2nd element passed in the command line
if(typeof(userID)==="undefined"){
    userID = readLineSync.question("UserID:   ");//get UserID if it wasn't passed
}
    else{
        //Call function to validate UserID
    }

if(userID[0]="@")
    userID=userID.subString(1,userID.length)

//TEST for edge cases
AcceptedChar = "^[a-zA-Z0-9\s_]+$";
function checkUserID(userID){
    if(userID === null)
        return "invalid input";
      else if(userID.length>14)
        return "UserID cannot be more than 15 characters";
          else if(userID.match(AcceptedChar))
            return "UserID should only be composed of A-Z, 0-9 and _(underscore)";
}



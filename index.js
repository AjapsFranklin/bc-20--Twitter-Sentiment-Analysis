var readLineSync = require('readline-sync');

//To get input from the command Line
var arg1 = process.argv[2]; //Stores 2nd element passed in the command line
if(typeof(arg1)==="undefined"){
    var userName, password;
    userName = readLineSync.question("UserID:   ");//get UserID if it wasn't passed
}
    else{
        //Call function to validate UserID
        
    }
# bc-20--Twitter-Sentiment-Analyser

## Overview
An app to fetch tweets and analyse them base on the frequency of Word occurrence and mood using Alchemy API  

## Introduction
*  **`Twitter Sentiment Analyser`** is a project for analysing tweets.
*  It has the following features;
  *  Fetching tweets based on userID and/or Start time
  *  saves Tweets t Local Storage
  *  List words based on the frequecy of use in a specified range of tweets
  *  Display the sentiment in the tweets using Alchemy API; sentiment could be:
  *  **POSITIVE**
  *  **NEUTRAL**
  *  **NEGATIVE**

## Dependencies

### This app's functionality depends on Node js packages including;
*  **FS** - This package is necessary for reading and writting files to local storage
*  **twit** - This package is necessary for fetching tweets using Twitter API
*  **readline-syn** - This package is neccessary in getting asynchronous input from console


## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git clone git@github.com/framky007/bc-20--Twitter-Sentiment-Analysis.git`

  *  Using HTTP;

    >`https://github.com/framky007/bc-20--Twitter-Sentiment-Analysis.git'

*  Navigate to the repo's folder on your computer
  *  `cd Twitter-Sentiment-Analysis.git/`
*  Install the console app's dependencies.
  *  `./node_modules/

* Run the app
  *  `node index.js UserID
  *   you will be prompted to input Start Time
  *   where UserID - Twitter User ID and 
  *   StartTime - YYYY-MM-DD *
 ## OR
  *  `node index.js`
  *   You will be promted to supply UserName and Password

  ```
  USERID:
  Start Time:
  ```

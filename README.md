# userauth

- We have created an userauthentication page,that will take the input from user and will protect any other to access it.
> we got to know about a very important node package called dotenv.
```node
npm i dotenv
npm i express mongoose ejs 
npm i mongoose-encryption




 ```
 - Then we will create a file in our folder `.env` and will store the information that we donot want to share like the API_KEY , our ID's etc.
 - DONOT Add the files to the github as .env is for storing personnal information :- we use gitignore to ignore that file.
 - added files and to access it in application `app.js` we need `console.log(process.env.API_KEY); ` .
 - [https://www.npmjs.com/package/dotenv] (is the exact resource of dotenv package.)
 ***
- [https://github.com/github/gitignore/blob/master/Node.gitignore] (files included for git_ignore.) 
***
 
 - In javascript the code should start from adding the following code.
 ```javascript 

require('dotenv').config();

const express = require("express");
const ejs = require ("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption"); // npm i mongoose-encryption

 
 ```
 
 ## MONGOOSE-ENCRYPTION
- This is done to save the user-entered  data from the stealing by adding layer of encrytion over it.
- [https://www.npmjs.com/package/mongoose-encryption] (click here  for package resources) 
- also read about plugins in this.


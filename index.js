const express = require('express');
const PORT = 4848;

const app = express();

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error listening to the server");
    }
    else{
        console.log(`Listening to the server at ${PORT}`);
    }
})
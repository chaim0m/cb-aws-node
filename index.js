let withAverage = require("./queries/utils").withAverage
let operations = require("./queries/operations")



console.log("Starting index.js")
//running this file will return these 3 users with the time of each call (on same object) and average
operations.getUsersByIds([1,11,111]).then((users) => {  //this function split into 2 functions "getUsersByIds" and "withAverage" mainly for testing purposes
    return withAverage(users)
})

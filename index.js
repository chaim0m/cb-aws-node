let wrappedDb = require("./queries/utils")



console.log("Starting index.js")
wrappedDb.callWrapper('getUsersByIds', [1,11,111])


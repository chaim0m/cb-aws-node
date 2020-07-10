let operations = require("./operations")
let util = require("util")

const  callWrapper = async (callOperation, doc) => {
    console.log("inside wrapped function")
    let startTime = Date.now()
    let func = operations[callOperation]
    let res = await func(doc)
    let totalTime = Date.now() - startTime
    console.log("total time for operation: "+ totalTime)
    let ages = []
    let average
    let returnWithTimes = res.map(r => {
        if (r && r.res && r.res.value && r.res.value.age){
            ages.push(r.res.value.age)
        } else {
            average = new Error("Age not present in some documents")
        }
        return {
            user: r.res.value,
            time: `${r.time}ms`
        }
    })
    console.log("returnWithTimes: "+returnWithTimes)
    if (typeof average !== 'Error'){
        average = ages.reduce((total, next) => total + next, 0) / ages.length;
    }
    console.log("returnWithTimes: "+ util.inspect(returnWithTimes))
    console.log("averageAge: "+average)
    return returnWithTimes, average
}

module.exports = { callWrapper }
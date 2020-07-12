const  withAverage = (users) => {
    let ages = []
    let average = 0
    let missingUser = false
    users.map((userWtime) => {
        if (!userWtime){
            missingUser = true
            return
        }
        if (userWtime.user && userWtime.user.age) {
            ages.push(userWtime.age)
            return
        }
        average = new Error("Age not present in some documents")  // not throwing error to allow return of users in case of missing age on some users
    })
    if (typeof average === 'number'){
        average = ages.reduce((total, next) => total + next, 0) / ages.length;
    }
    if (missingUser){
        throw new Error("Some of the user keys do not exist")  //assumption is that if a user is missing an error needs to be thrown as this is a critical issue
    }
    return {
        users,
        average
    }
}

module.exports = { withAverage }
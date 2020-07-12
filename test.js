const withAverage =  require("./queries/utils").withAverage

const expect = require('chai').expect
const operations = require("./queries/operations")
 // the tests require the db to be connected as a dependancy
// todo create unit tests as well without dependancy

    describe('getUsersByIds', () => {
        it('gets the correct number of users and average', (done) => {  //pass
            let testArr = [1,11,111]
            operations.getUsersByIds(testArr)
                .then((users) => {
                    expect(users).to.be.an('array');
                    expect(withAverage(users).average).to.be.a('number');
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('some of the users are missing', (done) => {  //fail
            let testArr = [1,300,11] //300 does not exist
            operations.getUsersByIds(testArr)
                .then((users) => {
                    expect(users.length).to.equal(testArr.length);
                    expect(withAverage(users).average).to.be.a('number');
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('some of the users do not have an age property', (done) => {  //fail
            let testArr = [1,10,11] //10 does not have age
            operations.getUsersByIds(testArr)
                .then((users) => {
                    expect(users.length).to.equal(testArr.length);
                    expect(withAverage(users).average).to.be.a('number');
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })




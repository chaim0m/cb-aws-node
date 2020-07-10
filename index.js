const couchbase = require("couchbase");
require('dotenv').config()

const cluster = new couchbase.Cluster(process.env.DB_URL, {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});

const bucket = cluster.bucket("users");
const collection = bucket.defaultCollection();


 const  callWrapper = async (callFunc, doc) => {
    let startTime = Date.now()
    let res = await callFunc(doc)
     if (res !== 'OK'){
         return res, 0
     }
    let totalTime = Date.now() - startTime
     console.log(res, totalTime)
     return res, totalTime
}

const upsertDocument = async (doc) => {
     let err = null
    try {
        const key = `${doc.type}:${doc.user_id}`;
        const result = await collection.upsert(key, doc);
        // console.log("Upsert Result: ");
        // console.log(result);
        return 'OK'
    } catch (error) {
        err = error
        return err
    }
};

const user1 = {
    user_id: '111',
    user_name: 'James Bond',
    age: '007',
    type: "user"
}
callWrapper(upsertDocument, user1)
// upsertDocument(user1).then(() => console.log("successfully upserted document"))
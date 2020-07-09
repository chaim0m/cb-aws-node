const couchbase = require("couchbase");

const cluster = new couchbase.Cluster("ec2-18-184-111-89.eu-central-1.compute.amazonaws.com:8091", {
    username: "chaim",
    password: "123456",
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
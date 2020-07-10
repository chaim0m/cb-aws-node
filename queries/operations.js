let db = require("../db")
const BUCKET = "users"
const TYPE = "user"
let util = require("util")

const upsert = async (doc) => {
    try {
        const key = `${doc.type}:${doc.user_id}`;
        const result = await db.collection.upsert(key, doc);
        return 'OK'
    } catch (error) {
        return error
    }
}
const getUsersByIds =  (userIds) => {
    return Promise.all(userIds.map(userId => {
        return getUserByKey(userId).catch(err => console.log(`${err} - get failed for user ID ${userId}`))
    })).catch(err => new Error("get failed for all documents: "+err))
}

const getUserByKey =  (id) => {
    let docKey = getDocKey(id, TYPE)
        console.log("getting user by key: "+docKey)
        let startTime = Date.now()
        const result =  db.collection.get(docKey).then(res => {
            let totalTime = Date.now() - startTime
            return {
                res,
                time: totalTime
            }
        })
    return result
};

const getDocKey = (id, bucket) => `${bucket}:${id}`

module.exports = { getUsersByIds, getUserByKey}

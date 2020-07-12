let db = require("../db")
const BUCKET = "users"
const TYPE = "user"

const upsert = async (doc) => {  //used to insert data from here
    try {
        const key = `${doc.type}:${doc.user_id}`;
        const result = await db.collection.upsert(key, doc);
        return 'OK'
    } catch (error) {
        return error
    }
}
const getUsersByIds =  async (userIds) => {
    try {
        let users =  await Promise.all(userIds.map(userId => {   //parallel calls to db
            return getUserByKey(userId).catch(err => console.log(`${err} - get failed for user ID ${userId}`))
        }))
        return users
    } catch(error) {
        throw error
    }


}

const getUserByKey =  (id) => {
    let docKey = getDocKey(id, TYPE)
        console.log("getting user by key: "+docKey)
        let startTime = Date.now()
        const result =  db.collection.get(docKey).then(res => {
            let totalTime = Date.now() - startTime
            return {
                user: res.value,
                time: totalTime
            }
        })
    return result
};

const getDocKey = (id, bucket) => `${bucket}:${id}`

module.exports = { getUsersByIds, getUserByKey}

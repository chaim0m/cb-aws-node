const couchbase = require("couchbase");
require('dotenv').config()
// let util = require("util")

const cluster = new couchbase.Cluster(process.env.DB_URL, {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});
// console.log("cluster"+util.inspect(cluster))
const bucket = cluster.bucket("users");
const collection = bucket.defaultCollection();

module.exports = {
    collection
}


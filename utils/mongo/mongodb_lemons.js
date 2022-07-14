const {
    MongoClient,
    ServerApiVersion
} = require('mongodb')

const dbUrl = "mongodb+srv://user_wenxiu:TPS,1780200@cluster0.ovqc2.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'lemons'
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main(collectionName) {
    await client.connect();
    const db = client.db(dbName)
    const collection = await db.collection(collectionName)
    return collection
}

// 模糊搜索
async function findBookDataOne(collectionName,searchName) {
    const str = `${searchName}`
    const res  = new RegExp(str)
    var result = await main(collectionName)
        .then((collection) => {
            return collection.find({
                $or:[{bookName:{$regex:res}},{author:{$regex:res}}],
                
            },{projection:{_id:0}}).limit(3).toArray()
        })
        .then(value => {
            console.log(value, "查询成功")
            return value
        })
    return result
}

//查詢集合裏符合條件的文檔
async function findOneBook(collectionName,bookName) {
    var result = await main(collectionName)
        .then(collection => {
            return collection.findOne({
                bookName
            })
        })
        .then(value => {
            console.log(value, "全部查询成功")
            return value
        })
    return result
}

//查询集合里的所有数据
async function findDataAll(collectionName) {
    var result = await main(collectionName)
        .then(collection => {
            return collection.find({}).toArray()
        })
        .then(value => {
            console.log(value, "全部查询成功")
            return value
        })
    return result
}

//往集合里插入数据
async function insertData(collectionName,username, province) {
    var result = await main(collectionName)
        .then(collection => {
            collection.insertOne({
                username,
                province
            })
        })
        .then(value => {
            console.log(value, "插入成功")
            return value
        })
    return result
}

//删除集合里的指定数据
async function deleteData(collectionName,username) {
    var result = await main(collectionName)
        .then(collection => {
            collection.deleteOne({
                username
            })
        })
        .then(value => {
            console.log(value, "删除成功")
            return value
        })
    return result
}

// 登錄
async function Login(username,password) {
    var result = await main("user")
        .then((collection) => {
            return collection.findOne({
                username,
                password
            })
        })
        .then(value => {
            console.log(value, "登錄成功")
            return value
        })
    return result
}
//注冊
async function register(username,password,PhoneNumber) {
    var result = await main("user")
        .then((collection) => {
            return collection.insertOne({
                username,
                password,
                PhoneNumber
            })
        })
        .then(value => {
            console.log(value, "注冊成功")
            return value
        })
    return result
}
// 是否存在此用戶
async function isNewUser(PhoneNumber) {
    var result = await main("user")
        .then((collection) => {
            return collection.findOne({
                PhoneNumber
            })
        })
        .then(value => {
            console.log(value)
            return value
        })
    return result
}

module.exports = {
    findBookDataOne,
    findDataAll,
    insertData,
    deleteData,
    Login,
    register,
    isNewUser,
    findOneBook
}
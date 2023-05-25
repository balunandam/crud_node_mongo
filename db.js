const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectId;
const dbname = "crud_mongodb";
const url = "mongodb+srv://employee_db:valAy9yveaE95Sgw@cluster0.j7g74q9.mongodb.net/crud_mongodb";
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology: true};

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err){
                cb(err);
            } 
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect};
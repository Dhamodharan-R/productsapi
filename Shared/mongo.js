const {MongoClient} = require("mongodb");

const client = new MongoClient(process.env.URLM);

module.exports = {
    db : null ,
    async connect () {
        await client.connect();
        console.log(`Connected to url ${process.env.URLM}`);
        this.db = client.db(process.env.DBNAME);
        console.log(`Selected to database ${process.env.DBNAME}`)
    }
}
const {MongoClient} = require("mongodb");

const DBNAME="products"
const URLM="mongodb+srv://dbUser:admin123@cluster0.82h79.mongodb.net"

const client = new MongoClient(URLM);

module.exports = {
    db : null ,
    async connect () {
        await client.connect();
        console.log(`Connected to url ${URLM}`);
        this.db = client.db(DBNAME);
        console.log(`Selected to database ${DBNAME}`)
    }

}

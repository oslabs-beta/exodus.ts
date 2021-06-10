import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.23.1/mod.ts"

console.log('you better be runnin')

const client = new MongoClient();

await client.connect({
  db: "wastelessv2",
  tls: true,
  servers: [
    {
      host: "cluster0-shard-00-01.qtvtv.mongodb.net",
      port: 27017,
    },
  ],
  credential: {
    username: "miguelg",
    password: "codesmith",
    db: "wastelessv2",
    mechanism: "SCRAM-SHA-1",
  },
});

// await client.connect("mongodb+srv://miguelg:codesmith@cluster0.qtvtv.mongodb.net/wastelessv2?retryWrites=true&w=majority");

const db = client.database('wastelessv2')


await db.collection('food').updateOne({item:'whiskey'}, {$set:{price:1600}})
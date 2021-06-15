import { Bson, MongoClient } from "../../deps.ts"
import { dbConfig } from "../../setup.ts"

export const databaseConfig = {

  async connect() {
    //grab the properties from the exported dbconfig obj to pass into connect
    const url:string = dbConfig.servers[0].host;
    const dbName:string = dbConfig.dbName;
    const tls:boolean = dbConfig.tls;
    const port:number = dbConfig.servers[0].port;
    const user:string = dbConfig.credential.user;
    const pw:string = dbConfig.credential.pw;
    
    
    const client = new MongoClient();
    
    //initate the connection with MongoDb
    await client.connect({
      db: dbName,
      tls: tls,
      servers: [
        {
          host: url,
          port: port,
         },
      ],
      credential: {
        username: user,
        password: pw,
        db: dbName,
        mechanism: "SCRAM-SHA-1"   
      },
    })

    const db = client.database(dbName);
    return {client, db}
  }
}
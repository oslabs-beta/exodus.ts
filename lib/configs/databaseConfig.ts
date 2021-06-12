import { Bson, MongoClient } from "../../../deps.ts"
import { dbConfig } from "../templates/setup.ts"

export const databaseConfig = {

  async connect() {
    //grab the properties from the exported dbconfig obj to pass into connect
    const url = dbConfig.servers.host;
    const dbName = dbConfig.dbName;
    const tls = dbConfig.tls;
    const port = dbConfig.servers.port;
    const user = dbConfig.credential.user;
    const pw = dbConfig.credential.pw;
    const mechanism = dbConfig.credential.mechanism;
    
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
        mechanism: mechanism,
      },
    })

    const db = client.database(dbName);
    
    return {client, db}
  }
}
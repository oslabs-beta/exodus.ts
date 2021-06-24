import { Bson, MongoClient } from "../../deps.ts"


export const databaseConfig = {

  async connect( normal:string = 'normal') {
    let data:any
    if (normal==='normal') {
      data = await import('file://'+ Deno.cwd()+'/setup.ts');
    } if (normal==='test') {
      data = await import('file://'+ Deno.cwd()+'/setupTest.ts');
    } if (normal==='extract') {
      data = await import('file://'+ Deno.cwd()+'/setupExtract.ts');
    } if (normal==='apply') {
      data = await import('file://'+ Deno.cwd()+'/setupApply.ts');
    }

    const dbConfig = data!.dbConfig;
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
    return {client, db, dbName}
  }
}
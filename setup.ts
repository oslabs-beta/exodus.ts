export const dbConfig = {

 // REPLACE with your database name
  dbName: "wastelessv2",

  // Only edit this when really necessary.
  tls: true,

  servers: [
    {
      // REPLACE with your cluster url 
      host: "cluster0-shard-00-01.qtvtv.mongodb.net",

      // Only edit this when really necessary.
      port: 27017,
    },
  ],

  credential: {
    // REPLACE with your username, password, and database name
    user: "miguelg",
    pw: "codesmith",
    db: "wastelessv2",
    // Only edit this when really necessary.
    mechanism: "SCRAM-SHA-1",
  },
};




// export const dbConfig = {

//   // REPLACE with your database name
//    dbName: "wastelessv2",
 
//    // Only edit this when really necessary.
//    tls: true,
 
//    servers: [
//      {
//        // REPLACE with your cluster url 
//        host: "<mongodb-cluster-url>",
 
//        // Only edit this when really necessary.
//        port: 27017,
//      },
//    ],
 
//    credential: {
//      // REPLACE with your username, password, and database name
//      user: "<username>",
//      pw: "<pw>",
//      db: "<dbname>",
//      // Only edit this when really necessary.
//      mechanism: "SCRAM-SHA-1",
//    },
//  };
 
 
 



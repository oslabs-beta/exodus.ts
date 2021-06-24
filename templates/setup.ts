export const dbConfig = {

  // REPLACE with your database name
   dbName: "<database name>",

   // Only edit this when really necessary.
   tls: true,

   servers: [
     {
       // REPLACE with your Primary cluster url
       // Be sure its PRIMARY. Secondary will not work
       host: "<mongodb-cluster-url>",

       // Only edit this when really necessary.
       port: 27017,
     },
   ],

   credential: {
     // REPLACE with your username, password, and database name
     user: "<username>",
     pw: "<pw>",
     db: "<dbname>",
     // Only edit this when really necessary.
     mechanism: "SCRAM-SHA-1",
   },
 };






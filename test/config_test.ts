// tests for invalid inputs in config settings.
// deno test --unstable --allow-read --allow-write --allow-net test/config_test.ts

import { assert, assertEquals } from "../deps.ts"
import { dbConfig } from "../setup.ts"; // change to setupTest.ts to test the testing setup config and add false as an argument to databaseConfig.connect() => databaseConfig.connect(false)
import { databaseConfig } from "../lib/configs/databaseConfig.ts"

Deno.test('cluster URL',()=>{
   assert(typeof dbConfig.servers[0].host==='string', 'Url should be a string');
   assert(dbConfig.servers[0].host.includes('mongodb.net'), "should include 'mongodb.net' - example: cluster0-shard-12-34.1ov9s.mongodb.net");
   assert(dbConfig.servers[0].host.includes('cluster'), "should include 'cluster' - example: cluster0-shard-12-34.1ov9s.mongodb.net");
})

Deno.test('Database name',()=>{
   assert(typeof dbConfig.dbName==='string', 'Database name is not a string' );
   assert(dbConfig.dbName===dbConfig.credential.db, 'Database name is not a string' )
})

Deno.test('TLS',()=>{
   assert(typeof dbConfig.tls==='boolean','tls should be a boolean');
})

Deno.test('Server Port',()=>{
   assert(typeof dbConfig.servers[0].port==='number', 'Port should be a number, default is 27017');
})

Deno.test('Username',()=>{
   assert(typeof dbConfig.credential.user === 'string', 'Username should be a string');
})

Deno.test('Password',()=>{
   assert(typeof dbConfig.credential.pw === 'string', 'Password should be a string');
})

try {
   const connect= await databaseConfig.connect()
   .then( ({ client,db }) => {
     return {client,db};
   });
   Deno.test('Successful connection', ()=>{
      assert(connect, 'Connection was unsuccessful, check if settings are correct')
   })
 }
 catch(err) {
  Deno.test('Successful connection', ()=>{
   assert(false, 'Connection was unsuccessful, check if settings are correct')
})
 }




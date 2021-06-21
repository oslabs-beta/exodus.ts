// // deno test --unstable --allow-read --allow-write --allow-net test/cli_test.ts

import { assert, assertEquals, existsSync,resolve } from "../deps.ts"
import {log} from "../lib/actions/log.ts"
import {fullForward} from "../lib/actions/fullForward.ts"
import {history} from "../lib/actions/history.ts"
import { databaseConfig } from "../lib/configs/databaseConfig.ts";

// WARNING: Before running any tests change server settings to test server.


const test = Deno.test
// Deno.test("Returns an array", async () => {
//    const connect= await databaseConfig.connect()
//       .then( ({ client,db }) => {
//         return {db};
//       })
      
//       return assert(Array.isArray(log(connect.db)))   
//  });

// no beforeall statemnets, have to create connection objects before running tests
const connect= await databaseConfig.connect(false)
      .then( ({ client,db }) => {
        return {client,db};
      })

// const migrate=await log(connect.db)      
// console.log(migrate)



test('Log.ts output is array', async()=>{
   const migrate = await log(connect.db)
   assert(Array.isArray(migrate), 'Is not returning an array')
   
})

// Deno.test('Forward returns an array',()=>{

//   let ham='fat'
//   assertEquals(ham,'fat')
// })

Deno.test('fullForward returns an array', async ()=>{

  const migrate = await fullForward(connect.client,connect.db)
  assert(Array.isArray(migrate), 'Is not returning an array')
})

// Deno.test('Back returns an array',()=>{

//   let ham='fat'
//   assertEquals(ham,'fat')
// })



test('History function creates testLog.txt', async ()=>{
  
  let fileExists = existsSync(resolve(Deno.cwd(),'testLog.txt'))
  if (fileExists) Deno.removeSync(resolve(Deno.cwd(),'testLog.txt'));
  
  const log = ['2021_06_20_15_19_22_testMigration.ts']
  history(log,'direction','testLog.txt')
  fileExists = existsSync(resolve(Deno.cwd(),'testLog.txt'))

  assert(fileExists,'File does not exist')

  Deno.removeSync(resolve(Deno.cwd(),'testLog.txt'));
}
)
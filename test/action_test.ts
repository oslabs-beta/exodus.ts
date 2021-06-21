// // deno test --unstable --allow-read --allow-write --allow-net test/cli_test.ts

import { assert, assertEquals, existsSync,resolve } from "../deps.ts"
import {log} from "../lib/actions/log.ts"
import {fullForward} from "../lib/actions/fullForward.ts"
import {history} from "../lib/actions/history.ts"
import { databaseConfig } from "../lib/configs/databaseConfig.ts";
import { fwd } from "../lib/actions/fwd.ts";
import { back } from "../lib/actions/back.ts";

// WARNING: Before running any tests change server settings to test server.


const test = Deno.test

// no beforeall statements, have to create connection objects before running tests

const connect= await databaseConfig.connect(false)
      .then( ({ client,db }) => {
        return {client,db};
      })

test('Log.ts output is array', async()=>{
   const migrate = await log(connect.db)
   assert(Array.isArray(migrate), 'Is not returning an array')
   
})

test('fwd returns an array', async ()=>{

  const fwdArray = await fwd(connect.client,connect.db)
  assert(Array.isArray(fwdArray), 'Is not returning an array')
})

test('fullForward returns an array', async ()=>{

  const fullArray = await fullForward(connect.client,connect.db)
  assert(Array.isArray(fullArray), 'Is not returning an array')
})

test('Back returns an array', async ()=>{

  const backArray = await back(connect.client,connect.db)
  assert(Array.isArray(backArray), 'Is not returning an array')
})



test('History function creates and writes to testLog.txt', async ()=>{
  
  let fileExists = existsSync(resolve(Deno.cwd(),'testLog.txt')) // checks if testLog.txt exists and if it does, deletes it prior to test
  if (fileExists) Deno.removeSync(resolve(Deno.cwd(),'testLog.txt'));
  
  const log = ['2021_06_20_15_19_22_testMigration.ts']
  history(log,'direction','testLog.txt')  // should create a testLog.txt with the contents of the 'log' variable

  fileExists = existsSync(resolve(Deno.cwd(),'testLog.txt')) // returns true if testLog.txt was created
  assert(fileExists,'File does not exist')

  const text:string = Deno.readTextFileSync(resolve(Deno.cwd(),'testLog.txt')) // reads testLog.txt
  assert(text.includes(log[0]), 'migration performed was not written to testLog.txt') 

  Deno.removeSync(resolve(Deno.cwd(),'testLog.txt'));
}
)
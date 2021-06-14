// deno run --unstable --allow-read --allow-write

// need to import cliffy
import { Command } from "./deps.ts";
import {init} from './lib/actions/init.ts'
import {create} from './lib/actions/create.ts'
import { databaseConfig } from './lib/configs/databaseConfig.ts'
import {fwd} from './lib/actions/fwd.ts'
import {back} from './lib/actions/back.ts'
import { log } from './lib/actions/log.ts'

const program = new Command();

// create commands for each action initializing program for each

//init
program
  .command('init')
  .description('initialize a new Exodus migration project')
  .action(()=>{
    init()
    .then(()=>{
      console.log('New Exodus migration initialized')
    })
  })



//create
program
  .command('create [commitMessage:string]')
  .description('create a new migration file for the current database')
  .action((commitMessage:string) => {
    create(commitMessage)

  })


//forward
program
  .command('fwd')
  .description('migrates data up')
  .action(()=>{
    //connect to database here
    databaseConfig.connect()
      .then(({client, db}) => {
       return fwd(client, db);
      })
      .then(migrated=>{
        migrated.forEach(ele=>console.log('Migrated the following forward: ' + ele));
        Deno.exit();
      })
      .catch(err=> console.log(err + ' : ERROR somewhere in forward'))
  })

//back
program
  .command('back')
  .description('migrates data down')
  .action(()=>{
    //connect to database here
    databaseConfig.connect()
      .then(({client, db}) => {
       return back(client, db);
      })
      .then(reverted=>{
        console.log('Migrated the following back: ' + reverted);
        Deno.exit();
      })
      .catch(err=> console.log(err + ' : ERROR somewhere in back'))
  })


//log
program
.command('log')
  .description('lists current migration log')
  .action(()=>{
    // connect to database
    databaseConfig.connect()
    .then(({db})=>{
      return log(db)
    })
    .then((logStatus) => {console.log('Here is the current migration log: ',logStatus)})
  })
  .parse(Deno.args); // parses the user input of all commands


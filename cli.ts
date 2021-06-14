// deno run --unstable --allow-read --allow-write 

// need to import cliffy
import { Command } from "./deps.ts";
import {init} from './lib/actions/init.ts'
import {create} from './lib/actions/create.ts'
import { databaseConfig } from './lib/configs/databaseConfig.ts'
import {fwd} from './lib/actions/fwd.ts'
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
  .command('forward')
  .description('migrates data up')
  .action(()=>{
    //connect to database here
    databaseConfig.connect()
      .then(({client, db}) => {
       return fwd(client, db);
      })
      .then(migrated=>{
        console.log('Migrated the following FWD ' + migrated);
        Deno.exit();
      }) 
      .catch(err=> console.log(err + ' : ERROR somewhere in forward'))
  })
  .parse(Deno.args); // may have to move this to the end. parsing still works on previous commands though
//back
program
  .command('back')
  .description('migrates data down')
  .action(()=>{
    console.log('Back not implemented yet')
  })

//log
program
.command('log')
  .description('lists current migration log')
  .action(()=>{
    //connect to database
    // databaseConfig.connect()
    // .then(({db})=>{
    //   log(db)
    // })
    // .then((logStatus))

  })

// program
//   .command('order <pizza:string>', 'ordering pizza')
//   .option('-c, --cheese [type:string]', 'type of cheese', {default: 'mozarella'})
//   .option('-s, --sauce [sauce:string]', 'type of sauce', {required:true})
//   .option('-m, --meat [type:string]', 'meat topping')
//   .action((options:any, pizza:string)=>{
//     console.log(`Your ${pizza} has ${options.cheese} ${options.sauce} ${options.meat}`);
//   })
//   .parse();
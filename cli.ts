// need to import cliffy
import { Command } from "./deps.ts";
import init from './lib/actions/init.ts'
import create from './lib/actions/create.ts'


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
    
  
  })
//forward
.command('forward')
  .description('migrates data up')
  .action(()=>{
    console.log('Forward not implemented yet')

  })

//back
.command('back')
  .description('migrates data down')
  .action(()=>{
    console.log('Back not implemented yet')
  })

//log
.command('log')
  .description('lists current migration log')
  .action(()=>{
    console.log('Log not implemented yet')
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
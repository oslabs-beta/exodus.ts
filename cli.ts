// deno run --unstable --allow-read --allow-write --allow-net cli.ts
import { Command, Table } from "./deps.ts";
import { init } from "./lib/actions/init.ts";
import { dbInit } from './lib/actions/dbInit.ts'
import { create } from "./lib/actions/create.ts";
import { databaseConfig } from "./lib/configs/databaseConfig.ts";
import { fwd } from "./lib/actions/fwd.ts";
import { back } from "./lib/actions/back.ts";
import { log } from "./lib/actions/log.ts";
import { fullForward } from "./lib/actions/fullForward.ts";
import { history } from './lib/actions/history.ts';
import { dbExtract } from "./lib/actions/dbExtract.ts";
import { dbApply } from "./lib/actions/dbApply.ts";

const program = new Command();

// create commands for each action initializing program for each

//init
program
  .command("init [test:string]")
  .description("initialize a new Exodus migration project")
  .action(() => {
    //run the functionality of the init file
    // if you pass in 'test' after init, it'll instead create a seperate setupTest.ts file that the tests use
    init()
      .then(() => {
        console.log("New Exodus migration initialized");
      });
  });

//full db migration init
program
  .command("dbInit")
  .description("initialize a new Exodus FUll database migration project")
  .action(() => {
    //run the functionality of the dbInit file
    dbInit()
      .then(() => {
        console.log("New Exodus FUll database migration initialized");
      });
  });


//create
program
  .command("create [commitMessage:string]")
  .description("create a new migration file for the current database")
  .action((commitMessage: string) => {
    //run the functionality of the create file
    create(commitMessage);
  });

//forward
program
  .command("fwd")
  .description(" migrates data up")
  .action(() => {
    //connect to database here
    databaseConfig.connect()
      .then(({ client, db }) => {
        //run the functionality of the fwd file
        return fwd(client, db);
      })
      .then((migrated) => {
        //show a list of the upgraded migrated files
        migrated.forEach((ele: any) =>
          console.log("Migrated the following forward: " + ele)
        );
        history(migrated, 'Forward');
        Deno.exit();
      })
      .catch((err) => console.log(err + " : ERROR somewhere in forward"));
  });
// extract
program
.command("extract")
.description("extracts data")
.action(() => {
  //connect to database here
  databaseConfig.connect('extract')
    .then(({ client, db, dbName }) => {
      //run the functionality of the extract file
      dbExtract(db, dbName);
      console.log('Exodus Success: Database extracted')
  
    })
    .catch((err) => console.log(err + " : ERROR somewhere in extract"));
  })
    
//apply 
program
.command("apply [keepId:string]")
.description("applies data")
.action(() => {
  //connect to database here
  databaseConfig.connect('apply')
    .then(async ({ client, db, dbName }) => {
      //run the functionality of the dbApply file
       await dbApply(db);
       console.log('Exodus Success: Database migration applied!')
    })
    .catch((err) => console.log(err + " : ERROR somewhere in apply"));
  })
    
//full forward
program
  .command("full")
  .description("fully migrates data up")
  .action(() => {
    //connect to database here
    databaseConfig.connect()
      .then(({ client, db }) => {
        //run the functionality of the fwd file
        return fullForward(client, db);
      })
      .then((migrated) => {
        //show a list of the upgraded migrated files
        migrated.forEach((ele: any) =>
          console.log("Migrated the following forward: " + ele)
        );
        history(migrated, 'Full');
        Deno.exit();
      })
      .catch((err) => console.log(err + " : ERROR somewhere in full forward"));
  });

//back
program
  .command("back")
  .description("migrates data down")
  .action(() => {
    //connect to database here
    databaseConfig.connect()
      .then(({ client, db }) => {
        //run the functionality of the back file
        return back(client, db);
      })
      .then((reverted) => {
        //show a list of the downgraded migrated files
        reverted.forEach((ele: any) =>
          console.log("Migrated the following back: " + ele)
        );
        history(reverted,'Back');
        Deno.exit();
      })
      .catch((err) => console.log(err + " : ERROR somewhere in back"));
  });

//log
program
  .command("log")
  .description("lists current migration log")
  .action(() => {
    // connect to database
    databaseConfig.connect()
      .then(({ db }) => {
        //run the functionality of the log file
        return log(db);
      })
      .then((logStatus) => {
        const table: Table = new Table();
        logStatus.forEach(ele=>table.push([ele.file,ele.migratedAt]));
        table.header(["Migration File", "Migrated On"])
        table.border(true)
        table.chars({
          top: "_",
          topMid: "_",
          topLeft: "_",
          topRight: "_",
          bottom: "_",
          bottomMid: "|",
          bottomLeft: "|",
          bottomRight: "|",
          left: "|",
          leftMid: "|",
          mid: "_",
          midMid: "|",
          right: "|",
          rightMid: "|",
          middle: "|",
        })
        table.padding(3)
        table.indent(20)
        table.render()
        Deno.exit();
      });
  })
  .parse(Deno.args); // parses the user input of all commands

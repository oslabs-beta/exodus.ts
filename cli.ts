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

//  Key 
//    databaseConfig.connect()  - connects to database
//     .then(({ client, db }) => {return <action> (client, db);})  - runs selected action
//       .then((<actionReturn>) => returns output of action, usually an array of actions taken

//init
program
  .command("init [test:string]")
  .description("initialize a new Exodus migration project")
  .action(() => { // if passed in argument to init is 'test e.g. init('test')), will setup test database config
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
    dbInit()
      .then(() => {
        console.log("New Exodus Full database migration initialized");
      });
  });


//create
program
  .command("create [commitMessage:string]")
  .description("create a new migration file for the current database")
  .action((commitMessage: string) => {
    create(commitMessage);
  });

//forward
program
  .command("fwd")
  .description(" migrates data up")
  .action(() => {
    databaseConfig.connect()
      .then(({ client, db }) => {
        return fwd(client, db);
      })
      .then((migrated) => {
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
  databaseConfig.connect('extract')
    .then(({ client, db, dbName }) => {
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
  databaseConfig.connect('apply')
    .then(async ({ client, db, dbName }) => {
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
    databaseConfig.connect()
      .then(({ client, db }) => {
        return fullForward(client, db);
      })
      .then((migrated) => {
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
    databaseConfig.connect()
      .then(({ client, db }) => {
        return back(client, db);
      })
      .then((reverted) => {
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
    databaseConfig.connect()
      .then(({ db }) => {
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
  .parse(Deno.args);

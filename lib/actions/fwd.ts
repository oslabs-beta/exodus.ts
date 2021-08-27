import { log } from './log.ts'
import { format } from "../../deps.ts"

interface Log  {
  file:string,
  migratedAt:string
}

export const fwd = async (client:any, db:any) => {
  //get an array of docs within the migrationLog
  const allItems:Array<Log> = await log(db);
  //if the last item's mirgatedAt prop in from allitems array is not pending that maeans all forward migrations have been made
  if (allItems[allItems.length-1].migratedAt !=='PENDING') {
    console.log('Migrations already up to date');
    const emptyArray:Array<string>= []
    return emptyArray
  }
  //grab only the docs with a migratedAt/status of pending
  const pendingMigrations:Array<Log> = allItems.filter((ele:Log) => ele.migratedAt === 'PENDING');
  let migrated:string[] = [];

  // runs fwd migration defined for file name of document passed in as argument
  const migrateFile = async <T extends Log>(document:T) => {
    let migrationFile:any;
    migrationFile = await import('file://' + Deno.cwd() + `/migrations/${document.file}`);

    const fwd = migrationFile!.migration.fwd;
    await fwd(client,db);
    const migrationCollection = db.collection('migrationLog');
    const {file} = document;
    const migratedAt:string = format(new Date(), "yyyy_MM_dd_HH_mm_ss");

    await migrationCollection.insertOne({file, migratedAt})
    migrated.push(file);
}
  await migrateFile(pendingMigrations[0]);
//returns the names of the files that were migrated to the terminal console
  return migrated;
}

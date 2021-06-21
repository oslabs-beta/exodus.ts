import { log } from './log.ts';
import { format } from "../../deps.ts";


//interface/(shape of) our documents
interface Log  {
  file:string,
  migratedAt:string
}
//export an async func that takes in db and client
export const fullForward = async (client:any, db:any) => {
  //get an array of docs within the migrationLog
  const allItems:Array<Log> = await log(db);
  //if the last item's mirgatedAt prop in from allitems array is not pending that maeans all forward migrations have been made
  if (allItems[allItems.length-1].migratedAt !=='PENDING') {
    console.log('Migrations already up to date');
    const emptyArray:Array<string>= [];
    return emptyArray;
  }
  //grab only the docs with a mirgatedAt/status of pending
  const pendingMigrations:Array<Log> = allItems.filter((ele:Log) => ele.migratedAt === 'PENDING');
//create a var which will hold the migrated items and be returned to the terminal for the ueser's view
  const migrated: string[] = [];
//create a func that takes in a document
  const migrateFile = async <T extends Log>(document:T) => {
    let migrationFile:any;
    // get the path of the file name of the document in order to run the migrations defined within that file
    migrationFile = await import('file://' + Deno.cwd() + `/migrations/${document.file}`);
    //grab the fwd method within the file to be migrated
    const fwd = migrationFile!.migration.fwd;
    //run the functionality defined in the fwd of the file
    await fwd(client,db);
    //establish the connection with the specific collection migrationLog
    const migrationCollection = db.collection('migrationLog');
    //get the filename from the document
    const {file} = document;
    //assign the migratedAt prop in the migrationLog a date/time value
    const migratedAt:string = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
    //insert the doc with the specified props into the migrationLog
    await migrationCollection.insertOne({file, migratedAt})
      // .catch((err:any) => console.log('Error migrating logs'))
      //push the filenames that have been migrated to the migrated array
    migrated.push(file)
}
//Runs each pending migration. checks if all fwd migrations in the file that have yet to be migrated(pendingMigrations) are successful and if not should reject if any fwd migration if not successful
  for(let doc of pendingMigrations){
    await migrateFile(doc)
  }
//returns the names of the files that were migrated to the terminal console
  return migrated;
}

import { log } from './log.ts'
import { format } from "../../deps.ts"
//export an async func that takes in db and client
export const fwd = async (client:any, db:any) => {
  //get an array of docs within the migrationLog
  const allItems = await log(db);
//grab only the docs with a mirgatedAt/status of pending
  const pendingMigrations = allItems.filter(ele => ele.migratedAt === 'PENDING');
//create a var which will hold the migrated items and be returned to the terminal for the ueser's view
  const migrated:Array<any> = [];
//create a func that takes in a document
  const migrateFile = async (document:any) => {
    let migrationFile:any;
    // get the path of the file name of the document in order to run the migrations defined within that file
    migrationFile = await import(`../../migrations/${document.file}`);
    //grab the fwd method within the file to be migrated
    const fwd = migrationFile!.mod.fwd;
    //run the functionality defined in the fwd of the file
    await fwd(client,db);
    //establish the connection with the specific collection migrationLog
    const migrationCollection = db.collection('migrationLog');
    //get the filename from the document
    const {file} = document;
    //assign the migratedAt prop in the migrationLog a date/time value
    const migratedAt = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
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

import { log } from './log.ts'
import { format } from "../../deps.ts"
//export an async func that takes in db and client
export const forward = async (client,db) => {
//get an array of docs within the migrationLog
  const allItems = await log(db);
//grab only the docs with a mirgatedAt/status of pending
  const pendingMigrations = allItems.filter(ele=>ele.migratedAt === 'PENDING');
//create a var which will hold the migrated items and be returned to the terminal for the ueser's view
  const migrated = [];
//create a func that takes in a document 
  const migrateFile = async (document) => {
// get the path of the file name of the document in order to run the migrations defined within that file
    import * as migrationFile from `./migrations/${document.file}`
    //grab the fwd method within the file to be migrated
    const fwd = migrationFile.fwd;
    //run the functionality defined in the fwd of the file
    await fwd(client,db);
    //establish the connection with the specific collection migrationLog
    const migrationCollection = db.collection('migrationLog');
    //get the filename from the document
    const {file} = document;
    //assign the migratedAt prop in the migrationLog a date/time value
    const migratedAt = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
    //insert the doc with the specified props into the migrationLog
    migrationCollection.insertOne({file, migratedAt})
      .catch(err => console.log('Error migrating logs'))    
      //push the filenames that have been migrated to the migrated array
    migrated.push(file)
}
//Runs each pending migration. checks if all fwd migrations in the file that have yet to be migrated(pendingMigrations) are successful and if not should reject if any fwd migration if not successful
  await Promise.all(pendingMigrations.forEach((file) => {
   migrateFile(file);
  }))
//returns the names of the files that were migrated to the terminal console
  return migrated;
}

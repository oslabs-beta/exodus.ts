import { log } from './log.ts'
//export an async func that takes in db and client

interface Log  {
  file:string,
  migratedAt:string
}

export const back = async (client:any, db:any) => {
//get an array of docs within the migrationLog
  const allItems:Array<Log> = await log(db);
//grab an array of the docs that have a status that is not pending
  const updatedItems:Array<Log> = allItems.filter(ele => ele.migratedAt !== 'PENDING');
//get the most recent migrated item
  const latestUpdate:Log= updatedItems[updatedItems.length - 1];
//create an array to hold all the files that have been backed to be displayed on the terminal for the user's view
  const reverted:Array<string> = [];
//check if the most recent migrated item is truthy
  if(latestUpdate){
    //dynamically import that file in order to run the down migrations defined within that file
    let migrationFile = await import(`../../migrations/${latestUpdate.file}`);
    //assign the async func within the mod obj of that file to a variable
    const back = migrationFile!.migration.back;
    //run the functionality defined in the back func of the file
    await back(client, db);
    //establish the connection with the specific collection migrationLog
    const migrationCollection = db.collection('migrationLog');
    //get the filename from the last migrated document
    const {file} = latestUpdate;
    //remove that document from the migrationLog collection
    await migrationCollection.deleteOne({file});
    //push the filesnames that have been reverted back to the array
    reverted.push(file);
  } else console.log('Migrations already fully downgraded');
  //return the array of reverted back filenames for the user's view
  return reverted;
}
import { log } from './log.ts'

interface Log  {
  file:string,
  migratedAt:string
}
// Functionality that takes care of downgrading the database
export const back = async (client:any, db:any) => {
  // Filter out migrations that have not yet been applied
  const allItems:Array<Log> = await log(db);
  const updatedItems:Array<Log> = allItems.filter(ele => ele.migratedAt !== 'PENDING');
  const latestUpdate:Log= updatedItems[updatedItems.length - 1];
  const reverted:Array<string> = [];

  // While there are still migrations that can be downgraded, dynamically import each of them and run the back functionality associated with the file
  if(latestUpdate){
    let migrationFile = await import('file://' + Deno.cwd()+ `/migrations/${latestUpdate.file}`);
    const back = migrationFile!.migration.back;

    await back(client, db);

    const migrationCollection = db.collection('migrationLog');
    const {file} = latestUpdate;

    await migrationCollection.deleteOne({file});
    reverted.push(file);
  } 
  else console.log('Migrations already fully downgraded');

  //return the array of reverted back filenames for the user's view
  return reverted;
}
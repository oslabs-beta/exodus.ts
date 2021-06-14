import { join } from "../../deps.ts"

export const log = async(db:any) => {
//gets all the filenames within the migrations folder
  let files:Array<any> = [];
  for await (let file of Deno.readDir(join(Deno.cwd(),'migrations'))){
    if (file.isFile && file.name !== 'migration.ts') files.push(file.name);
  }
//establishes the connection to the migrationLog connection in mongodb
  const migrationCollection = db.collection('migrationLog');
// creates an array of all the documents in the mirgation collection
  const migrationLog = await migrationCollection.find({},{ noCursorTimeout:false }).toArray();
// applies a func on every file from the migrations folder
  const logStatus = await Promise.all(files.map(async(file) => {
    //create a var that is an obj containing the current migration file
    let doc;
    //finds the first file that matches in the migrationLog(which is an array of docs in migr. coll)
    for(const document of migrationLog){
      if(document.file === file) doc = document;
    }
    //create a var which will become a prop on each doc in the mirgationLog collection, assign it to the date/time or pending 
    const migratedAt = doc ? doc.file.migratedAt.toJSON() : 'PENDING';
    //return an obj with props of the files name and the mirgatedAt status 
    return {file, migratedAt}
  }))
  //return the logStatus to be displayed onto the terminal as a table for the user's view(this will be done in the cli)
  return logStatus;
};
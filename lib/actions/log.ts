import { join } from "../../deps.ts"

//interface/(shape of) our documents
interface Log  {
  file:string,
  migratedAt:string
}
export const log = async(db:any) => {
//gets all the filenames within the migrations folder
  let files:Array<string> = [];

  for await (let file of Deno.readDir(join(Deno.cwd(),'migrations'))){
    if (file.isFile && file.name !== 'migration.ts') files.push(file.name);
  }
//establishes the connection to the migrationLog connection in mongodb
  const migrationCollection = db.collection('migrationLog');
// creates an array of all the documents in the mirgation collection
  const migrationLog: Array<Log> = await migrationCollection.find({},{ noCursorTimeout:false }).toArray();
// applies a func on every file from the migrations folder
  const logStatus:Array<Log> = await Promise.all(files.map(async (file:string) => {
    //create a var that will be a prop on the collection obj
    let migratedAt:string;
    //finds the first file that matches in the migrationLog(which is an array of docs in migr. coll)
    for(const document of migrationLog){
      if(document.file === file){
        //if the file name matches the file already in the migrationLog assign the migrated at prop
        migratedAt = document.migratedAt;
        //return the document
        return {file, migratedAt}
      }
    }
    //if not
    migratedAt = 'PENDING';
    //return an obj with props of the files name and the mirgatedAt status
    return {file, migratedAt}
  }))
  //return the logStatus to be displayed onto the terminal as a table for the user's view(this will be done in the cli)
  return logStatus;
};
import { join } from "../../deps.ts"

interface Log  {
  file:string,
  migratedAt:string
}

// Functionality that creates a log of all migrations (both pending and applied) of the current database in the terminal for the user to view
export const log = async(db:any) => {

  let files:Array<string> = [];

  for await (let file of Deno.readDir(join(Deno.cwd(),'migrations'))){
    if (file.isFile && file.name !== 'migration.ts') files.push(file.name);
  }

  // File names are extracted from the migrationLog collection of the user's mongoDB instance
  const migrationCollection = db.collection('migrationLog');
  const migrationLog: Array<Log> = await migrationCollection.find({},{ noCursorTimeout:false }).toArray();
  const logStatus:Array<Log> = await Promise.all(files.map(async (file:string) => {
 
    let migratedAt:string;
    
    for(const document of migrationLog){
      if(document.file === file){
        migratedAt = document.migratedAt;
        return {file, migratedAt}
      }
    }
   
    migratedAt = 'PENDING';
    
    return {file, migratedAt}
  }))
  
  return logStatus;
};
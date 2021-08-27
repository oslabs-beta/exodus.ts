import { ensureDir, existsSync } from "../../deps.ts"
import { join } from "../../deps.ts";

// Functionality that reads all database collections from the database migrations directory and writes them to the user's selected mongoDB cluster
// Note: Will only run if databse migrations directory already exists
export const dbApply = async (db:any) => {

  if(existsSync(join(Deno.cwd(),'database-migration'))){
    for await (let folder of Deno.readDir(join(Deno.cwd(),'database-migration'))){
      if (folder.isDirectory){
        for await (let dir of Deno.readDir(join(Deno.cwd(),'database-migration',folder.name))){
          if(dir.isDirectory && dir.name === 'data'){
            for await (let collection of Deno.readDir(join(Deno.cwd(),'database-migration',folder.name,dir.name))){
              let data:any;
              data = JSON.parse(Deno.readTextFileSync(join(Deno.cwd(),'database-migration', folder.name, dir.name, collection.name)));
              //checks if user wants to keep the id from extraction
              if(Deno.args[1] === 'keepId'){
                //removes the file extension .json
                db.collection(collection.name.slice(0,collection.name.length-5)).insertMany(data);
              } 
              else{
                data.forEach((el:any) => {delete el._id;})
                db.collection(collection.name.slice(0,collection.name.length-5)).insertMany(data);
              }
            } 
          }
        }
      } 
    }
  }
  else {
    console.log('error: need to dbInit and extract first');
  }
  return;
}
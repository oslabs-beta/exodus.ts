//imports
import { ensureDir, existsSync } from "../../deps.ts"
// import { writeJSONSync } from "../../deps.ts"
import { join } from "../../deps.ts";

export const dbApply = async (db:any) => {

  //check to see if database migration folder exists
  if(existsSync(join(Deno.cwd(),'database-migration'))){
    // check sub-directories. If subdirectories contain a 'data' folder, iterate through the files and apply to new database
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
              } else{
                //removes the file extension .json
                data.forEach((el:any) => {delete el._id;})
                db.collection(collection.name.slice(0,collection.name.length-5)).insertMany(data);
              }
            } 
          }
        }
      } 
    }
  }else {
    // if it doesn't, throw an error
    console.log('error: need to dbInit and extract first');
  }
  return;
}
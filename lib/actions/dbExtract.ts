//imports
import { ensureDir, existsSync } from "../../deps.ts"
// import { writeJSONSync } from "../../deps.ts"
import { join } from "../../deps.ts";

export const dbExtract = async (db:any, dbName:string) => {

  //check to see if database migration folder exists
  if(existsSync(join(Deno.cwd(),'database-migration'))){

    //create folder with users dbname inside the dbmigrations folder
    ensureDir(join('database-migration',`${dbName}`));
    //create data directory inside of the dbname directory
    ensureDir(join('database-migration',`${dbName}`,'data'));
    //grab an array of the collection within the users input db
    const collections = await db.listCollections().toArray();

    for(const info of collections){
      const collection = db.collection(info.name);
      // grab all documents within collection
      const cursor = collection.find({},{ noCursorTimeout:false });
      // convert data into an array
      const data = await cursor.toArray();

      // create a json file of the data for each collection 
      Deno.writeTextFile(join('database-migration',`${dbName}`,'data', `${info.name}.json`), JSON.stringify(data));

    }

  }

}


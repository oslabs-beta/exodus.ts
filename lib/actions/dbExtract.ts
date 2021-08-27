import { ensureDir, existsSync } from "../../deps.ts"
import { join } from "../../deps.ts";

// Functionality that extracts all collections from the user's selected database and writes the data as json files in a database-migration directory
export const dbExtract = async (db:any, dbName:string) => {

  if(existsSync(join(Deno.cwd(),'database-migration'))){
    ensureDir(join('database-migration',`${dbName}`));
    ensureDir(join('database-migration',`${dbName}`,'data'));
  
    const collections = await db.listCollections().toArray();

    for(const info of collections){
      const collection = db.collection(info.name);
      const cursor = collection.find({},{ noCursorTimeout:false });
      const data = await cursor.toArray();
      
      Deno.writeTextFile(join('database-migration',`${dbName}`,'data', `${info.name}.json`), JSON.stringify(data));
    }
  }
}


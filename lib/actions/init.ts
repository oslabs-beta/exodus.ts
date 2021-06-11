// need path (join and __dirname) and fs (copy and mkdirs) and whatever the equivalent of process.cwd() is
import { copy, copySync, ensureDir } from "../../deps.ts";

import { join } from "../../deps.ts";

const createSetupTemplate = () => {
  // need to copy the setup config template into the user's current working directory
  return copySync(Deno.realPathSync('./templates/setup.ts'), join(Deno.cwd(),'setup.ts'))
}  // copies the setup config template (setup.ts) into current working directory and naming this copy 'setup.ts'



const createMigrationsDir = () => {
  // need to create the migrations directory, also in the user's cwd
  return ensureDir(join(Deno.cwd(),'migrations')) 
} // checks if migrations directory exists in cwd, if not then it creates a migrations directory in cwd



//export an async func(might not need the async func because deno has top await functionality) which 
export const init = async () => {
    //awaits a func that copies the setup config template
  await createSetupTemplate()
    // returns the func that returns the created migration directory
  return createMigrationsDir()
}


// WORKS

   // ** Deno modules ** //

// Deno.realPathSync("copythis.txt") --- returns absolute path              ==> C:\Users\nicho\Prog\Test\testMongoMigrate\copythis.txt
// Deno.cwd()      --------------------- returns current working directory  ==> C:\Users\nicho\Prog\Test\testMongoMigrate


  // ** fs module || std library ** //
                          // import { copy, copySync } from "https://deno.land/std@0.98.0/fs/mod.ts";
                            // requires allow-read, and allow-write, and --unstable   
                              // e.g.  deno run --unstable --allow-read --allow-write denoTest.js

// copySync("copythis.txt", "./copyFolder/copied.txt", { overwrite: true })
                                    //copies file/directory from first argument, and pastes it to the directory and name of the second argument. 3rd argument is if you want to override file if it exists. Default is false if no 3rd argument given
                                    // WILl NOT create a new folders to fit the file path if it doesn't exist


  // ** path module || std library  **//     
                          //import * as path from "https://deno.land/std@0.98.0/path/mod.ts";  

// path.join( multiple, args )   --------------- joins the paths                         ==> e.g. path.join('C:','Fool')   =>> C:\Fool

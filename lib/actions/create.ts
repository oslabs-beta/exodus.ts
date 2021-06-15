import { copy, copySync, ensureDir, existsSync } from "../../deps.ts";
import { join } from "../../deps.ts";
import { format } from "../../deps.ts";
import generate from "https://deno.land/x/denoname/mod.ts";
const { dirname } = generate(import.meta);


export const create = async (commitMessage:string) => {

// check if migrations directory exists
if(existsSync(join(Deno.cwd(),'migrations'))){
  const date = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
  //create a copy the migration template file and place a migration file into the migrations directory which was created from init
  await copySync(join(dirname,'../../templates/migration.ts'), join(Deno.cwd(),`migrations/${date}_${Deno.args[1]}.ts`))
  console.log(`new Exodus migration file created: ${date}_${Deno.args[1]}.ts`);
  } else {
  // if it doesn't, throw an error
  console.log('error: need to init first');
  }
}

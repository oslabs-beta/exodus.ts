import { copy, copySync, ensureDir, existsSync } from "../../deps.ts";
import { join } from "../../deps.ts";

import { format } from "../../deps.ts"
export const create = async (commitMessage:string) => {

// check if migrations directory exists
if(existsSync(join(Deno.cwd(),'migrations'))){
  const date = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
  //create a copy the migration template file and place a migration file into the migrations directory which was created from init
  await copySync(Deno.realPathSync('./templates/migration.ts'), join(Deno.cwd(),`migrations/${date}_${Deno.args[1]}.ts`))
  console.log(`new Exodus migration file created: ${date}_${Deno.args[1]}.ts`);
} else {
  console.log('error: need to init first');
  // if it doesn't, throw an error
}
  // else add file to the migrations directory

}

//console.log(format(new Date(), "yyyy_MM_dd_HH_mm_ss")) // 2021_06_10_16_49_33
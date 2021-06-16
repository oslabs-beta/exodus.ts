import {existsSync } from "../../deps.ts";
import { join } from "../../deps.ts";
import { format } from "../../deps.ts";

export const create = async (commitMessage:string) => {

// check if migrations directory exists
if(existsSync(join(Deno.cwd(),'migrations'))){
  const date = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
  //create a copy the migration template file and place a migration file into the migrations directory which was created from init
  const res = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/main/templates/migration.ts");
  await Deno.writeTextFile(join(Deno.cwd(), `migrations/${date}_${Deno.args[1]}.ts`), await res.text());

  console.log(`new Exodus migration file created: ${date}_${Deno.args[1]}.ts`);
  } else {
  // if it doesn't, throw an error
  console.log('error: need to init first');
  }
}

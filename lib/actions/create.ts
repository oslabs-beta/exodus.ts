import {existsSync } from "../../deps.ts";
import { join } from "../../deps.ts";
import { format } from "../../deps.ts";

// Functionality that takes care of creating a new migration file into the user's migrations directory
// Note: Will only create a new file if a migrations directory already exists
export const create = async (commitMessage:string) => {

  if(existsSync(join(Deno.cwd(),'migrations'))){
    const date = format(new Date(), "yyyy_MM_dd_HH_mm_ss");
    const res = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/migration.ts");
    await Deno.writeTextFile(join(Deno.cwd(), `migrations/${date}_${Deno.args[1]}.ts`), await res.text());
    console.log(`new Exodus migration file created: ${date}_${Deno.args[1]}.ts`);
  } 
  else {
    console.log('error: need to init first');
  }
}

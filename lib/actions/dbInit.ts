import { ensureDir } from "../../deps.ts";
import { join, resolve } from "../../deps.ts";

export const dbInit = () => {
  // need to create the database migration directory, also in the user's cwd
  // checks if database migration directory exists in cwd, if not then it creates a database migrations directory in cwd
  ensureDir(join(Deno.cwd(),'database-migration'))
//creates tenplate database config files in order to determine what database you whant to extract data from and what databse you want to apply it to
  const createSetupTemplates = async () => {
    // need to copy the setup config template into the user's current working directory
    const res1 = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");
    // copies the setup config template (setup.ts) into current working directory and naming this copy 'setupExtract.ts'
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupExtract.ts'), await res1.text());
    // copies the setup config template (setup.ts) into current working directory and naming this copy 'setupApply.ts'
    const res2 = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");  
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupApply.ts'), await res2.text());
  }

  return createSetupTemplates();

} 

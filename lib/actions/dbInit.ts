import { ensureDir } from "../../deps.ts";
import { join, resolve } from "../../deps.ts";

/* Initializes a new database-migration directory along with 2 database configuration files: setupExtract - where data will be extracted from and
setupApply - where data migration will be applied to */

export const dbInit = () => {
  
  ensureDir(join(Deno.cwd(),'database-migration'))
  const createSetupTemplates = async () => {
   
    const res1 = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupExtract.ts'), await res1.text());
  
    const res2 = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");  
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupApply.ts'), await res2.text());
  }

  return createSetupTemplates();

} 

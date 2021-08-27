import { ensureDir } from "../../deps.ts";
import { join, resolve } from "../../deps.ts";

 // creates setup config template. Using 'test' in the CLI creates seperate config file for testing
const createSetupTemplate = async () => { 
  const res = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");
  let testing = Deno.args[1]
  if (testing==='test'){
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupTest.ts'), await res.text())
  }
  else {
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setup.ts'), await res.text());
  }
}

// creates migrations directory in cwd
const createMigrationsDir = () => { 
  return ensureDir(join(Deno.cwd(),'migrations'))
}

export const init = async () => { 
  await createSetupTemplate()
  return createMigrationsDir()
}

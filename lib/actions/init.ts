// need path (join and __dirname) and fs (copy and mkdirs) and whatever the equivalent of process.cwd() is
import { ensureDir } from "../../deps.ts";
import { join, resolve } from "../../deps.ts";

const createSetupTemplate = async () => {
  // need to copy the setup config template into the user's current working directory
  const res = await fetch("https://raw.githubusercontent.com/miguel-garibay/exodus.ts/V0.1.2/templates/setup.ts");
  // copies the setup config template (setup.ts) into current working directory and naming this copy 'setup.ts'
  console.log(Deno.args[1])
  let testing = Deno.args[1]
  if (testing==='test'){
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setupTest.ts'), await res.text())
  }
  else {
    await Deno.writeTextFile(resolve(Deno.cwd(), 'setup.ts'), await res.text());
  }
}  



const createMigrationsDir = () => {
  // need to create the migrations directory, also in the user's cwd
  // checks if migrations directory exists in cwd, if not then it creates a migrations directory in cwd
  return ensureDir(join(Deno.cwd(),'migrations'))
} 



//export an async func(might not need the async func because deno has top await functionality) which
export const init = async () => {
    //awaits a func that copies the setup config template
  await createSetupTemplate()
    // returns the func that returns the created migration directory
  return createMigrationsDir()
}

import { format,resolve } from "../../deps.ts";

// creates or appends performed database actions and migrations into a local log file 
// - '<action> + <date> + <action>' , '<migrationFilesMigrated1>,<migrationFilesMigrated2>, etc.'

export const history = async (migrationLogs: Array<string>, direction:string, logName:string='exodusLog.txt') => {
  
  if (migrationLogs.length>0) {

    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    date='\n'+'\n'+`<${direction}> Date: `+ date + ` <${direction}>`;

    let newHistory = '' ;
    migrationLogs.forEach(ele=>{
      newHistory=newHistory + '\n'+ele;
    })

    Deno.writeTextFileSync(resolve(Deno.cwd(),logName), `${date}`, {append: true});
    Deno.writeTextFileSync(resolve(Deno.cwd(),logName), `${newHistory}`,{append: true});
  
  }
return migrationLogs; 
}

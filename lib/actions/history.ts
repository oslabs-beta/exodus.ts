
import { format,join,resolve } from "../../deps.ts";


export const history = async (migrationLogs: Array<string>, direction:string) => {

  if (migrationLogs.length>0) {

    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    date='\n'+'\n'+`<${direction}> Date: `+ date + ` <${direction}>`;

    let newHistory = '' ;
    migrationLogs.forEach(ele=>{
      newHistory=newHistory + '\n'+ele;
    })

    Deno.writeTextFileSync(resolve(Deno.cwd(),"exodusLog.txt"), `${date}`, {append: true});
    Deno.writeTextFileSync(resolve(Deno.cwd(),"exodusLog.txt"), `${newHistory}`,{append: true});
  
  }
return migrationLogs; 
}

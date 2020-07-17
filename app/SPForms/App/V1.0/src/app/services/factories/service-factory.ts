import { SPDataService } from "../sp-data.service";
import { SPInstallService } from "../spinstall.service";

export function InstallServiceFactory() {
    return (ds: SPDataService) => {
        return new SPInstallService(ds);

        // return new Promise((resolve, reject) => {

        //     return ds.loadSP().then(r => {
        //         ds.getLists().then(r1 => {
        //             resolve(r1);
        //         }, (e1)=>{
        //             reject(e1);
        //         });
        //     });
        // });
    }

}

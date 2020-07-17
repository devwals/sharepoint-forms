export interface IDataService {
    getLists(basetype: number);//0 for lists and 1 for libraries and null for all
    getListFields(listID: string);//listID is GUID of the list
    save(param: any);
}

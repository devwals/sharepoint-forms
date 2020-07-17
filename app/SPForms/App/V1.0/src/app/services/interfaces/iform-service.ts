export interface IFormService {
    getForms();
    getFormByName(formName: string);
    getFormById(id: number);
    saveForm(formName: string, data: any, refName: string, refID: string, override?: boolean);
    deleteForm(formName: string);
    generateFormFieldJSON(param: any, listData: any);
}

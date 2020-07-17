import { SPDataService } from "../../services/sp-data.service";
import { SPFormService } from "../../services/sp-form.service";
import { Router } from "@angular/router";
import { ApplicationRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditListFormComponent } from "../lists/edit-list-form/edit-list-form.component";
import { PreviewComponent } from "../../viewer/preview/preview.component";

export class ManageListForms {

    view: any = {};
    loadingLists: boolean = true;
    loadingForms: boolean = true;

    constructor(
        private sps: SPDataService,
        private fs: SPFormService,
        private router: Router,
        private _applicationRef: ApplicationRef,
        private toastr: ToastrService,
        private modalService: NgbModal
    ) { }

    //1 = library, 0 = list
    getLists(baseType: number) {

        //Store selected list id if this is refresh within the page
        let selectedListId = "-1";
        if (this.view.selectedList) {
            selectedListId = this.view.selectedList.Id;
        }

        this.sps.getLists().then((r: any) => {
            this.loadingLists = false;

            this.view.lists = r.filter(v => {
                return v.BaseType == baseType
            });

            console.log("lists or libraries data : ", this.view.lists);

            if (!this.view.selectedList && this.view.lists.length > 0) {
                this.view.selectedList = this.view.lists[0];
                this.getForms();
            } else if(this.view.selectedList && this.view.lists.length > 0) {
                this.view.selectedList = this.view.lists.find(l=>l.Id == selectedListId);
            }

            this._applicationRef.tick();//A workaround to display data on browser back

        }, (e) => {
            this.toastr.error(e, 'ERROR!',
                { closeButton: true });
            console.log("getLists Error Response: {0}", JSON.stringify(e, null, 4));
        });
    }

    getForms() {
        console.log("selected list : ", this.view.selectedList);
        this.sps.getListForms(this.view.selectedList.Id)
            .then(r => {
                console.log(r);
                this.view.defaultForms = r;
            }, e => {
                console.log(e);
                this.toastr.error(e, 'ERROR!',
                    { closeButton: true });
            });

        this.fs.getFormsByList(this.view.selectedList.Id)
            .then(r => {
                this.view.listForms = r;
                console.log("List Forms");
                console.log(this.view.listForms);
                this.setFormUrls();
                this.loadingForms = false;
            }, e => {
                console.log(e);
                this.toastr.error(e, 'ERROR!',
                    { closeButton: true });
            });
    }

    setFormUrls() {
        for (let index = 0; index < this.view.listForms.length; index++) {
            let element = this.view.listForms[index];

            element.formUrl = this.fs.getFormUrl(element.Id, this.view.selectedList.ParentWebUrl, "display");
            element.editFormUrl = this.fs.getFormUrl(element.Id, this.view.selectedList.ParentWebUrl, "edit");
            element.newFormUrl = this.fs.getFormUrl(element.Id, this.view.selectedList.ParentWebUrl, "new");
        }
    }

    ngOnInit() { }

    ngOnDestroy(): void { }

    onListSelected(event: any, item: any) {
        if (this.view.selectedList == item) {
            return;
        } else {
            this.view.selectedList = item;
            this.getForms();
        }
    }

    editListForm() {
        const activeModal = this.modalService.open(EditListFormComponent,
            { size: 'lg', container: 'nb-layout', backdrop: 'static' }
        );

        activeModal.componentInstance.view.list = this.view.selectedList;
        activeModal.componentInstance.view.listForms = this.view.listForms;

        activeModal.result.then((res) => {
            if (res) {
                this.getLists(this.view.selectedList.BaseType);    //reload the forms again
            }
        });
    }

    previewForm(item: any) {
        const activeModal = this.modalService.open(PreviewComponent,
            { size: 'lg', container: 'nb-layout', backdrop: 'static', windowClass: 'dw-modal-full-screen' }
        );
        activeModal.componentInstance.item = item;
    }

    editForm(item: any) {
        this.router.navigate(['/pages/forms/edit/' + item.ID]);
        console.log(item);
    }

    previewUsingFormName(formName) {
        console.log("list forms : ", this.view.listForms);
        console.log("form name: ", formName);
        let resultObject = this.search(formName, this.view.listForms);
        console.log(resultObject)
        this.previewForm(resultObject);
    }

    search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].FileLeafRef === nameKey || myArray[i].Title === nameKey) {
                return myArray[i];
            }
        }
    }
}

export default ManageListForms;

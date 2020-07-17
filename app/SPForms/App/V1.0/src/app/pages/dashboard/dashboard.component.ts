import { ModalDeleteFormComponent } from './modal-delete-form/modal-delete-form.component';
import { Component, OnDestroy, OnInit, ApplicationRef } from '@angular/core';
import { SPInstallService } from '../../services/spinstall.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewComponent } from '../../viewer/preview/preview.component';
import { SPFormService } from '../../services/sp-form.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  view: any = {
    forms: [],
    hasFormsList: true,
    loading: true,
    messages: { error:[], information: [], success: []}
  };

  //Pagination Settings
  currentPage = 1;
  itemsPerPage = 20;

  constructor(
    private is: SPInstallService,
    private fs: SPFormService,
    private router: Router,
    private _applicationRef: ApplicationRef,
    private modalService: NgbModal
  ) { this.getForms(); }

  ngOnInit() { 
    
  }

  ngOnDestroy() { }

  getForms() {
    this.fs.getForms().then((r)=>{
      //Sort by Modified date(descending order)
      this.view.forms = r.sort((a, b) => 
        new Date(b.Modified).getTime() - new Date(a.Modified).getTime()
      );
      
      console.log("forms : ", this.view.forms);
      
      this.view.loading = false;
      this._applicationRef.tick();  //A workaround to display data on browser back
    },(e)=>{
      this.view.hasFormsList = false;
      console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
      this.view.loading = false;
      this._applicationRef.tick();  //A workaround to display data on browser back
    });
  }

  deploy() {
    this.view.install = {};
    this.view.install.status = "In Progress";
    this.view.install.message = "Completing installation, please wait...";
    this.is.createFormStores().then((r) => {
      this.view.install.status = "Completed";
      this.view.messages.success.push("Successfully completed the installation. Enjoy creating forms!");
      this.view.hasFormsList = true;
    },(e)=>{
      console.log("ERROR: {0}", JSON.stringify(e, null, 4));
      this.view.messages.error.push("ERROR: {0}",JSON.stringify(e, null, 4));
    });
  }

  deleteForm(item: any) {
    const activeModal = this.modalService.open(ModalDeleteFormComponent, 
      { size: 'lg', container: 'nb-layout', backdrop: 'static'}
    );

    activeModal.componentInstance.modalHeader = 'CONFIRM DELETE';
    activeModal.componentInstance.modalContent = 'Are you sure you want to delete ' + item.FileLeafRef + ' form? This action cannot be undone.';

    activeModal.result.then((userResponse)=> {
      console.log(`User's choice: ${userResponse}`)
      if( userResponse == true ) {
        this.fs.deleteForm(item.FileLeafRef).then(r=>{
          this.getForms();
        },e=>{
          console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
        });
        console.log("delete");
        activeModal.close();
      } else {
        console.log("cancel");
        activeModal.close();
      }
    });
  }

  previewForm(item: any) {
    const activeModal = this.modalService.open(PreviewComponent, 
      { size: 'lg', container: 'nb-layout', backdrop: 'static', windowClass: 'dw-modal-full-screen'}
    );

    console.log("preview item : ", item);
    activeModal.componentInstance.item = item;
  }

  editForm(item: any) {
    this.router.navigate(['/pages/forms/edit/' + item.ID]);
    console.log(item);
  }
}

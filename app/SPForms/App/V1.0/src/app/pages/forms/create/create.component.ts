import { Component, OnInit } from '@angular/core';
import { SPDataService } from '../../../services/sp-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SPFormService } from '../../../services/sp-form.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  view: any = {
    lists: [],
    fields: [],
    selectedFields: {},
    messages: { error: [], information: [], success: [] },
    form: { components: [] }
  };

  listSelected: boolean = false;
  selectedAll: boolean = false;
  loadingLists: boolean = true;
  loadingListFields: boolean = true;

  constructor(private sps: SPDataService,
    private fs: SPFormService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.sps.getLists().then((r: any) => {
      this.view.lists = r;
      this.view.selectedList = this.view.lists[0];
      this.onListSelected();
      this.loadingLists = false;

    }, (e) => {
      console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
    });
  }

  onListSelected() {

    this.listSelected = true;
    this.loadingListFields = true;

    this.sps.getListFields(this.view.selectedList.Id).then((r: any) => {

      this.view.fields = r;
      this.loadingListFields = false;
      this.view.selectedFields = {};
      console.log(this.view.fields);

    }, (e) => {
      console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
    });
  }

  onFieldSelected(event: any, value: any) {
    console.log(this.view.selectedFields);
  }

  createForm() {
    let selectedFields = this.view.fields.filter(f => {
      return this.view.selectedFields[f.InternalName] == true
    });

    this.view.form = {
      lists: [
        {
          listId: this.view.selectedList.Id,
          title: this.view.selectedList.Title,
          baseType: this.view.selectedList.BaseType
        }
      ],
      components: []
    };
    selectedFields.forEach(element => {
      this.view.form.components.push(
        this.fs.generateFormFieldJSON(element, this.view.selectedList)
      );
    });

    //Add document upload if the form is for document library
    if(this.view.selectedList.BaseType == 1){
      this.view.form.components.push(
        {
            name: 'DocumentUpload', label: "Document Upload", group: "SharePoint",
            type: 'document', icon: 'fas fa-file-upload',
            listId: this.view.selectedList.Id,
            listName: this.view.selectedList.Title
        }
      );
    }

    console.log("Form : {0}", JSON.stringify(this.view.form, null, 4));

    this.fs.saveForm(this.view.formName, JSON.stringify(this.view.form), this.view.selectedList.Title, this.view.selectedList.Id)
      .then((r) => {
        this.toastr.success('Form created successfully!', 'DONE!',
          { closeButton: true });
        this.router.navigate(['/pages/forms/edit/' + r.ID]);
      }, (e) => {
        console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));

        let error: string = e.toString();

        if (error.indexOf("already exists.") >= 0) {
          this.toastr.error(`Form with the name ${this.view.formName} already exists.`, 'Error', { closeButton: true });
        } else {
          this.toastr.error(`${error}`, 'Error', { closeButton: true });
        }
      });
  }

  selectAll() {
    for (var i = 0; i < this.view.fields.length; i++) {
      this.view.selectedFields[this.view.fields[i].InternalName] = !this.selectedAll;
    }
    console.log(this.view.selectedFields);
  }

  checkIfAllSelected() {
    for (var i = 0; i < this.view.fields.length; i++) {
      if (this.view.selectedFields[this.view.fields[i].InternalName] != true) {
        this.selectedAll = false;
        break;
      }
    }
    console.log(this.view.selectedFields);
  }
}

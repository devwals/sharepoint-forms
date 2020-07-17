import { Component, OnInit, ApplicationRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuilderTools } from './models/builder.tools';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugComponent } from './dialogs/debug/debug.component';
import { FormPropertiesComponent } from './dialogs/form-properties/form-properties.component';
import { takeWhile } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PreviewComponent } from '../../../viewer/preview/preview.component';
import { SPFormService } from '../../../services/sp-form.service';
import { BuilderService } from '../../../services/builder.service';
import { DWBRulesBuilderComponent } from './dialogs/dwb-rules-builder/dwb-rules-builder.component';
import { DWBListRulesComponent } from './dialogs/dwb-list-rules/dwb-list-rules.component';

@Component({
  selector: 'builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent implements OnInit, OnDestroy {
  private alive = true;
  loading = true;
  isList: boolean;
  listData: any;
  view: any = {
    form: {},
    item: {},
    hasFormsList: true,
    messages: { error: [], information: [], success: [] },
    targetBuilderTools: [],
    generalTools: BuilderTools
      .filter(b => { return b.group == 'General' })
      .sort(function (a, b) {
        return a.label.toUpperCase() <= b.label.toUpperCase() ? -1 : 1;
      }),
    sharepointTools: BuilderTools
      .filter(b => { return b.group == 'SharePoint' })
      .sort(function (a, b) {
        return a.label.toUpperCase() <= b.label.toUpperCase() ? -1 : 1;
      }),
    layoutTools: BuilderTools
      .filter(b => { return b.group == 'Layout' })
      .sort(function (a, b) {
        return a.label.toUpperCase() <= b.label.toUpperCase() ? -1 : 1;
      })
  };

  constructor(
    private fs: SPFormService,
    private _applicationRef: ApplicationRef,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private bs: BuilderService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        console.log("ID: {0}", params['id']);
        this.view.formId = params['id'];
        this.getForm(params['id']);
      });
  }

  // droppableItemClass = (item: any) => `${item.class} ${item.type}`;
  droppableItemClass = (item: any) => ``;

  builderDrag(e: any) {
    const item = e.value;
    item.data =
      item.inputType === 'Number'
        ? (Math.random() * 100) | 0
        : Math.random()
          .toString(36)
          .substring(20);
  }

  log(e: any) {
    console.log(e.type, e);
  }

  canMove(e: any): boolean {
    return e.indexOf('Disabled') === -1;
  }

  getForm(id: number) {
    this.fs.getFormById(id).then((res: any) => {
      this.view.form = res.file;
      this.bs.setForm(this.view.form);//This data is shared between the builder and other components
      this.view.item = res.item;
      this.listData = {
        id: this.view.item.RefId,
        name: this.view.item.RefName
      }

      //1 = library, 0 = list 
      if (res["file"].lists[0].baseType == 0) {
        this.view.sharepointTools = this.view.sharepointTools.filter(t => { return t.type != 'document' })
      } else if (res["file"].lists[0].baseType == 1) {
        this.view.sharepointTools = this.view.sharepointTools.filter(t => { return t.type != 'attachment' })
      }
      console.log("components : ", this.view.targetBuilderTools)

      this.view.targetBuilderTools = this.view.form.components;
      this.loading = false
      console.log(this.view);
      this._applicationRef.tick();  //A workaround to display data on browser back
    }, (e) => {
      // console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
      //TODO: Add toastr for error
      this.toastr.error(e, 'Form loading Error', { closeButton: true });
      this._applicationRef.tick();//A workaround to display data on browser back
    });
  }

  onDebug(e) {
    const activeModal = this.modalService.open(DebugComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );

    activeModal.componentInstance.view.targetBuilderTools = this.view.targetBuilderTools;
    this._applicationRef.tick();
    activeModal.result.then((userResponse) => {
      console.log(`User's choice: ${userResponse}`);
    });
  }

  onPreview() {
    const activeModal = this.modalService.open(PreviewComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static', windowClass: 'dw-modal-full-screen' }
    );

    activeModal.componentInstance.item = this.view.targetBuilderTools;
  }

  onSave(e) {
    let form = this.view.form;
    this.toastr.info('Saving...', '', { timeOut: 1500 });
    this.fs.saveForm(this.view.item.FileLeafRef, JSON.stringify(form),
      this.view.item.RefName,
      this.view.item.RefId, true)
      .then((r) => {
        this.toastr.success('Form saved successfully!', 'DONE!',
          { closeButton: true });
        console.log("Form savesuccessfully!");
      }, (e) => {
        console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
      });
  }

  onEdit(e) {
    const activeModal = this.modalService.open(FormPropertiesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );

    activeModal.componentInstance.view.targetBuilderTools = this.view.targetBuilderTools;
    activeModal.componentInstance.view.item = this.view.item;

    this._applicationRef.tick();
  }


  onLogic() {
    const activeModal = this.modalService.open(DWBRulesBuilderComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );

    activeModal.componentInstance.form = this.view.form;
    // activeModal.componentInstance.listData = this.listData;
    // activeModal.componentInstance.schema = this.schema;

    activeModal.result.then((obj) => {
      if (obj) {
      }
    });
  }

  onEditQueryRules() {
    const activeModal = this.modalService.open(DWBListRulesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );

    activeModal.componentInstance.form = this.view.form;
    // activeModal.componentInstance.listData = this.listData;
    // activeModal.componentInstance.schema = this.schema;

    activeModal.result.then((obj) => {
      if (obj) {
      }
    });
  }

  onDeleteItem(item) {
    console.log("Delete {0}", JSON.stringify(item, null, 4));
    this.removeItem(this.view.targetBuilderTools, item);
  }

  //Recursive function to delete item
  removeItem(parent, item) {
    for (let index = 0; index < parent.length; index++) {
      const element = parent[index];
      if (element == item) {
        parent.splice(index, 1);
        return;
      } else {
        const childrenKeys = Object.keys(parent[index]).filter(p => {
          return p.includes("children");
        });
        if (childrenKeys) {
          for (let index1 = 0; index1 < childrenKeys.length; index1++) {
            const element = parent[index][childrenKeys[index1]];
            this.removeItem(element, item);
          }
        }
      }
    }
  }

  onEditItem(item) {
    // console.log(item);
    // item.test = Math.random() * 100;
    // const activeModal = this.modalService.open(ElementPropertiesComponent,
    //   { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    // );

    // activeModal.componentInstance.view.targetBuilderTools = this.view.targetBuilderTools;
    // activeModal.componentInstance.view.item = this.view.item;
    // activeModal.componentInstance.view.elementItem = item;
    // this.view.targetBuilderTools = item;

    // console.log("view : ", this.view.item);

    console.log("item : ", item);

    
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}

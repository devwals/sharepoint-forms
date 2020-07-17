import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { SPDataService } from '../../services/sp-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageListForms } from '../models/ManageListForms';
import { SPFormService } from '../../services/sp-form.service';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends ManageListForms implements OnInit, OnDestroy {

  view: any = {};
  
  constructor(
    private _sps: SPDataService,
    private _fs: SPFormService,
    private _router: Router,
    private __applicationRef: ApplicationRef,
    private _toastr: ToastrService,
    private _modalService: NgbModal
  ) {
    super(_sps, _fs, _router, __applicationRef, _toastr, _modalService);
    this.getLists(0);
  }

  ngOnInit() {
    console.log("lists : ", this.view.listForms);
  }
}

import { Component, OnInit, ApplicationRef } from '@angular/core';
import { SPDataService } from '../../services/sp-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageListForms } from '../models/ManageListForms'
import { SPFormService } from '../../services/sp-form.service';

@Component({
  selector: 'libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent extends ManageListForms implements OnInit {
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
    this.getLists(1);
  }
}

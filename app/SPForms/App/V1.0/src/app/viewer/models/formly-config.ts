import { DwtabsComponent } from './../components/dwtabs/dwtabs.component';
import { DwdateTimeComponent } from './../components/dwdate-time/dwdate-time.component';
import { DwplainTextMultiLineComponent } from './../components/dwplain-text-multi-line/dwplain-text-multi-line.component';
import { DwrichTextComponent } from './../components/dwrich-text/dwrich-text.component';
import { DwnumberComponent } from './../components/dwnumber/dwnumber.component';
import { DwhorizontalLineComponent } from './../components/dwhorizontal-line/dwhorizontal-line.component';
import { DwdropdownComponent } from './../components/dwdropdown/dwdropdown.component';
import { DwbuttonComponent } from './../components/dwbutton/dwbutton.component';
import { DWLookupComponent } from './../components/dwlookup/dwlookup.component';
import { ConfigOption } from '@ngx-formly/core';
import { DWBootstrapWrapperComponent } from '../wrappers/dwbootstrap/dwbootstrap-wrapper.component';
import { DWVDatePickerComponent } from '../components/dwvdate-picker/dwvdate-picker.component';
import { DwtextBoxComponent } from '../components/dwtext-box/dwtext-box.component';
import { DWPeopleComponent } from '../components/dwpeople/dwpeople.component';
import { DWManagedMetadataComponent } from '../components/dwmanaged-metadata/dwmanaged-metadata.component';
import { DwyesNoComponent } from '../components/dwyes-no/dwyes-no.component';
import { DwverticalLineComponent } from '../components/dwvertical-line/dwvertical-line.component';
import { DwmultiChoiceComponent } from '../components/dwmulti-choice/dwmulti-choice.component';
import { DwlinkComponent } from '../components/dwlink/dwlink.component';
import { DwcalculatedComponent } from '../components/dwcalculated/dwcalculated.component';
import { DwlabelComponent } from '../components/dwlabel/dwlabel.component';
import { DwimageComponent } from '../components/dwimage/dwimage.component';
import { DwvsectionComponent } from '../components/dwvsection/dwvsection.component';
import { PanelWrapperComponent } from '../wrappers/panel/panel-wrapper.component';
import { DWAttachFileComponent } from '../components/dwattach-file/dwattach-file.component';
import { DwcolumnsComponent } from '../components/dwcolumns/dwcolumns.component';
import { DWDocumentUploadComponent } from '../components/dwdocument-upload/dwdocument-upload.component';
import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldCheckbox } from '@ngx-formly/bootstrap';
import { DwMultiCheckboxComponent } from '../components/dwmulticheckbox/dwmulticheckbox.component';

export function RequiredValidator(control: FormControl): ValidationErrors {
    return /./.test(control.value) ? null : { 'req': true };
}

export const DW_FORMLY_CONFIG: ConfigOption = {
    validationMessages: [
        { name: 'required', message: 'This field is required' },
    ],
    wrappers: [
        { name: 'dw-bootstrap', component: DWBootstrapWrapperComponent },
        { name: 'panel', component: PanelWrapperComponent },
    ],
    types: [
        {
            name: 'lookup',
            component: DWLookupComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'date',
            component: DWVDatePickerComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'textfield',
            component: DwtextBoxComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'user',
            component: DWPeopleComponent,
            wrappers: ['dw-bootstrap'],
        },
        {
            name: 'managedmetadata',
            component: DWManagedMetadataComponent,
            wrappers: ['dw-bootstrap'],
        },
        {
            name: 'button',
            component: DwbuttonComponent
        },
        {
            name: 'dropdown',
            component: DwdropdownComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'yesno',
            component: DwyesNoComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'verticalline',
            component: DwverticalLineComponent
        },
        {
            name: 'horizontalline',
            component: DwhorizontalLineComponent
        },
        {
            name: 'choice',
            component: DwmultiChoiceComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'checkbox',
            component: FormlyFieldCheckbox,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'multicheckbox',
            component: DwMultiCheckboxComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'number',
            component: DwnumberComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'richtext',
            component: DwrichTextComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'textfieldmulti',
            component: DwplainTextMultiLineComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'link',
            component: DwlinkComponent
        },
        {
            name: 'calculated',
            component: DwcalculatedComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'label',
            component: DwlabelComponent
        },
        {
            name: 'image',
            component: DwimageComponent
        },
        {
            name: 'datetime',
            component: DwdateTimeComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'tabs',
            component: DwtabsComponent
        },
        {
            name: 'section',
            component: DwvsectionComponent
        },
        {
            name: 'attachment',
            component: DWAttachFileComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'user',
            component: DWPeopleComponent,
            wrappers: ['dw-bootstrap']
        },
        {
            name: 'columns',
            component: DwcolumnsComponent
        },
        {
            name: 'document',
            component: DWDocumentUploadComponent,
            wrappers: ['dw-bootstrap']
        }
    ]
};

import { NgModule } from "@angular/core";
import { DWBootstrapWrapperComponent } from "../viewer/wrappers/dwbootstrap/dwbootstrap-wrapper.component";
import { CommonModule } from "@angular/common";
import { DWVDatePickerComponent } from "../viewer/components/dwvdate-picker/dwvdate-picker.component";
import { DWLookupComponent } from "../viewer/components/dwlookup/dwlookup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { DW_FORMLY_CONFIG } from "../viewer/models/formly-config";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { ThemeModule } from "../@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PreviewComponent } from "../viewer/preview/preview.component";
import { DwtextBoxComponent } from "../viewer/components/dwtext-box/dwtext-box.component";
import { DWPeopleComponent } from "../viewer/components/dwpeople/dwpeople.component";
import { DWManagedMetadataComponent } from "../viewer/components/dwmanaged-metadata/dwmanaged-metadata.component";
import { PanelWrapperComponent } from "../viewer/wrappers/panel/panel-wrapper.component";
import { DwbuttonComponent } from "../viewer/components/dwbutton/dwbutton.component";
import { DwdropdownComponent } from "../viewer/components/dwdropdown/dwdropdown.component";
import { DwyesNoComponent } from "../viewer/components/dwyes-no/dwyes-no.component";
import { DwverticalLineComponent } from "../viewer/components/dwvertical-line/dwvertical-line.component";
import { DwhorizontalLineComponent } from "../viewer/components/dwhorizontal-line/dwhorizontal-line.component";
import { DwnumberComponent } from "../viewer/components/dwnumber/dwnumber.component";
import { DwmultiChoiceComponent } from "../viewer/components/dwmulti-choice/dwmulti-choice.component";
import { DwrichTextComponent } from "../viewer/components/dwrich-text/dwrich-text.component";
import { DwplainTextMultiLineComponent } from "../viewer/components/dwplain-text-multi-line/dwplain-text-multi-line.component";
import { DwlinkComponent } from "../viewer/components/dwlink/dwlink.component";
import { DwdateTimeComponent } from "../viewer/components/dwdate-time/dwdate-time.component";
import { DwlabelComponent } from "../viewer/components/dwlabel/dwlabel.component";
import { DwcalculatedComponent } from "../viewer/components/dwcalculated/dwcalculated.component";
import { DwimageComponent } from "../viewer/components/dwimage/dwimage.component";
import { DwtabsComponent } from "../viewer/components/dwtabs/dwtabs.component";
import { DwvsectionComponent } from "../viewer/components/dwvsection/dwvsection.component";
import { DWAttachFileComponent } from "../viewer/components/dwattach-file/dwattach-file.component";
import { DwcolumnsComponent } from "../viewer/components/dwcolumns/dwcolumns.component";
import { DWDocumentUploadComponent } from "../viewer/components/dwdocument-upload/dwdocument-upload.component";
import { NgxTinymceModule } from 'ngx-tinymce';
import { DwMultiCheckboxComponent } from "../viewer/components/dwmulticheckbox/dwmulticheckbox.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(
            DW_FORMLY_CONFIG
        ),
        FormlyBootstrapModule,
        ThemeModule,
        NgxTinymceModule.forRoot({
          baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/'
        }),
        NgbModule.forRoot()
    ],
    declarations: [
        DWBootstrapWrapperComponent,
        DWVDatePickerComponent,
        DWLookupComponent,
        PreviewComponent,
        DwtextBoxComponent,
        DWPeopleComponent,
        DWManagedMetadataComponent,
        DWBootstrapWrapperComponent,
        PanelWrapperComponent,
        DwbuttonComponent,
        DwdropdownComponent,
        DwyesNoComponent,
        DwverticalLineComponent,
        DwhorizontalLineComponent,
        DwmultiChoiceComponent,
        DwnumberComponent,
        DwrichTextComponent,
        DwplainTextMultiLineComponent,
        DwlinkComponent,
        DwcalculatedComponent,
        DwlabelComponent,
        DwimageComponent,
        DwdateTimeComponent,
        DwtabsComponent,
        DwvsectionComponent,
        DWAttachFileComponent,
        DwcolumnsComponent,
        DWDocumentUploadComponent,
        DwMultiCheckboxComponent
    ],
    exports: [
        DWBootstrapWrapperComponent,
        DWVDatePickerComponent,
        DWLookupComponent,
        PreviewComponent,
        DwtextBoxComponent,
        DWPeopleComponent,
        FormlyModule,
        FormlyBootstrapModule,
        DWManagedMetadataComponent,
        PanelWrapperComponent,
        DwbuttonComponent,
        DwdropdownComponent,
        DwyesNoComponent,
        DwverticalLineComponent,
        DwhorizontalLineComponent,
        DwmultiChoiceComponent,
        DwnumberComponent,
        DwrichTextComponent,
        DwplainTextMultiLineComponent,
        DwlinkComponent,
        DwcalculatedComponent,
        DwlabelComponent,
        DwimageComponent,
        DwdateTimeComponent,
        DwtabsComponent,
        DwvsectionComponent,
        DWAttachFileComponent,
        DwcolumnsComponent,
        DWDocumentUploadComponent,
        DwMultiCheckboxComponent
    ],
    entryComponents: [PreviewComponent]
})
export class SharedModule { }

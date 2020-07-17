import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { DebugComponent } from './dialogs/debug/debug.component';
import { FormPropertiesComponent } from './dialogs/form-properties/form-properties.component';
import { ElementPropertiesComponent } from './dialogs/element-properties/element-properties.component';
import { DWButtonComponent } from './components/dwbutton/dwbutton.component';
import { DWSectionComponent } from './components/dwsection/dwsection.component';
import { DWDateComponent } from './components/dwdate/dwdate.component';
import { DWDateTimeComponent } from './components/dwdate-time/dwdate-time.component';
import { DWDropdownComponent } from './components/dwdropdown/dwdropdown.component';
import { DWImageComponent } from './components/dwimage/dwimage.component';
import { DWLabelComponent } from './components/dwlabel/dwlabel.component';
import { DWMultiChoiceComponent } from './components/dwmulti-choice/dwmulti-choice.component';
import { DWNumberComponent } from './components/dwnumber/dwnumber.component';
import { DWPlainTextMultiLineComponent } from './components/dwplain-text-multi-line/dwplain-text-multi-line.component';
import { DWRichTextComponent } from './components/dwrich-text/dwrich-text.component';
import { DWTextBoxComponent } from './components/dwtext-box/dwtext-box.component';
import { DWYesNoComponent } from './components/dwyes-no/dwyes-no.component';
import { DWFileAttachmentComponent } from './components/dwfile-attachment/dwfile-attachment.component';
import { DWDocumentUploadComponent } from './components/dwdocument-upload/dwdocument-upload.component';
import { DWListLookupComponent } from './components/dwlist-lookup/dwlist-lookup.component';
import { DWManagedMetadataComponent } from './components/dwmanaged-metadata/dwmanaged-metadata.component';
import { DWPeopleComponent } from './components/dwpeople/dwpeople.component';
import { DWColumnsComponent } from './components/dwcolumns/dwcolumns.component';
import { DWHorizontalLineComponent } from './components/dwhorizontal-line/dwhorizontal-line.component';
import { DWPanelComponent } from './components/dwpanel/dwpanel.component';
import { DWVerticalLineComponent } from './components/dwvertical-line/dwvertical-line.component';
import { DWTabComponent } from './components/dwtab/dwtab.component';
import { DWTabItemComponent } from './components/dwtab/dwtab-item/dwtab-item.component';
import { DWComponentLoaderComponent } from './components/dwcomponent-loader/dwcomponent-loader.component';
import { DWErrorComponent } from './components/dwerror/dwerror.component';
import { DWColumnItemComponent } from './components/dwcolumns/dwcolumn-item/dwcolumn-item.component';
import { DwlookupComponent } from './components/dwlookup/dwlookup.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ValidationPropertiesComponent } from './dialogs/element-properties/validation-properties/validation-properties.component';
import { GeneralPropertiesComponent } from './dialogs/element-properties/general-properties/general-properties.component';
import { DropdownPropertiesComponent } from './components/dwdropdown/dropdown-properties/dropdown-properties.component';
import { MultiChoicePropertiesComponent } from './components/dwmulti-choice/multi-choice-properties/multi-choice-properties.component';
import { HorizontalLinePropertiesComponent } from './components/dwhorizontal-line/horizontal-line-properties/horizontal-line-properties.component';
import { YesNoPropertiesComponent } from './components/dwyes-no/yes-no-properties/yes-no-properties.component';
import { TextBoxPropertiesComponent } from './components/dwtext-box/text-box-properties/text-box-properties.component';
import { DatePropertiesComponent } from './components/dwdate/date-properties/date-properties.component';
import { LabelPropertiesComponent } from './components/dwlabel/label-properties/label-properties.component';
import { DateTimePropertiesComponent } from './components/dwdate-time/date-time-properties/date-time-properties.component';
import { VerticalLinePropertiesComponent } from './components/dwvertical-line/vertical-line-properties/vertical-line-properties.component';
import { SharepointPropertiesComponent } from './dialogs/element-properties/sharepoint-properties/sharepoint-properties.component';
import { PeoplePropertiesComponent } from './components/dwpeople/people-properties/people-properties.component';
import { LookupPropertiesComponent } from './components/dwlookup/lookup-properties/lookup-properties.component';
import { ManagedMetadataPropertiesComponent } from './components/dwmanaged-metadata/managed-metadata-properties/managed-metadata-properties.component';
import { ListLookupPropertiesComponent } from './components/dwlist-lookup/list-lookup-properties/list-lookup-properties.component';
import { DwlinkComponent } from './components/dwlink/dwlink.component';
import { DWCalculatedComponent } from './components/dwcalculated/dwcalculated.component';
import { ImagePropertiesComponent } from './components/dwimage/image-properties/image-properties.component';
import { LinkPropertiesComponent } from './components/dwlink/link-properties/link-properties.component';
import { NumberPropertiesComponent } from './components/dwnumber/number-properties/number-properties.component';
import { PlainTextMultiLinePropertiesComponent } from './components/dwplain-text-multi-line/plain-text-multi-line-properties/plain-text-multi-line-properties.component';
import { RichTextPropertiesComponent } from './components/dwrich-text/rich-text-properties/rich-text-properties.component';
import { ButtonPropertiesComponent } from './components/dwbutton/button-properties/button-properties.component';
import { TabItemPropertiesComponent } from './components/dwtab/tab-item-properties/tab-item-properties.component';
import { SectionPropertiesComponent } from './components/dwsection/section-properties/section-properties.component';
import { ColumnItemPropertiesComponent } from './components/dwcolumns/dwcolumn-item/column-item-properties/column-item-properties.component';
import { SharedModule } from '../../../shared/shared.module';
import { DWNestedFormComponent } from './components/dwnested-form/dwnested-form.component';
import { DWNestedFormPropertiesComponent } from './components/dwnested-form/nested-form-properties/dw-nested-form-properties.component';
import { DWBRulesBuilderComponent } from './dialogs/dwb-rules-builder/dwb-rules-builder.component';
import { QueryBuilderModule } from "angular2-query-builder";
import { DWBListRulesComponent } from './dialogs/dwb-list-rules/dwb-list-rules.component';

@NgModule({
  imports: [
    QueryBuilderModule,
    CommonModule,
    NgxDnDModule,
    FormsModule,
    NgxJsonViewerModule,
    ThemeModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    BuilderComponent,
    DebugComponent,
    FormPropertiesComponent,
    ElementPropertiesComponent,
    DWButtonComponent, 
    DWSectionComponent, 
    DWNestedFormComponent,
    DWDateComponent, 
    DWDateTimeComponent, 
    DWDropdownComponent, 
    DWImageComponent, 
    DWLabelComponent, 
    DWMultiChoiceComponent, 
    DWNumberComponent, 
    DWPlainTextMultiLineComponent, 
    DWRichTextComponent, 
    DWTextBoxComponent, 
    DWYesNoComponent, 
    DWFileAttachmentComponent, 
    DWDocumentUploadComponent, 
    DWListLookupComponent, 
    DWManagedMetadataComponent, 
    DWPeopleComponent, 
    DWColumnsComponent, 
    DWHorizontalLineComponent, 
    DWPanelComponent, 
    DWVerticalLineComponent, 
    DWTabComponent, 
    DWTabItemComponent, 
    DWComponentLoaderComponent, 
    DWErrorComponent, 
    DWColumnItemComponent,
    DwlookupComponent,
    ValidationPropertiesComponent,
    GeneralPropertiesComponent,
    DropdownPropertiesComponent,
    MultiChoicePropertiesComponent,
    HorizontalLinePropertiesComponent,
    YesNoPropertiesComponent,
    TextBoxPropertiesComponent,
    DatePropertiesComponent,
    LabelPropertiesComponent,
    DateTimePropertiesComponent,
    VerticalLinePropertiesComponent,
    SharepointPropertiesComponent,
    PeoplePropertiesComponent,
    LookupPropertiesComponent,
    ManagedMetadataPropertiesComponent,
    ListLookupPropertiesComponent,
    DwlinkComponent,
    DWCalculatedComponent,
    ImagePropertiesComponent,
    LinkPropertiesComponent,
    NumberPropertiesComponent,
    PlainTextMultiLinePropertiesComponent,
    RichTextPropertiesComponent,
    ButtonPropertiesComponent,
    TabItemPropertiesComponent,
    SectionPropertiesComponent,
    ColumnItemPropertiesComponent,
    DWNestedFormPropertiesComponent,
    DWBRulesBuilderComponent,
    DWBListRulesComponent
  ],
  entryComponents: [
    DWBListRulesComponent,
    DWBRulesBuilderComponent,
    DebugComponent, 
    FormPropertiesComponent,
    ElementPropertiesComponent,
    TabItemPropertiesComponent,
    ColumnItemPropertiesComponent,
    DWButtonComponent, 
    DWSectionComponent,
    DWNestedFormComponent,
    DWDateComponent, 
    DWDateTimeComponent, 
    DWDropdownComponent, 
    DWImageComponent, 
    DWLabelComponent, 
    DWMultiChoiceComponent, 
    DWNumberComponent, 
    DWPlainTextMultiLineComponent, 
    DWRichTextComponent, 
    DWTextBoxComponent, 
    DWYesNoComponent, 
    DWFileAttachmentComponent, 
    DWDocumentUploadComponent, 
    DWListLookupComponent, 
    DWManagedMetadataComponent, 
    DWPeopleComponent, 
    DWColumnsComponent, 
    DWHorizontalLineComponent, 
    DWPanelComponent, 
    DWVerticalLineComponent, 
    DWTabComponent, 
    DWTabItemComponent, 
    DWComponentLoaderComponent, 
    DWErrorComponent,
    DWColumnItemComponent,
    DwlookupComponent,
    DwlinkComponent,
    DWCalculatedComponent
  ]
})
export class BuilderModule { }

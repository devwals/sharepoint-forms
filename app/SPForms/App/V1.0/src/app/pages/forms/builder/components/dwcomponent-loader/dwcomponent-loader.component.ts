
import {
  Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef,
  ViewContainerRef, ComponentFactory, Input, Output, EventEmitter, Type, OnDestroy
} from '@angular/core';
import { IComponent } from '../iComponent.builder';

@Component({
  selector: 'dwcomponent-loader',
  templateUrl: './dwcomponent-loader.component.html',
  styleUrls: ['./dwcomponent-loader.component.scss']
})
export class DWComponentLoaderComponent implements OnInit, OnDestroy {
  @ViewChild("componentContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<IComponent>;
  @Input() model: any;
  @Input() listData : any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.createComponent();
  }

  createComponent() {
    var factories = Array.from(this.resolver['_factories'].keys());
    var factoryClass = <Type<any>>factories.find((x: any) =>

      this.model.type != undefined && this.model.type != null && x.type != undefined && x.type.toLowerCase() === this.model.type.toLowerCase() 
    );
    if (!factoryClass) {
      factoryClass = <Type<any>>factories.find((x: any) =>
        x.type === 'error'
      );
    }

    const factory: ComponentFactory<IComponent> = this.resolver.resolveComponentFactory(
      factoryClass
    );

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.model = this.model;
    this.componentRef.instance.listData = this.listData;
    this.componentRef.instance.deleteRequest = this.deleteRequest;
    this.componentRef.instance.editRequest = this.editRequest;
    this.componentRef.instance.logRequest = this.logRequest;
    
    //https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
    // this.componentRef.instance.output.subscribe(event => console.log(event));    

  }

  getComponentType() {
    return
  }

  ngOnDestroy(){
    this.componentRef.destroy();
  }
}

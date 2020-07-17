import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'label-properties',
  templateUrl: './label-properties.component.html',
  styleUrls: ['./label-properties.component.scss']
})
export class LabelPropertiesComponent implements OnInit {

  @Input() model: any;
  id = "";
  
  constructor() { }

  ngOnInit() {
  }

  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      this.id += possible.charAt(Math.floor(Math.random() * possible.length));
    
    console.log("id : ", this.id);
    return this.id;
  }
}

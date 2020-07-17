import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.scss']
})
export class ImagePropertiesComponent implements OnInit {

  @Input() model: any;
  
//image url
//image size
//alignment

//height width or aspect ratio (checkbox)

  constructor() { }

  ngOnInit() { }

}

import { EventEmitter } from '@angular/core';

export interface IComponent {
    model:any;
    listData:any;
    deleteRequest?:EventEmitter<any>;
    editRequest?:EventEmitter<any>;
    logRequest?:EventEmitter<any>;
}

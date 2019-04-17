import { Injectable } from '@angular/core';

declare var $: any;
declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class MaterializeService {

  constructor() { }

  init(): void{
    setTimeout( function() {
        M.AutoInit();
        M.updateTextFields();
    }, 0)
  }

  toast(text): void{
    M.toast({html: text})
  }

  toastDismiss(): void{
    var toastElement = document.querySelector('.toast');
    var toastInstance = M.Toast.getInstance(toastElement);
    toastInstance.dismiss();
  }
  
}

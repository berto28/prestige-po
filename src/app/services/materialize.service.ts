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

        
          var elems = document.querySelectorAll('.datepicker');
          var instances = M.Datepicker.init(elems, {
            format: 'mm/yyyy'
          });
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

  datePicker(): void{
    
    setTimeout( function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {
        format: 'mm/dd/yyyy'
      });
    }, 0)
  
  }

  dropdown(): void{
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
  }
  
}

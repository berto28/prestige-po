import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  icon: string = "assets/ico_prestige.png";
  isShow: boolean = false;
  supplier: string;
  
  constructor(public prestige: PrestigeService) {
    prestige.url = 'Suppliers';
   }

  ngOnInit() {
    this.prestige.M.init();

  }

  onSelectSupplier(supplier) {
    this.prestige.isShowProgressSupplier = true;
    this.supplier = supplier;
    this.prestige.getPOUsingSupplier(supplier);
  }

  onClickPrint(po){
    console.log(po)
    
    setTimeout( function() {
      let print = document.getElementById('print');
      let newWin= window.open("");
      newWin.document.write(print.outerHTML);
      newWin.print();
      newWin.close();
    }, 0)
  }

}

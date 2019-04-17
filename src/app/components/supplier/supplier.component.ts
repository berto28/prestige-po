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

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
    this.prestige.M.init();

  }

  onSelectSupplier(supplier) {
    this.isShow = true
    this.prestige.getPOUsingSupplier(supplier);
  }

  onClickPrint(po){
    console.log(po)
    
    let print = document.getElementById('print');
    let newWin= window.open("");
    newWin.document.write(print.outerHTML);
    newWin.print();
    newWin.close();
  }

}

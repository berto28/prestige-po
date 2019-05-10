import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../..//services/prestige.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit {

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
    this.prestige.getStockMaterials(null, null, null);
  }

  onClickViewScrap(material){
    this.prestige.getScrapUsingMaterial(material);
  }

  onClickEditMaterial(material){
    console.log(material)
    this.prestige.stocks_modalUpdateFields['key'] = material.stockKey;
    this.prestige.stocks_modalUpdateFields['fields'][0]['value'] = material.price;
    this.prestige.stocks_modalUpdateFields['fields'][1]['value'] = material.numberOfStock;
  }

  onClickUpdateModal(material){

    this.prestige.updateStock(material);

  }

  onClickDeleteMaterial(material){
    console.log(material)
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${material.materialName}</b>?
    </span><button id="${material.stockKey}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${material.stockKey}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteStock(material);
    });
  }
}

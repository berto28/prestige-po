import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-canvas-table',
  templateUrl: './canvas-table.component.html',
  styleUrls: ['./canvas-table.component.css']
})
export class CanvasTableComponent implements OnInit {
  
  startFrom: number = 0;
  toEnd: number = 20;
  search = ''
  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
    this.prestige.getTypeSupplierSectionColorName();
    if(this.prestige.materialList.length == 0){
      console.log('getting canvas')
      this.prestige.getCanvas();
      // this.prestige.itemCode();
    }
    
    this.onWindowScroll();
  }

  onWindowScroll(){
    window.onscroll = _ => {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight + 20;
      var height = d.offsetHeight;
      if (offset >= height) {
        this.toEnd+=20;
      }
    };
  }

  onClickEditMaterial(material){
    console.log(material)
    this.prestige.maaterial_modalUpdateFields['key'] = material.key;
    this.prestige.maaterial_modalUpdateFields['fields'][0]['value'] = material.materialName;
    this.prestige.maaterial_modalUpdateFields['fields'][1]['value'] = material.price;
    if(material.type == 'Accessories'){
      this.prestige.maaterial_modalUpdateFields['fields'][2] ={
        target: 'discountUpdate',
        label: 'Discount',
        type: 'number',
        value: material.discount.replace('.','')
      };
    }
  }

  onClickUpdateModal(updateMaterial){
    this.prestige.editCanvas(updateMaterial);
  }

  onClickDeleteMaterial(material){
    console.log(material)
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${material.materialName}</b>?
    </span><button id="${material.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${material.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteCanvas(material);
    });
  }


  onClickViewAll(): void{
    this.prestige.viewAllCanvas();
  }

  onKeyupSearch(){

    this.prestige.searchCanvas(this.search.toLowerCase());
    // console.log(this.search)
  }
}

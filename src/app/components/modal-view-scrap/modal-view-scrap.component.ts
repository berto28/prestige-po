import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-view-scrap',
  templateUrl: './modal-view-scrap.component.html',
  styleUrls: ['./modal-view-scrap.component.css']
})
export class ModalViewScrapComponent implements OnInit {

  newScrap: number = null;
  type = 'Aluminum';
  glassScrap = {
    w: null,
    h: null
  }
  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
  }

  onClickAddScrap(scrap){
    console.log(scrap)
    let isProceed = true;
    if(this.prestige.scrapType != 'Glass'){
      if(this.newScrap == null || this.newScrap < 1){
        this.prestige.M.toast('New scrap SHOULD NOT be 0 or LESS THAN 1');
        isProceed = false;
      }
      
      if(this.prestige.scrapBaseSize < this.newScrap){
        this.prestige.M.toast('New scrap SHOULD NOT GREATER THAN base size of material');
        isProceed = false;
      } 
      isProceed ? this.prestige.addScrapManually(scrap.stockKey, this.newScrap) : '';
    }
    else{
      
      if(this.glassScrap.w == null || this.glassScrap.w < 1 ){
        this.prestige.M.toast('New scrap width SHOULD NOT be 0 or LESS THAN 1');
        isProceed = false;
      }
      if(this.glassScrap.h == null || this.glassScrap.h < 1 ){
        this.prestige.M.toast('New scrap height SHOULD NOT be 0 or LESS THAN 1');
        isProceed = false;
      }

      if((this.prestige.scrapBaseSize.split(' x ')[0].replace('ft','') * 12) < this.glassScrap.w ||
        (this.prestige.scrapBaseSize.split(' x ')[1].replace('ft','') * 12) < this.glassScrap.h){
        this.prestige.M.toast('New scrap Width or Height SHOULD NOT GREATER THAN base size of material');
        isProceed = false;
      } 
      
      isProceed ?  this.prestige.addScrapManually(scrap.stockKey, `${this.glassScrap.w}in x ${this.glassScrap.h}in`): '';
    }

    this.newScrap = null;
    this.glassScrap.w = null;
    this.glassScrap.h = null;
  }

  onClickDeleteScrap(s){
    
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${s.materialName} scrap</b>?
    </span><button id="${s.stockKey}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${s.stockKey}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteScrap(s);
    });
  }

}

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

      if(this.prestige.scrapBaseSize.split(' x ')[0].replace('ft','') < this.glassScrap.w ||
        this.prestige.scrapBaseSize.split(' x ')[1].replace('ft','') < this.glassScrap.h){
        this.prestige.M.toast('New scrap Width or Height SHOULD NOT GREATER THAN base size of material');
        isProceed = false;
      } 
      
      isProceed ?  this.prestige.addScrapManually(scrap.stockKey, `${this.glassScrap.w}ft x ${this.glassScrap.h}ft`): '';
    }

    this.newScrap = null;
    this.glassScrap.w = null;
    this.glassScrap.h = null;
  }

}

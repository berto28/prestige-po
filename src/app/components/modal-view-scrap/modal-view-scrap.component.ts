import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-view-scrap',
  templateUrl: './modal-view-scrap.component.html',
  styleUrls: ['./modal-view-scrap.component.css']
})
export class ModalViewScrapComponent implements OnInit {

  newScrap: number = null;

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
  }

  onClickAddScrap(scrap){
    this.prestige.addScrapManually(scrap.stockKey, this.newScrap);
  }

}

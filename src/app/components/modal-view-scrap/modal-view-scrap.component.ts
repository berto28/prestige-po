import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-view-scrap',
  templateUrl: './modal-view-scrap.component.html',
  styleUrls: ['./modal-view-scrap.component.css']
})
export class ModalViewScrapComponent implements OnInit {

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
  }

}

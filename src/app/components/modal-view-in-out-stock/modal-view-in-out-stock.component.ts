import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-view-in-out-stock',
  templateUrl: './modal-view-in-out-stock.component.html',
  styleUrls: ['./modal-view-in-out-stock.component.css']
})
export class ModalViewInOutStockComponent implements OnInit {

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
  }

}

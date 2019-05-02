import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
    this.prestige.M.init();
    this.prestige.url = 'Stocks';
  }

}

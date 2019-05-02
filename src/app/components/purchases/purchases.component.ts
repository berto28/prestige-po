import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})

export class PurchasesComponent implements OnInit {

  constructor(public prestige: PrestigeService) { 
    this.prestige.url = 'Purchases';
  }

  ngOnInit() {
    this.prestige.M.init();
    this.prestige.getAllPO();
  }

  onChangeDate(event){
    
    let mm = event.target.value.split('/')[0];
    let yy = event.target.value.split('/')[1];
    
    this.prestige.filterPO(mm, yy);
    
  }
}

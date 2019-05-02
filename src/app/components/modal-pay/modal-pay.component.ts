import { Component, OnInit, Input } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-pay',
  templateUrl: './modal-pay.component.html',
  styleUrls: ['./modal-pay.component.css']
})
export class ModalPayComponent implements OnInit {
  @Input() pay;

  constructor(public prestige: PrestigeService) { 
    
  }

  ngOnInit() {}

  onClickPay(){
    this.prestige.payPO(this.pay);
  }

  onChangeDate(evt){
    this.pay.date = evt.target.value;
  }

}

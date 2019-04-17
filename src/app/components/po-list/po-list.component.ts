import { Component, OnInit, Input } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})
export class PoListComponent implements OnInit {
  @Input() poList;

  poClass = {
    paid: 'teal disabled',
    unpaid: 'red pulse'
  }

  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
  }

  onClickPayPO(key){
    
    var toastHTML = `<span>
      Pay PO#<b class="yellow-text">${key}</b>?
    </span><button id="${key}" class="btn-flat toast-action" >Pay</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${key}`).addEventListener('click', (event)=> {
      this.prestige.payPO(key)
    });
  }

}

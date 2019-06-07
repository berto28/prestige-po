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


  isShowModalPay: boolean = false;
  
  constructor(public prestige: PrestigeService) { }

  ngOnInit() {

  }

  onClickPayPO(key){

    var toastHTML = `<span>
    Pay PO#<b class="yellow-text">${key}</b>?
    </span><a id="check${key}" class="btn-flat toast-action modal-trigger" href="#modalPay">Check</a>
    <a id="cash${key}" class="btn-flat toast-action modal-trigger" href="#modalPay">Cash</a>`;
    this.prestige.M.toast(toastHTML);
    
    document.querySelector(`.toast #check${key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.pay = {
        projectKey: key,
        paidBy: 'check',
        date: null,
        field: {
          id: 'checkNumber',
          label: 'Check Number',
          value: null
        }
      };
      // this.prestige.payPO(key)
    });

    document.querySelector(`.toast #cash${key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.pay = {
        projectKey: key,
        paidBy: 'cash',
        date: null,
        field: {
          id: 'discount',
          label: 'Discount',
          value: null
        }
      };
      
      // this.prestige.payPO(key)
    });
    this.prestige.M.datePicker();
  }

  onClickViewCuttingList(po){
    console.log(po)
    // ALUMINUM////////////////////////////////////////
    let cuttingList = [];
    po.forEach( p => {
      let baseSize = p.baseSize;
      let numberOfSet = p.numberOfSet;

      let totalOfSetUsed = 0;

      let arr = [];
      while(numberOfSet > 0 ){
        baseSize = p.baseSize;
        let timesUsed = 0;
        let totalQty = 0;
        
        while(baseSize >= p.qty && numberOfSet > 0){
          numberOfSet-=1;
          baseSize-=p.qty;
          totalQty+=p.qty;
          timesUsed+=1;
        }
        let setUsed = 1;
        totalOfSetUsed+=1;

        arr.push({
          materialName:  p.materialName,
          qty: p.qty,
          timesUsed: timesUsed,
          setUsed: setUsed,
          baseSize: p.baseSize,
          totalQty: totalQty
        });
      }

      cuttingList.push({
       cuts: arr,
       totalOfSetUsed: totalOfSetUsed
      });
      // console.log('number of set that been used in ' + p.materialName +' ==== '+setUsed)
    });
    this.prestige.cuttingList = cuttingList;
  }
  
  cancelPO(po){
    var toastHTML = `<span>
      Are you sure you want to cancel <b class="yellow-text">PO #${po.poNumber}</b>?
    </span><button id="${po.key}" class="btn-flat toast-action" >Cancel</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${po.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      
      this.prestige.cancelPO(po);
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-modal-add-po',
  templateUrl: './modal-add-po.component.html',
  styleUrls: ['./modal-add-po.component.css']
})
export class ModalAddPoComponent implements OnInit {

  @Input() projectKey;

  supplierPick: string = null;
  colorPick: any = null;
  sectionPick: string = null;
  isRadioCheck: Array<any> = [false, false, false];
  switch: boolean = false;

  constructor(public prestige: PrestigeService) { 
    console.log(this.projectKey)
    this.prestige.dropdownSection.text = 'choose a section';
    this.prestige.dropdownSupplier.text = 'choose a supplier';
    this.prestige.stockList = [];
    this.prestige.projects_materialList = [];
  }

  ngOnInit() {
    
  }

  onSelectSupplier(supplier){
    console.log(supplier)
    this.supplierPick = supplier;
    
    this.getMaterials();
    // this.supplierPick != null ? 
    // this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick) : 
    // this.getMaterials() : '';
    
  }

  onSelectSection(section){
    this.sectionPick = section;
    // this.sectionPick != undefined ? this.getMaterials() : '';
    this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick) : 
    this.prestige.sortMaterials(this.sectionPick, this.colorPick);
  }

  getMaterials(){
    this.prestige.getMaterials(this.supplierPick, this.sectionPick, this.colorPick);
  }

  onClickRadioButton(color, evt, i){
    evt.preventDefault();
    
    console.log(color)
    this.colorPick = color;
    for(let c1 = 0; c1 < 3; c1++){
      this.isRadioCheck[c1] = false;
    }
    this.isRadioCheck[i] = true;

    this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick) : 
    this.prestige.sortMaterials(this.sectionPick, this.colorPick);
   
  }

  onClickCheckBox(m, evt){
    evt.preventDefault();

    // if(this.switch){
    //   m.isCheck =  m.stock > 0 ? !m.isCheck : m.isCheck;
    // }
    // else{
      m.isCheck = !m.isCheck;
    // }

   
  }

  onClickSavePO(){
    let jsonArray = [];

    if(this.switch){
      this.prestige.stockList.forEach( el => {
        el.isCheck != true ? jsonArray.unshift(el) : '\n';
      })
    }
    else{
      this.prestige.projects_materialList.forEach( el => {
        el.isCheck != true ? jsonArray.unshift(el) : '\n';
      })
    }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;
    console.log(jsonArray)
    
    let proceed = true;

    proceed = jsonArray.length == 0 ? false : true;

    if(proceed == false){
      this.prestige.M.toast(`Choose Material First`);
    }

    jsonArray.forEach( x => {
      if(x.qty == null || x.qty < 1){
        proceed =  false;
        this.prestige.M.toast(`Quantitiy of '${x.materialName}' should not be BLANK OR LESS THAN 1`)
      }
        
    });

    if(!this.switch){
      jsonArray.forEach( x => {

        jsonArray.forEach(y => {
          if(x.supplier != y.supplier){
            proceed = false;
            
          }
        });
  
      });
    }

  //  proceed == false ? this.prestige.M.toast(`"SUPPLIER" should be the same.`): ''; 


    proceed ?  this.prestige.addPO(jsonArray, this.projectKey, date, this.switch) : '';
  }

  onClickSwitch(evt){
    evt.preventDefault();
    this.switch = !this.switch;
    this.switch ? this.prestige.getStockMaterials(this.sectionPick, this.colorPick) : this.getMaterials();
   
  }

  onClickViewScrap(stockKey){
    this.prestige.viewScrap(stockKey)
  }

  onChangeQty(m){
    
    if(this.switch){
      // if(m.qty > m.stock){
      //   m.numberOfStock = 0;
      //   m.qty = m.stock;
      // }
      if(m.qty > 252){
        // m.numberOfStock = 0;
        m.qty = 252;
      }
      
      // if(m.numberOfSet > m.stock){
      //     m.numberOfStock = 0;
      //     m.numberOfSet = m.stock;
      // }
      // else{
      //   m.numberOfStock = m.stock - m.numberOfSet;
      // }
    }

  }
}

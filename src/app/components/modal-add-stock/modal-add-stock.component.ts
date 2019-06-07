import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-modal-add-stock',
  templateUrl: './modal-add-stock.component.html',
  styleUrls: ['./modal-add-stock.component.css']
})
export class ModalAddStockComponent implements OnInit {

  constructor(public prestige: PrestigeService) { 
    prestige.getSupplier();
  }

  supplierPick: string = null;
  colorPick: any = null;
  sectionPick: string;
  isRadioCheck: Array<any> = [false, false, false];

  type = 'Aluminum';
  ngOnInit() {
  }

  onSelectSupplier(supplier){
    console.log(supplier)
    this.supplierPick = supplier;
    this.supplierPick != undefined ? this.getMaterials() : '';
  }

  onSelectSection(section){
    this.sectionPick = section;
    this.prestige.sortMaterials(this.sectionPick, this.colorPick, this.type);
    
  }
  

  getMaterials(){
    this.prestige.getMaterials(this.supplierPick, this.sectionPick, this.colorPick, this.type);
  }

  onClickRadioButton(color, evt, i){
    evt.preventDefault();
    
    console.log(color)
    this.colorPick = color;
    for(let c1 = 0; c1 < 3; c1++){
      this.isRadioCheck[c1] = false;
    }
    this.isRadioCheck[i] = true;

    this.prestige.sortMaterials(this.sectionPick, this.colorPick, this.type)
   
  }
  
  onClickCheckBox(m, evt){
    evt.preventDefault();
    m.isCheck = !m.isCheck;
  }

  onClickSaveStock(){
    let jsonArray = [];

    this.prestige.projects_materialList.forEach( el => {
      el.isCheck != true ? jsonArray.unshift(el) : '\n';
    })

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;
    
    let proceed = true;

    proceed = jsonArray.length != 0 ? true : false;

    jsonArray.forEach( x => {
      if(x.numberOfSet == null || x.numberOfSet < 1){
        proceed =  false;
        this.prestige.M.toast(`Quantitiy of '${x.materialName}' should not be BLANK OR LESS THAN 1`)
      }
    });

    proceed ?  this.prestige.addStock(jsonArray, date) : '';
  }

  onClickRadioType(type){
    this.type = type;
    this.supplierPick = null;
    this.colorPick = null;
    this.sectionPick = null;
    console.log('asd')
    this.prestige.dropdownSupplierGlass['text'] = 'Choose Supplier';
    this.prestige.dropdownSectionGlass['text'] = 'Choose Section';
    this.prestige.dropdownSection['text'] = 'Choose Section';
    this.prestige.dropdownSupplier['text'] = 'Choose Supplier';
    this.prestige.projects_materialList = [];
    this.prestige.getSupplierCheckBox(type);
    this.prestige.sortMaterials(this.sectionPick, this.colorPick, this.type);
  }

}

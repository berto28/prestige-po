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
  type = '';
  constructor(public prestige: PrestigeService) { 
    console.log(this.projectKey)
    prestige.getTypeSupplierSectionColorName();
    prestige.getSupplier();
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
    // this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick, this.type) : 
    // this.getMaterials();
    
  }

  onSelectSection(section){
    this.sectionPick = section;
    // this.sectionPick != undefined ? this.getMaterials() : '';
    this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick, this.type) : 
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

    this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick, this.type) : 
    this.prestige.sortMaterials(this.sectionPick, this.colorPick, this.type);
   
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
      console.log(x)
      if(x.numberOfSet == null || x.numberOfSet < 1){
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
    this.prestige.addingPOLoader = proceed == true ? true : false;
    proceed ?  this.prestige.addPO(jsonArray, this.projectKey, date, this.switch) : '';
  }

  onClickSwitch(evt){
    evt.preventDefault();
    this.supplierPick = null;
    this.colorPick = null;
    this.sectionPick = null;
    this.prestige.dropdownColor['text'] = 'Choose Color';
    this.prestige.dropdownSection['text'] = 'Choose Section';
    this.prestige.dropdownSupplier['text'] = 'Choose Supplier';
    this.switch = !this.switch;
    this.switch ? this.prestige.getStockMaterials(this.sectionPick, this.colorPick, this.type) : this.getMaterials();
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

      if(m.type == 'Aluminum'){
        if(m.qty > 252){
          // m.numberOfStock = 0;
          m.qty = 252;
        }
      }
      else if(m.type == 'Accessories'){
        if(m.numberOfSet > m.stock){
            m.numberOfStock = 0;
            m.numberOfSet = m.stock;
        }
        else{
          m.numberOfStock = m.stock - m.numberOfSet;
        }
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

  onClickRadioType(type){
    this.type = type;
    this.supplierPick = null;
    this.colorPick = null;
    this.sectionPick = null;
    console.log(this.type)
    this.prestige.dropdownSupplierGlass['text'] = 'Choose Supplier';
    this.prestige.dropdownSectionGlass['text'] = 'Choose Section';
    this.prestige.dropdownSection['text'] = 'Choose Section';
    this.prestige.dropdownSupplier['text'] = 'Choose Supplier';
    this.prestige.projects_materialList = [];
    for(let c1 = 0; c1 < 3; c1++){
      this.isRadioCheck[c1] = false;
    }
    this.prestige.getSupplierCheckBox(type);
    this.switch ? this.prestige.sortMaterialsStock(this.sectionPick, this.colorPick, this.type) : 
    this.prestige.sortMaterials(this.sectionPick, this.colorPick, this.type);
   
  }

  onChangeSize(m){

    if(this.switch){
      // let baseW = parseFloat(m.baseSize.split(' x ')[0].replace('ft','')) * 12;
      // let baseH = parseFloat(m.baseSize.split(' x ')[1].replace('ft','')) * 12;
      
      // let mWidth = this.prestige.fractionToInches(m.width+'');
      // let mHeight = this.prestige.fractionToInches(m.height+'');


      // m.width = baseW < mWidth ? baseW : mWidth;
      // m.height = baseH < mHeight ? baseH : mHeight;
    }


  }

  onSelectCutStyle(cutStyle){
    console.log(cutStyle)
  }

  onClickGlassCutStle(m, e){
    e.preventDefault();
    m.glassCutStyle = !m.glassCutStyle;
    console.log(m.glassCutStyle)
  }

}

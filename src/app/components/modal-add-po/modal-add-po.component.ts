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
  sectionPick: string;
  isRadioCheck: Array<any> = [false, false, false];


  constructor(public prestige: PrestigeService) { }

  ngOnInit() {
    console.log(this.projectKey)
  }

  onSelectSupplier(supplier){
    console.log(supplier)
    this.supplierPick = supplier;
    this.supplierPick != undefined ? this.getMaterials() : '';
  }

  onSelectSection(section){
    this.sectionPick = section;
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

    this.prestige.sortMaterials(this.sectionPick, this.colorPick)
   
  }

  onClickCheckBox(m, evt){
    evt.preventDefault();
    m.isCheck = !m.isCheck;
  }

  onClickSavePO(){
    let jsonArray = [];

    this.prestige.projects_materialList.forEach( el => {
      el.isCheck != true ? jsonArray.unshift(el) : '\n';
    })

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;
    console.log(jsonArray)
    
    let proceed = true;
    jsonArray.forEach( x => {
      if(x.qty == null || x.qty < 1){
        proceed =  false;
        this.prestige.M.toast(`Quantitiy of '${x.materialName}' should not be BLANK OR LESS THAN 1`)
      }
        
    });

    proceed ?  this.prestige.addPO(jsonArray, this.projectKey, date) : '';
  }
}

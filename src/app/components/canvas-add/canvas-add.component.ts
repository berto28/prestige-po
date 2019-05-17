import { Component, OnInit } from '@angular/core';

import { PrestigeService } from '../../services/prestige.service';
import { MaterializeService } from '../../services/materialize.service';

@Component({
  selector: 'app-canvas-add',
  templateUrl: './canvas-add.component.html',
  styleUrls: ['./canvas-add.component.css']
})
export class CanvasAddComponent implements OnInit {

 
  materialName: string;
  materialPrice: number;

  // isRadioCheck: Array<any> = [true, false, false];
  // materialType: Array<string> = ['Aluminum', 'Glass', 'Accessories'];
  type = 'Aluminum';

  constructor(public prestige: PrestigeService,
              public materialService: MaterializeService) {
    prestige.url = 'Canvas';
  }
 
  ngOnInit() {
    this.materialService.init();
  }

  onClickColor(color:string):void {
    this.prestige.canvas_colorPick = color;
    this.prestige.getCanvasUsingDropdown(this.prestige.canvas_supplierPick, this.prestige.canvas_sectionPick, this.prestige.canvas_colorPick);
  }

  onSelectSection(section: string): void {
    this.prestige.canvas_sectionPick = section;
    this.prestige.getCanvasUsingDropdown(this.prestige.canvas_supplierPick, this.prestige.canvas_sectionPick, this.prestige.canvas_colorPick);
  }

  onSelectSupplier(supplier: string): void {
    this.prestige.canvas_supplierPick = supplier;
    this.prestige.getCanvasUsingDropdown(this.prestige.canvas_supplierPick, this.prestige.canvas_sectionPick, this.prestige.canvas_colorPick);
  }

  onClickSaveMaterial(): void {
      let ctr = 1;
      let isProceed = false;

      let toastMessage = `Add material first by clicking "+" button before saving.`;
      this.prestige.materials.length == 0 ? this.materialService.toast(toastMessage) : '';

      isProceed = this.prestige.canvas_supplierPick == '' || this.prestige.canvas_supplierPick == null ? false : true;
      toastMessage = `Please pick a supplier`;
      isProceed ? '' : this.materialService.toast(toastMessage);

      isProceed = this.prestige.canvas_sectionPick == '' || this.prestige.canvas_sectionPick == null ? false : true;
      toastMessage = `Please pick a section`;
      isProceed ? '' : this.materialService.toast(toastMessage);

      if(this.type != 'Accessories'){
        isProceed = this.prestige.canvas_colorPick == '' || this.prestige.canvas_colorPick == null ? false : true;
        toastMessage = `Please pick a color`;
        isProceed ? '' : this.materialService.toast(toastMessage);
      }
      this.prestige.materials.forEach(element => {
        let num = ctr == 1 ? '1st' : ctr == 2 ? '2nd' : ctr == 3 ? '3rd' : ctr+'th';

        let toastMessage = `${num} Material&nbsp;<span class="yellow-text"><b>NAME</b></span>&nbspshould not be blank`;
        isProceed = element['name'] == '' || element['name'] == null ? false : true;
    
        isProceed ? '' : this.materialService.toast(toastMessage);

        toastMessage = `${num} Material&nbsp;<span class="yellow-text"><b>Price</b></span>&nbspshould not be 0 or blank`;
        // isProceed = element['price'] == '' || element['price'] == null ? false : true;
        
        isProceed ? '' : this.materialService.toast(toastMessage);

        ctr+=1;
      });

      isProceed == true  ? this.saveMaterial() : false ;
  }

  saveMaterial(){
    let obj = {
      supplier: this.prestige.canvas_supplierPick,
      section: this.prestige.canvas_sectionPick,
      color: this.prestige.canvas_colorPick,
      materials: this.prestige.materials,
      type: this.type
    };

    this.prestige.addCanvas(obj);
  }

  onClickAddMaterial(): void {

    this.prestige.materials.push(
      {
        name: '',
        price: ''
      }
    );
  }

  onClickClose(index): void {
    this.prestige.materials.splice(index,1);
  }

  onClickRadioButton(type){
    this.type = type;
  }

}

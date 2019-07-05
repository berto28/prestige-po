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
  type = '';
  arraySupplier: any  = [];
  arraySection: any = [];
  arrayColor: any = [];
  typeKey = '';
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

  onClickCheckBox(supplier, e, option){
    e.preventDefault();
    supplier.isCheck = !supplier.isCheck;
    console.log(supplier.isCheck)
    
    if(option == 'supplier'){
      let arrSupplier = [];
      this.prestige.supplierCheckBox.forEach( x => {
        x.isCheck ? arrSupplier.unshift(x) : ''
      });

      
      this.prestige.getCanvasUsingSupplier(arrSupplier.length == 0 ? null : arrSupplier)
    }

    else if(option == 'section'){
      let arraySection = [];
      this.prestige.sectionCheckBox.forEach( x => {
        x.isCheck ? arraySection.unshift(x) : ''
      });

      this.prestige.getCanvasUsingSection(arraySection.length == 0 ? null : arraySection)
    }

    else if(option == 'color'){
      let arrColor = [];
      this.prestige.colorCheckBox.forEach( x => {
        x.isCheck ? arrColor.unshift(x) : ''
      });

      this.prestige.getCanvasUsingColor(arrColor.length == 0 ? null : arrColor)
    }
   
  }

  onClickSaveMaterial(): void {

      
    let ctr = 1;
    let isProceed = false;

    


    this.arraySupplier = [];
    this.prestige.supplierCheckBox.forEach( x => {
      x.isCheck ? this.arraySupplier.unshift(x) : ''
    });

    this.arraySection = [];
    this.prestige.sectionCheckBox.forEach( x => {
      x.isCheck ? this.arraySection.unshift(x) : ''
    });

    this.arrayColor = [];
    this.prestige.colorCheckBox.forEach( x => {
      x.isCheck ? this.arrayColor.unshift(x) : ''
    });

    isProceed = this.arraySupplier.length == 0 ? false : true;
    isProceed ? '' : this.materialService.toast(`Please pick a supplier`);

    isProceed = this.arraySection.length == 0 ? false : true;
    isProceed ? '' : this.materialService.toast(`Please pick a section`);

    isProceed = this.arrayColor.length == 0 && this.type !='Accessories' ? false : true;
    isProceed ? '' : this.materialService.toast(`Please pick a color`);
    // isProceed = this.prestige.canvas_supplierPick == '' || this.prestige.canvas_supplierPick == null ? false : true;
    // toastMessage = `Please pick a supplier`;
    // isProceed ? '' : this.materialService.toast(toastMessage);

    // isProceed = this.prestige.canvas_sectionPick == '' || this.prestige.canvas_sectionPick == null ? false : true;
    // toastMessage = `Please pick a section`;
    // isProceed ? '' : this.materialService.toast(toastMessage);

    // if(this.type != 'Accessories'){
    //   isProceed = this.prestige.canvas_colorPick == '' || this.prestige.canvas_colorPick == null ? false : true;
    //   toastMessage = `Please pick a color`;
    //   isProceed ? '' : this.materialService.toast(toastMessage);
    // }

    let toastMessage = `Add material first by clicking "+" button before saving.`;
    this.prestige.materials.length == 0 ? this.materialService.toast(toastMessage) : '';
    isProceed = this.prestige.materials.length == 0 ? false : true;
    
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
      supplier: this.arraySupplier,
      section: this.arraySection,
      color: this.arrayColor,
      materials: this.prestige.materials,
      type: this.typeKey,
      typeName: this.type
    };
    // console.log(obj);
    this.prestige.addCanvas(obj);
  }

  onClickAddMaterial(): void {

    this.prestige.materials.push(
      {
        name: '',
        price: '',
        discount: undefined
      }
    );
  }

  onClickClose(index): void {
    this.prestige.materials.splice(index,1);
  }

  ngOnDestroy(){
    this.prestige.supplierCheckBox =[];
    this.prestige.sectionCheckBox =[];
    this.prestige.colorCheckBox =[];
  }

  onClickRadioButton(type){
    this.type = type.name;
    this.typeKey = type.key;
    this.prestige.getSupplierCheckBox(type);
    this.prestige.getCanvasUsingType(type);
  }

  onClickUpdateDiscounts(data){
    let arr = [];

    data.forEach( x => {
      x.isCheck == true ? arr.unshift(x) : '';
    });
    
    arr.forEach(x => {
      x.colors.forEach( y => {
        y['discount']+''.match('.') ? '' : y['discount'] = '.'+y['discount'];
      });
    });

    // console.log(arr)
    this.prestige.updateDiscount(arr)
  }

}

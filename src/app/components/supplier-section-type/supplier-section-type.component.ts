import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-supplier-section-type',
  templateUrl: './supplier-section-type.component.html',
  styleUrls: ['./supplier-section-type.component.css']
})
export class SupplierSectionTypeComponent implements OnInit {

  constructor(public prestige: PrestigeService) {
    prestige.url = 'Supplier, Section, Type'
   }

  ngOnInit() {
    this.prestige.M.init();
    this.prestige.getType();
    this.prestige.getSupplier();
    this.prestige.getSection();
    this.prestige.getColor();
  }

  onClickAddType(){

    this.prestige.typeName == '' || this.prestige.typeName == undefined ? 
    this.prestige.M.toast('Type Name is required') : this.prestige.addType(this.prestige.typeName);
  }

  onClickUpdateModal(updateType){
   console.log(updateType)
   updateType.title.toLowerCase().match('supplier') ? this.prestige.editSupplier(updateType) :  
   updateType.title.toLowerCase().match('section') ? this.prestige.editSection(updateType) : 
   updateType.title.toLowerCase().match('type') ? this.prestige.editType(updateType): 
                                                    this.prestige.editColor(updateType);
  }

  
  onClickEditType(type){
    console.log(type);
    this.prestige.type_modalUpdateFields.title = 'Update Type';
    this.prestige.type_modalUpdateFields.key = type.key;
    this.prestige.type_modalUpdateFields.fields[0].label = 'Type Name';
    this.prestige.type_modalUpdateFields.fields[0].value = type.name;
  }
  

  onClickEditSection(section){
    console.log(section);
    this.prestige.type_modalUpdateFields.title = 'Update Section';
    this.prestige.type_modalUpdateFields.key = section.key;
    this.prestige.type_modalUpdateFields.fields[0].label = 'Section Name';
    this.prestige.type_modalUpdateFields.fields[0].value = section.name;
  }

  onClickEditColor(color){
    console.log(color);
    this.prestige.type_modalUpdateFields.title = 'Update Color';
    this.prestige.type_modalUpdateFields.key = color.key;
    this.prestige.type_modalUpdateFields.fields[0].label = 'Color Name';
    this.prestige.type_modalUpdateFields.fields[0].value = color.name;
  }

  onDeleteType(type){
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${type.name}</b>?
    </span><button id="${type.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${type.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteType(type);
    });
  }

  onDeleteSupplier(supplier){
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${supplier.name}</b>?
    </span><button id="${supplier.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${supplier.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteSupplier(supplier);
    });
  }

  onDeleteSection(section){
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${section.name}</b>?
    </span><button id="${section.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${section.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteSection(section);
    });
  }

  onDeleteColor(color){
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${color.name}</b>?
    </span><button id="${color.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${color.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteColor(color);
    });
  }

  onClickAddSupplier(){
    console.log(this.prestige.listOfType)

    let types: string = '';
    for(let x of this.prestige.listOfType){
      x.isCheck == true ? types+=x.key+';' : '';
    }

    let proceed = 
    this.prestige.supplierName == '' || this.prestige.supplierName == undefined ? this.prestige.M.toast('Supplier Name is required.') : 
    types == '' ? this.prestige.M.toast('Type is requried. Please select in checkbox') : true;
    

    proceed == true ? this.prestige.addSupplier({
      name: this.prestige.supplierName,
      types: types
    }) : '';
  }

  onClickEditSupplier(supplier){
    this.prestige.type_modalUpdateFields.title = 'Update Supplier';
    this.prestige.type_modalUpdateFields.key = supplier.key;
    this.prestige.type_modalUpdateFields.fields[0].label = 'Supplier Name';
    this.prestige.type_modalUpdateFields.fields[0].value = supplier.name;
  }

  onClickAddSection(){
    console.log(this.prestige.listOfType)

    let types: string = '';
    for(let x of this.prestige.listOfType){
      x.isCheck == true ? types+=x.key+';' : '';
    }
    
    let proceed = 
    this.prestige.sectionName == '' || this.prestige.sectionName == undefined ? this.prestige.M.toast('Section Name is required.') : 
    types == '' ? this.prestige.M.toast('Type is requried. Please select in checkbox') : true;
    

    proceed == true ? this.prestige.addSection({
      name : this.prestige.sectionName,
      types: types
    }) : '';

    
  }

  onClickAddColor(){
    console.log(this.prestige.listOfType)

    let types: string = '';
    for(let x of this.prestige.listOfType){
      x.isCheck == true ? types+=x.key+';' : '';
    }

    let proceed = 
    this.prestige.colorName == '' || this.prestige.colorName == undefined ? this.prestige.M.toast('Color Name is required.') : 
    types == '' ? this.prestige.M.toast('Type is requried. Please select in checkbox') : true;
    

    proceed == true ? this.prestige.addColor({
      name : this.prestige.colorName,
      types: types
    }) : '';

    
  }

}

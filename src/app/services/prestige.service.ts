import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MaterializeService } from '../services/materialize.service';
import { element } from '@angular/core/src/render3';
 
@Injectable({
  providedIn: 'root'
})
export class PrestigeService {

  //////////////////////////////// canvas
  dropdownColor: object = {
    target: 'dropdownColor',
    text:  'choose color',
    icon: 'color_lens',
    arr: [
      'ANALOK', 'POWDER COATED', 'ANODIZED'
    ]
  };

  dropdownSection: object = {
    target: 'dropdownSection',
    text: 'choose section',
    icon: 'clear_all',
    arr: [
      'TUBING',
      'STAIRNOSING',
      'COUNTERNOSING',
      'U CHANNEL',
      'J CLIP',
      'TEE',
      'COUNTER TRIM',
      'ANGULAR',
      'LOUVER',
      'FIXED SCREEN',
      'DISPLAY SHOWCASE',
      'FLATBAR',
      'ED DOOR',
      'SCREEN DOOR',
      'SLIDING',
      'TUBE',
      'CASEMENT AND AWNING',
      'MULLION'
    ]
  };

  dropdownSupplier: object = {
    target: 'dropdownSupplier',
    text: 'choose supplier',
    icon: 'airport_shuttle',
    arr: [
      'GLASS PLANET',
      'WDG',
      'VERTEX',
      'ACUMASTER',
      'SJW',
      'DURATECH',
      'UNIFRAME'
    ]
  };

  maaterial_modalUpdateFields: object = {
    title: 'Update Item',
    key: '',
    fields: [
      {
        target: 'materialNameUpdate',
        label: 'Material Name',
        type: 'text',
        value: ''
      },
      {
        target: 'priceUpdate',
        label: 'Price',
        type: 'number',
        value: ''
      }
    ]
  };

  _deleteModal: object = {
    title: 'Delete',
    key: ''
  }

  materials: Array<object> = [];
  materialList: Array<object> = [];
  materialList_: Array<object> = [];
  isCanvasExist: boolean = false;
  
  canvas_supplierPick: string = null;
  canvas_sectionPick: string = null;
  canvas_colorPick: string = null;
//////////////////////////////// canvas

/////////////////////////////// projects
  txtProject: string;
  project_isAdding: boolean = false;
  projectList: Array<any> = [];
  projects_materialList: Array<any> = [];
/////////////////////////////// projects

///////////////////////////////supplier
  poList: Array<object> = [];
///////////////////////////////supplier
  constructor(private fb: FirebaseService, public M: MaterializeService) { }

  // CANVAS
  addCanvas(data): void{
    console.log(data)
    data.materials.forEach( m => {

      this.fb.add('tblmaterials',
        {
          supplier: data.supplier,
          section: data.section,
          color: data.color,
          materialName: m.name,
          price: m.price
        }
      ).then( () => {
        this.M.toast(`
          <span class="green-text">${m.name}</span>&nbsp;material has been addedd.
        `)
        this.materials = [];
      });

    })
  }

  editCanvas(data): void{
    let obj = {
      materialName: data.fields[0].value,
      price: data.fields[1].value
    }
    console.log(obj)
    this.fb.edit('tblmaterials', data.key, obj)
    .then( () => {
      this.M.toast(`Item updated.`);
      this.dropdownColor['text'] = 'Choose Color';
      this.dropdownSection['text'] = 'Choose Section';
      this.dropdownSupplier['text'] = 'Choose Section';
    })
  }

  deleteCanvas(data): void{
    this.fb.delete('tblmaterials', data.key)
    .then( () => {
      this.M.toast(`<span class="yellow-text">${data.materialName}</span>&nbsp;has been deleted.`);
    });
  }

  getCanvas(): void{
    
    this.fb.retrieve('tblmaterials')
    .subscribe( res => {
      this.materialList = [];
      res.forEach( element => {
        let x = element.payload.toJSON();
        x['key'] = element.key;

         this.materialList.unshift(x);

      });
      this.materialList_ = this.materialList;
      console.log(this.materialList)
      this.getCanvasUsingDropdown(this.canvas_supplierPick, this.canvas_sectionPick, this.canvas_colorPick)
    });
  }

  getCanvasUsingDropdown(supplier, section, color): void{
    let newList = [];
    console.log(supplier + ' - ' + section + ' - ' + color)
    this.materialList_.forEach( m => {
      
      if(supplier != null && 
        section == null &&
        color == null){
          if(supplier == m['supplier'])
          newList.unshift(m);
        }
        

      else if(section != null &&
        supplier == null &&
        color == null){
          if(section == m['section'])
          newList.unshift(m);
        }
        

      else if(color != null &&
        supplier == null &&
        section == null){
          if(color == m['color'])
          newList.unshift(m);
        }
       

      else if(supplier != null &&
        section != null &&
        color == null){
          if(supplier == m['supplier'] && section == m['section'])
          newList.unshift(m);
        }
        

      else if(supplier != null &&
        section == null &&
        color != null){
          if(supplier == m['supplier'] && color == m['color'])
          newList.unshift(m);
        }
       

      else if(supplier == null &&
        section != null &&
        color != null){
          if(section == m['section'] && color == m['color'])
          newList.unshift(m);
        }
       

      else if(supplier != null &&
        section != null &&
        color != null){
        if(section == m['section'] && color == m['color'] && supplier == m['supplier'])
        newList.unshift(m);
      }

      else if(supplier == null &&
        section == null &&
        color == null){
        newList = this.materialList;
      }
       
    });

    this.materialList = newList;
    this.isCanvasExist = this.materialList.length == 0 ? true : false;
  }

  viewAllCanvas(): void{
    this.materialList = this.materialList_
    this.isCanvasExist = this.materialList.length == 0 ? true : false;
    this.canvas_supplierPick = null
    this.canvas_sectionPick = null
    this.canvas_colorPick = null
    this.dropdownColor['text'] = 'Choose Color';
    this.dropdownSection['text'] = 'Choose Section';
    this.dropdownSupplier['text'] = 'Choose Supplier';
  }
  // CANVAS


  // PROJECT
  addProject(data) {
    this.project_isAdding = true;
    this.fb.add('tblprojects', data)
    .then( () => {
      this.M.toast(`<span class="green-text">${data.projectName}</span>&nbsp; has been added`);
      this.txtProject = '';
      this.project_isAdding = false;
    })
  }

  getProjects(){
    this.fb.retrieve('tblprojects')
    .subscribe( (res) => {

      this.projectList = [];
      
      res.forEach(element => {
        let x = element.payload.toJSON();
        
        this.projectList.unshift({
          key: element.key,
          name: x.projectName
        })

      });

      this.projectList.forEach(x => {

        this.fb.retrieveWithCondition('tblpo', 'projectKey', x.key)
        .subscribe((res) => {
          let arr= [];
          let total = 0;
          res.forEach(element => {
            let z = element.payload.toJSON();
            let poArr = [];
            let subTotal = 0;

            Object.keys(z.po).map((key) => {
              console.log(z.po[key])
              z.po[key]['subtotal'] = (z.po[key].price * z.po[key].qty);
              poArr.unshift((z.po[key]))
              
              subTotal+= (z.po[key].price * z.po[key].qty);
            });

            total += subTotal;

            arr.unshift({
              po: poArr,
              poKey: element.key,
              date: z.date,
              subTotal: subTotal,
              paid: z.paid
            });

          });
          x['po'] = arr;
          x['total'] = total;
        })
      })

      console.log(this.projectList)
      
    });
  }

  getMaterials(data, section, color){
    this.projects_materialList = [];
    
    this.fb.retrieveWithCondition('tblmaterials', 'supplier', data)
    .subscribe( (res) => {
      this.projects_materialList = [];
      res.forEach(element => {

        let x = element.payload.toJSON();
        // x.section == data.section ? this.projects_materialList.unshift(x) : ''
        x['isShow'] = true;
        x['isCheck'] = true;
        x['qty'] = null;
        this.projects_materialList.unshift(x);
        
      })
      console.log(section, color)
      console.log(this.projects_materialList)
      this.sortMaterials(section, color)
    })
  }

  sortMaterials(section, color){
    console.log(section+'---'+color)

    this.projects_materialList.forEach( m =>  {

      if(section != null && color == null){
        m.isShow = m.section == section ? true : false;
      }
      else if(section == null && color != null){
        m.isShow = m.color == color ? true : false;
      }
      else if(section != null && color != null){
        m.isShow = section == m.section && color == m.color ? true : false;
      }

    });
  }

  addPO(data, projectKey, date){
    console.log(data)
    console.log(data[0].supplier)
    this.fb.add(`tblpo`, {
      po: data,
      projectKey: projectKey,
      supplier: data[0].supplier,
      date: date,
      paid: false
    })
    .then( () => {
      console.log('added')
      this.M.toast('New PO has been added')

      this.projects_materialList.forEach(x => {
        x['isShow'] = true;
        x['isCheck'] = true;
        x['qty'] = null;
      })
    })
  }

  payPO(key) {
    console.log(key)
    this.fb.edit('tblpo', key, {paid: true})
    .then( () => {
      console.log('success')
      this.M.toastDismiss();
    });
  }
  // PROJECT


  // SUPPLIER
  getPOUsingSupplier(supplier){
    this.fb.retrieveWithCondition('tblpo', 'supplier', supplier)
    .subscribe( res => {
      this.poList = [];
      let total = 0;
      let balance = 0;

      res.forEach(element => {
        let z = element.payload.toJSON();
        let poArr = [];
        let subTotal = 0;

        Object.keys(z.po).map((key) => {
          z.po[key]['subtotal'] = (z.po[key].price * z.po[key].qty);
          poArr.unshift((z.po[key]))
          subTotal+= (z.po[key].price * z.po[key].qty);
          // console.log(z.po[key].paid)
          // z.po[key].paid ? '' : console.log('unpaid');

        });
        balance+= z.paid ? 0 :  subTotal;
        total += subTotal;

        this.fb.retrieve(`tblprojects/${z.projectKey}`)
        .subscribe( project => {

          this.poList.unshift({
            po: poArr,
            poKey: element.key,
            date: z.date,
            subTotal: subTotal,
            paid: z.paid,
            projectName: project[0].payload.toJSON()
          });
          
        })

        

      });
      this.poList['total'] = total;
      this.poList['balance'] = balance;
      

      console.log(this.poList)

    })
  }
  // SUPPLIER
}

import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MaterializeService } from '../services/materialize.service';
import { element } from '@angular/core/src/render3';
 
@Injectable({
  providedIn: 'root'
})
export class PrestigeService {

  url: string = 'Projects';
  addingPOLoader = false;

  //////////////////////////////// canvas
  dropdownColor: any = {
    target: 'dropdownColor',
    text:  'choose color',
    icon: 'color_lens',
    arr: [
      'ANALOK', 'POWDER COATED', 'ANODIZED'
    ]
  };

  dropdownGlassType: any = {
    target: 'dropdownColor',
    text:  'choose glass type',
    icon: 'color_lens',
    arr: [
      'TEMPERED', 'ANNEALED'
    ]
  };

  dropdownSection: any = {
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

  dropdownSectionGlass: any = {
    target: 'dropdownSection',
    text: 'choose section',
    icon: 'clear_all',
    arr: [
      'CLEAR',
      'BROWN',
      'TINTED',
      'REFLECTIVE',
      'SMOKE',
      'MIRROR'
    ]
  };

  dropdownAllSupplier: any = {
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
      'UNIFRAME',
      'TQMP',
      'CHAIN',
      'TYPE ONE',
      'TRANS',
      'G CRYSTAL',
      'GLASS PLANET',
      'ALSIA'
    ]
  };

  dropdownSupplier: any = {
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

  dropdownSupplierGlass: any = {
    target: 'dropdownSupplier',
    text: 'choose supplier',
    icon: 'airport_shuttle',
    arr: [
      'GLASS PLANET',
      'TQMP',
      'WDG',
      'VERTEX',
      'CHAIN',
      'SJW',
      'TYPE ONE',
      'TRANS'
    ]
  };

  dropdownSupplierAccessories: any = {
    target: 'dropdownSupplier',
    text: 'choose supplier',
    icon: 'airport_shuttle',
    arr: [
      'SJW',
      'G CRYSTAL',
      'GLASS PLANET',
      'ALSIA',
      'DURATECH',
      'VERTEX'
    ]
  };

  dropdownSectionAccesories: any = {
    target: 'dropdownSection',
    text: 'choose section',
    icon: 'clear_all',
    arr: [
      'SLIDING WINDOW',
      'SCREEN DOOR',
      'SWING DOOR',
      'OTHER',
      'PATCH FITTING',
      'HYBRID DOOR CLOSER',
      'ESTRON',
      'HANDLE',
      'SHOWER FITTINGS'
    ]
  };

  dropdownCutStyle: any = {
    target: 'dropdownCutStyle',
    text: 'choose cut style',
    icon: 'content_cut',
    arr: [
     'HORIZONTAL',
     'VERTICAL'
    ]
  };

  maaterial_modalUpdateFields: any = {
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

  supplierCheckBox = [];
  sectionCheckBox = [];
  colorCheckBox = [];

  _deleteModal: any = {
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
  pay: any =  {
    projectKey: '0',
    paidBy: 'check',
    field: {
      id: 'checkNumber',
      label: 'Check Number',
      value: null
    }
  }

  cuttingList = [];
/////////////////////////////// projects

///////////////////////////////supplier
  poList: any= [];
  isShowProgressSupplier: boolean = false;
  clickSupplier: boolean = false;
  supplierTotalPurchase: number = null;
///////////////////////////////supplier


//////////////////////////////Purchases
  purchases_poList: any = [];
//////////////////////////////Purchases

//////////////////////////////Stocks
  stockList: any = [];
  stocks_modalUpdateFields: any = {
    title: 'Update Item',
    key: '',
    fields: [
      {
        target: 'priceUpdate',
        label: 'Price',
        type: 'number',
        value: ''
      },
      {
        target: 'qtyUpdate',
        label: 'Qty',
        type: 'number',
        value: ''
      }
      
    ]
  };
  progressStockstable: boolean = true;
  scrapList: any = {};
  scrapType = 'Aluminum';
  scrapBaseSize: any;
  stockPO = [];
  stockInList = [];
  stockOutList = [];
  //////////////////////////////Stocks

  constructor(private fb: FirebaseService, public M: MaterializeService) { }


  // CANVAS
  addCanvas(data): void{
    console.log(data)
    data.materials.forEach( m => {

      data.supplier.forEach( supplier => {

        data.section.forEach(section => {
          
          data.color.forEach( color => {

            console.log({
              supplier: supplier.name,
              section: section.name,
              material: m.name,
              price: m.price,
              color: color.name
            })
          
          });
        
        });

      });
      // this.fb.add('tblmaterials',
      //   {
      //     supplier: data.supplier,
      //     section: data.section,
      //     color: data.color == null ? '-': data.color,
      //     materialName: m.name,
      //     price: m.price,
      //     type: data.type
      //   }
      // ).then( () => {
      //   this.M.toast(`
      //     <span class="green-text">${m.name}</span>&nbsp;material has been addedd.
      //   `)
      //   this.materials = [];
      // });

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
      this.dropdownSupplier['text'] = 'Choose Supplier';
    })
  }

  deleteCanvas(data): void{
    this.fb.delete('tblmaterials', data.key)
    .then( () => {
      this.M.toastDismiss();
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
            console.log(z)
            let poArr = [];
            let subTotal = 0;

            Object.keys(z.po).map((key) => {

              if(z.po[key].supplier == 'FROM STOCK'){

                if(z.po[key].type.toLowerCase() == 'aluminum'){
                  
                  let inches = this.fractionToInches(''+z.po[key].qty);
                  
                  inches = this.roundOff(inches, 'aluminum', z.po[key].supplier);
                  console.log(inches)
                  z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * inches) 
                  * z.po[key].numberOfSet;
                  
                  subTotal+= z.po[key]['subtotal'];
                 console.log('from stock')
                }
                else if(z.po[key].type.toLowerCase() == 'glass'){
                  console.log('PUMASOK SA TYPE GLASS')
                  let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                  let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                  // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                  let sqft = ((xWidth * xHeight) / 144);
                  z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                  subTotal+= z.po[key]['subtotal'];
                }
                else if(z.po[key].type.toLowerCase() == 'accessories'){
                  z.po[key]['subtotal'] = z.po[key]['price'] * z.po[key]['numberOfSet'];
                  subTotal+= z.po[key]['subtotal'];
                }
              }
              else{
               if( z.po[key]['type'] == "Glass"){
                let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                let sqft = ((xWidth * xHeight) / 144);
                z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                // z.po[key]['subtotal'] = (z.po[key]['price'] * z.po[key]['width'] * z.po[key]['height']) * z.po[key]['numberOfSet'];
                
               }
               else{
                z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
                
               }
                subTotal+= z.po[key]['subtotal'];
              }
              
              poArr.unshift((z.po[key]))

              
            });

            if(z.paid.paidBy == 'cash'){
              subTotal -= subTotal * z.paid.discount;
            }

            total += subTotal;

            arr.unshift({
              po: poArr,
              poKey: element.key,
              date: z.date,
              subTotal: subTotal,
              paid: z.paid,
              projectName: x.name,
              isShow: true
            });

          });
          x['po'] = arr;
          x['total'] = total;
        })
      })

      console.log(this.projectList)
      
    });
  }

  fractionToInches(qty){
    let inches = qty.split(' ').length > 1 ? 
                eval(qty.split(' ')[0]) + eval(qty.split(' ')[1]) : qty
                
    return inches == null || inches == 'undefined' || inches == undefined ? 0: parseFloat(inches);
  }

  roundOff(inches, type, supplier){

   

    if(type == 'aluminum'){
      let x = 12;
      while(true){
  
        if(inches < x){
          console.log(inches)
          console.log(x);
          break;
        }
        x+=12;
      }
      return x;
    }
    else{
      let x = 6;
      while(true){
  
        if(inches <= x){
          console.log(inches)
          console.log(x);
          break;
        }

        if(supplier == 'TRANS'){
          x+=6;
          console.log(supplier)
          console.log(x)
        }
        else{
         if(x >= 48){
           x+=12;
           console.log(supplier)
           console.log(x);
         }
         else{
           x+=6;
           console.log(supplier)
           console.log(x);
         }
        }
        
      }
      return x;
    }
    
  }

  getMaterials(supplier, section, color, type){
    if(supplier != null){
      this.projects_materialList = [];

      this.fb.retrieveWithCondition('tblmaterials', 'supplier', supplier)
      .subscribe( (res) => {
        this.projects_materialList = [];
        res.forEach(element => {

          let x = element.payload.toJSON();
          // x.section == data.section ? this.projects_materialList.unshift(x) : ''
          x['isShow'] = true;
          x['isCheck'] = true;
          x['qty'] = null;
          x['stockPrice'] = null;
          x['type'] = x.type;
          x['materialKey'] = element.payload.key;

          this.projects_materialList.unshift(x);
        })
        // console.log(section, color)
        console.log(this.projects_materialList)
        this.sortMaterials(section, color, type)
      })
    }
  }

  sortMaterials(section, color, type){
    console.log(section+'---'+color)

    this.projects_materialList.forEach( m =>  {

      if(type == m.type){
        
        if(section != null && color == null){
          m.isShow = m.section == section ? true : false;
        }
        else if(section == null && color != null){
          m.isShow = m.color == color ? true : false;
        }
        else if(section != null && color != null){
          m.isShow = section == m.section && color == m.color ? true : false;
        }
        else{
          m.isShow = true;
        }
      }
      else{
        m.isShow = false;
      }

    });
    // this.getMaterialsByType(type);
  }

  getMaterialsByType(type){
    this.projects_materialList.forEach( m =>  {
      m.isShow = type == m.type ? true : false;
    });

    this.stockList.forEach( m =>  {
      m.isShow = type == m.type ? true : false;
    });
  }

  addPO(data, projectKey, date, isFromStock){
    console.log(data)
    // console.log(data[0].supplier)
    this.addingPOLoader = true;
    

    if(isFromStock){
      
      if(data[0].type == 'Glass'){
        this.getGlassCut(data, projectKey, date);
      }
      else if(data[0].type == 'Aluminum'){
        this.getScrap(data, projectKey, date);
      }
      else if(data[0].type == 'Accessories'){
        this.getAccessoriesCut(data, projectKey, date);
      }
    }
    else{
      this.addingPOLoader = false;
      this.fb.add(`tblpo`, {
        po: data,
        projectKey: projectKey,
        supplier: data[0].supplier,
        date: date,
        paid: false
      })
      .then( () => {
        console.log('PO ADDED');
       
        this.M.toast("New PO successfully added")
       
        this.projects_materialList.forEach(x => {
          x['isCheck'] = true;
          x['qty'] = null;
          x['numberOfSet'] = null;
          x['width'] = null;
          x['height'] = null;
        });

        this.stockList.forEach(x => {
          x['isCheck'] = true;
          x['qty'] = null;
        })
        
      });
    }
    // this.fb.add(`tblpo`, {
    //   po: data,
    //   projectKey: projectKey,
    //   supplier: data[0].supplier,
    //   date: date,
    //   paid: false
    // })
    // .then( () => {
    //   console.log('added')
      

    //   if(isFromStock){
    //       this.getScrap(data);
    //     // data.forEach( d => {
    //     //   this.fb.edit('tblstock', d.stockKey, { qty: (d.stock-d.qty)})
    //     //   .then( () => {
    //     //     console.log('updated qty');
    //     //   });
    //     // });

    //     // this.stockList.forEach(x => {
    //     //   x['isShow'] = true;
    //     //   x['isCheck'] = true;
    //     //   x['qty'] = null;
    //     // });

    //   }
    //   this.M.toast('New PO has been added')
    //   this.projects_materialList.forEach(x => {
    //     x['isShow'] = true;
    //     x['isCheck'] = true;
    //     x['qty'] = null;
    //     x['numberOfSet'] = null;
    //     x['width'] = null;
    //     x['height'] = null;
    //   });

    // });

  }

  sortNumber(a,b) {
      return a - b;
  }

  getAccessoriesCut(data, projectKey, date){
    let ctr = 0;
    data.forEach( x => {
      console.log(x)
      ctr+=1;
      this.processAccesoriesCut(x, x.numberOfSet, data, projectKey, date, ctr)
      
    });

  }

  processAccesoriesCut(x, numberOfSet, parentData, projectKey, date, ctr){
    this.fb.edit('tblstock', x.stockKey, {
      qty: (x.stock - numberOfSet)
    })
    .then( () => {
      parentData.length == ctr ? this.addPO(parentData, projectKey, date, false) : console.log(`${x.stockKey} updated -1`)
     
    })
  }
  glassScrapCtr =0;
  arrayGlassCutToDelete;
  getGlassCut(data, projectKey, date){
    // console.log(data);
    this.glassScrapCtr = 0;
    this.arrayGlassCutToDelete = [];
    data.forEach( x => {
      
      this.processGlassCut(x, x.numberOfSet, 0, data, projectKey, date);
    });
  }

  ;
  processGlassCut(x, numberOfSet, ctr, parentData, projectKey, date){
    this.fb.retrieveOnce('tblscrap', 'stockKey', x.stockKey).once('value', (r) => {
      let res = r.toJSON();
      console.log(res)
      if(res == null){
        console.log('walang laman')
        this.addGlassScrap(x, numberOfSet, ctr, parentData, projectKey, date);
      }
      else{
       
        let scrap = [];
  
        Object.keys(res).map((key) => {
          scrap.push(
            {
              scrap: res[key].scrap,
              scrapKey: key
            }
          );
        });

        console.log(scrap);

        for(let i = 0; i < scrap.length; i++){
          
          for(let j = 0; j < scrap.length; j++){
            let baseW = scrap[i].scrap.split(' x ')[0].replace('in','');
            let baseH = scrap[i].scrap.split(' x ')[1].replace('in','');

            if(scrap[i].scrap.split(' x ')[0].replace('in','') < scrap[j].scrap.split(' x ')[0].replace('in','') ||
              scrap[i].scrap.split(' x ')[1].replace('in','') < scrap[j].scrap.split(' x ')[1].replace('in','')){
              
                console.log(scrap[i].scrap.split(' x ')[0].replace('in','') +'<'+ scrap[j].scrap.split(' x ')[0].replace('in',''))
                console.log(scrap[i].scrap.split(' x ')[1].replace('in','') +'<'+ scrap[j].scrap.split(' x ')[1].replace('in',''))
                console.log('sort')
                
              let temp = scrap[i] ;
              scrap[i] = scrap[j];
              scrap[j] = temp;
            }

          }

        }

        console.log(scrap)
        // let isGetNewScrap = true;
        let countFinishSet = 0;
        let scrapKeyToDelete;
        let isDeleteExisting = false;

        // for(let i = 0; i < numberOfSet; i++){
          // let ctr = 0;
          let isNotAvailable = true;
        
        let scrapToUse;
          let xWidth: any = this.fractionToInches(''+x.width+'');
          let xHeight : any= this.fractionToInches(''+x.height+'');
        console.log(xWidth)
        console.log(xHeight)
          for(let s of scrap){
            console.log(s)

            let baseW = s.scrap.split(' x ')[0].replace('in','');
            let baseH = s.scrap.split(' x ')[1].replace('in','');

            console.log(baseW +' x '+baseH);
            
            // if(baseW >= parseFloat(x.width) && baseH >= parseFloat(x.height)){
            if(baseW >= xWidth && baseH >= xHeight){
              // HORIZONTAL
              let horizontal = {
                cut01: `${(baseW - xWidth)}in x ${xHeight}in`,
                cut02: `${baseW}in x ${(baseH - xHeight)}in`
              }

              let vertical = {
                cut01: `${xWidth}in x ${(baseH - xHeight)}in`,
                cut02: `${(baseW - xWidth)}in x ${baseH}in`
              }
              console.log('ilang beses pumasokkk')
              if(x.glassCutStyle)
              console.log(x.glassCutStyle)
              s.cutSize = x.glassCutStyle == false ? horizontal : vertical;
              // s.cutSize = horizontal;
              scrapKeyToDelete = s.scrapKey;
              scrapToUse = s;
              console.log(horizontal)
              console.log(vertical)
              isDeleteExisting = true;
              break;
            }

          }
          // isDeleteExisting ? this.deleteGlassScrap(scrapToUse, x, scrapKeyToDelete, numberOfSet, ctr, parentData, projectKey, date) 
          // : this.addGlassScrap(x, numberOfSet, ctr, parentData, projectKey, date);
          
          if(numberOfSet > ctr){
            isDeleteExisting ? this.deleteGlassScrap(scrapToUse, x, scrapKeyToDelete, numberOfSet, ctr, parentData, projectKey, date) 
            : this.addGlassScrap(x, numberOfSet, ctr, parentData, projectKey, date);
          }
          else{
            this.glassScrapCtr+=1;

            parentData.length == this.glassScrapCtr ? this.addPO(parentData, projectKey, date, false) : '';
            parentData.length == this.glassScrapCtr ? this.addOutStock(parentData, date) : '';
          }
          
          // : this.updateGlassScrap(scrap, x, numberOfSet, ctr, parentData, projectKey, date);
        // }
        // console.log(scrap)

       

        // this.updateGlassScrap(scrap, x, isDeleteExisting);

      }
    });
  }

  addGlassScrap(data, numberOfSet, ctr, parentData, projectKey, date){
    console.log('getting new glass scrap from tblstock');
    if(data.stock > 0){
      let baseW = data.baseSize.split(' x ')[0].replace('ft','') * 12;
      let baseH = data.baseSize.split(' x ')[0].replace('ft','') * 12;
      
      this.fb.add('tblscrap', {
        scrap: `${baseW}in x  ${baseH}in`,
        stockKey: data.stockKey
      }).then( (r) => {
        this.arrayGlassCutToDelete.push(r.key);
        console.log('Added new Scrap')
        data.stock-=1;
        this.fb.edit('tblstock', data.stockKey, {
          qty: data.stock
        })
        .then( () =>{
          console.log('-1 from stock')
          this.processGlassCut(data, numberOfSet, ctr, parentData, projectKey, date);
        })
       
      });

    }
    else{
      console.log(parentData)
      parentData.forEach( x => {
        this.fb.edit('tblstock', x.stockKey, {
          qty: x.numberOfStock
        }).then( () =>{
          this.addingPOLoader = false;
          this.M.toast(`<span class="yellow-text">${data.materialName} </span>&nbsp;insufficient stock or scrap`);
        })
      });

      this.arrayGlassCutToDelete.forEach( key => {
        this.fb.delete('tblscrap', key)
        .then(() =>{
          console.log(`${key} deleted`)
        });
      });
      
    }
  }

  deleteGlassScrap(data, item, scrapKeyToDelete, numberOfSet, ctr, parentData, projectKey, date){
    console.log('pumasok sa delete glass scrap');
    console.log(data);

    this.fb.delete('tblscrap', scrapKeyToDelete)
    .then( () =>{
    //   let isProceed = true;
    //   data.forEach(d => {

    //     if(d.cutSize == null || d.cutSize == undefined){}
    //     else{
    //       Object.keys(d.cutSize).map((key) => {
    //         if(d.cutSize[key].split(' x ')[0].replace('ft','') <= 0 || 
    //           d.cutSize[key].split(' x ')[1].replace('ft','') <= 0){
    //             isProceed = false;
    //           }
    //       });
    //     }
    //   });
      // if(isProceed){
        
        this.updateGlassScrap(data, item, numberOfSet, ctr, parentData, projectKey, date)
      // }
      // else{
        // ctr+=1;
        // if(numberOfSet > ctr){
        //   this.processGlassCut(item, numberOfSet, ctr, parentData, projectKey, date);
        // }
        // else{
        //   console.log('add po from delete glass scrap')
        //   this.addPO(parentData, projectKey, date, false);
        // }
      // }
    });
  }

  updateGlassScrap(data, item, numberOfSet, ctr, parentData, projectKey, date){
    console.log('pumasok sa updateGlassScrap')
    console.log(data)

    let countD = 0;
    let isProceed = true;
    let cut01Proceed = true;
    let cut02Proceed = true;
    // data.forEach(d => {
    //  console.log(d)
     
      if(data.cutSize == null || data.cutSize == undefined){}
      else{
        
        if(data.cutSize.cut01.split(' x ')[0].replace('in','') <= 0 || 
          data.cutSize.cut01.split(' x ')[1].replace('in','') <= 0){
            cut01Proceed = false;
            console.log(data.cutSize.cut01)
            
        }
        else if(data.cutSize.cut02.split(' x ')[0].replace('in','') <= 0 || 
        data.cutSize.cut02.split(' x ')[1].replace('in','') <= 0){
          cut02Proceed = false;
          console.log(data.cutSize.cut02)
          
        }
        
        if(cut01Proceed == false || cut02Proceed == false){}
        if(cut01Proceed){
          console.log(data.cutSize.cut01)
          this.fb.add('tblscrap', {
            stockKey: item.stockKey,
            scrap: data.cutSize.cut01
          }).
          then( () =>{
            // countD+=1;
            isProceed = false;
            if(countD == 2){
              
              console.log(ctr)
              console.log(`added ${data.cutSize.cut01} and ${data.cutSize.cut02}`)
            
            }
              // if(numberOfSet == ctr){
              //   this.addPO(parentData, projectKey, date, false);
              // }
          });
        }
        if(cut02Proceed){
          this.fb.add('tblscrap', {
            stockKey: item.stockKey,
            scrap: data.cutSize.cut02
          }).
          then( () =>{
            // countD+=1;
            isProceed = false;
            if(countD == 2){
              
              console.log(ctr)
              console.log(`added ${data.cutSize.cut01} and ${data.cutSize.cut02}`)
            
            }
              // if(numberOfSet == ctr){
              //   this.addPO(parentData, projectKey, date, false);
              // }
          });
        }

        if(cut01Proceed || cut02Proceed){
          ctr+=1;
          this.processGlassCut(item, numberOfSet, ctr, parentData, projectKey, date);
        }

        // Object.keys(data.cutSize).map((key) => {
        //   console.log(data.cutSize[key] +'<-------------------------------')
        //   if(data.cutSize[key].split(' x ')[0].replace('ft','') <= 0 || 
        //   data.cutSize[key].split(' x ')[1].replace('ft','') <= 0){
        //     isProceed = true;
        //     countD+=1;
        //     // this.processGlassCut(item, numberOfSet, ctr, parentData, projectKey, date);
        //   }
        //   else{
        //     countD+2;
        //     console.log(data.cutSize[key])
        //     this.fb.add('tblscrap', {
        //       stockKey: item.stockKey,
        //       scrap: data.cutSize[key]
        //     }).
        //     then( () =>{
        //       console.log(  data.cutSize[key])
        //       // countD+=1;
        //       isProceed = false;
        //       if(countD == 2){
               
        //         console.log(ctr)
        //         console.log(`added ${data.cutSize.cut01} and ${data.cutSize.cut02}`)
        //         this.processGlassCut(item, numberOfSet, ctr, parentData, projectKey, date);
        //       }
        //         // if(numberOfSet == ctr){
        //         //   this.addPO(parentData, projectKey, date, false);
        //         // }
        //     });
        //   }
        // }); 
      } 
      
    // });
    // isProceed ? this.addPO(parentData, projectKey, date, false) : '';
    
  }

 aluminumScapCtr = 0;
 poProceed = false;
 toDeleteScrap = [];
  getScrap(data, projectKey, date){
    console.log(data);
    this.aluminumScapCtr = 0;
    this.toDeleteScrap = [];
    data.forEach( x => {
      this.refreshScrap(x, x.numberOfSet, data, projectKey, date);     
    });

  }

  refreshScrap(x, numberOfSet, parentData, projectKey, date){
    // const eventref = this.fb.retrieveWithCondition('tblscrap', 'stockKey', x.stockKey);
          // const snapshot = await eventref.once('value');
          // const value = snapshot.val();
          this.fb.retrieveOnce('tblscrap', 'stockKey', x.stockKey).once('value', (r) => {
            // this.fb.retrieveWithCondition('tblscrap', 'stockKey', x.stockKey).
            // subscribe( res => {
  
              // console.log(res)
  
              // if(res.lenght == 0){
              //     this.addScrap(x)
              // }
              // else{
              //   let scrap = {
              //     scrap: [],
              //     scrapKey: []
              //   };
    
              //   console.log(scrap);
                
              //   res.forEach( x => {
              //     scrap.scrap.unshift(x.payload.toJSON().scrap);
              //       scrap.scrapKey.unshift(x.payload.key);
              //   })
    
              
              //   let ctr = 0;
    
              //   console.log(x.numberOfSet);
              //   let isNotAvailable = true;
              //   for(let s of scrap.scrap) {
              //     console.log(s)
              //     if(s >= x.qty){
                    
              //       let newScrap = s - x.qty;
              //       this.updateScrap(newScrap, scrap.scrapKey[ctr]);
              //       isNotAvailable = false;
              //       console.log('break');
              //       break;
              //     }
              //     ctr+=1;
              //   }
              //   isNotAvailable == true ? this.addScrap(x) : '';
    
                
              // }
            console.log(r.toJSON())
            let res = r.toJSON();
            
            if(res == null){
              this.addScrap(x, numberOfSet, parentData, projectKey, date)
            }
            else{
              // let scrap = {
              //   scrap: [],
              //   scrapKey: []
              // };
  
              let scrap = [];
  
              Object.keys(res).map((key) => {
                // console.log(res[key])
                scrap.push(
                  {
                    scrap: res[key].scrap,
                    scrapKey: key
                  }
                )
                // scrap.scrap.unshift(res[key].scrap);
                // scrap.scrapKey.unshift(key);
              });

              console.log(scrap)
              for(let i = 0; i < scrap.length; i++){
                
                for(let j = 0; j < scrap.length; j++){

                  if(scrap[i].scrap < scrap[j].scrap){
                    let temp = scrap[i] ;
                    scrap[i] = scrap[j];
                    scrap[j] = temp;
                  }

                }

              }
  
              console.log(scrap);
              let inches: any = this.fractionToInches(''+x.qty);
              let isGetNewScrap = true;
              let countFinishSet = 0;
              
              for(let i = 0; i < numberOfSet; i++){
                // console.log(i)
                let ctr = 0;
                let isNotAvailable = true;
              
  
                for(let s of scrap){
                  isGetNewScrap = true;
                  

                  if(s.scrap >= inches){
                    let newScrap = s.scrap - inches;
                    s.scrap = newScrap;
                    // this.updateScrap(newScrap, scrap.scrapKey[ctr]);
                    isNotAvailable = false;
                    isGetNewScrap = false;
                    countFinishSet+=1;
                    break;
  
                  }
                  ctr+=1;
                };
                // for(let s of scrap.scrap) {
                //   // console.log(s)
                //   if(s >= x.qty){
                    
                //     let newScrap = s - x.qty;
                //     scrap.scrap[ctr] = newScrap;
                //     // this.updateScrap(newScrap, scrap.scrapKey[ctr]);
                //     isNotAvailable = false;
                //     isGetNewScrap = false;
                //     break;
                //   }
                //   ctr+=1;
                // }
                // isNotAvailable == true ? this.addScrap(x) : '';
              }
              console.log(scrap)
              this.updateScrap(scrap, isGetNewScrap, x, (numberOfSet - countFinishSet), parentData, projectKey, date);
              isGetNewScrap ? console.log('get new item') : '';
              
            }
          });
  }

  updateScrap(data, isGetNewScrap, item, numberOfSet, parentData, projectKey, date){
    console.log(data);
    let len = data.length;
    let ctr = 0;

    
    data.forEach(d => {
     

      this.fb.edit(`tblscrap`, d.scrapKey ,{
        scrap: d.scrap
      })
      .then( () => {
        ctr+=1;
        console.log(len +' == ' + ctr)
        this.poProceed = true;
        isGetNewScrap && ctr == len ? this.addScrap(item, numberOfSet, parentData, projectKey, date) : '';
        isGetNewScrap == false && ctr == len ? this.aluminumScapCtr+=1 : '';
      

        this.aluminumScapCtr == parentData.length ? this.addPO( parentData, projectKey, date, false) : '';
        this.aluminumScapCtr == parentData.length ? this.addOutStock(parentData, date) : '';
        // isGetNewScrap == false && ctr == len ? this.addPO( parentData, projectKey, date, false) : '';
        // this.stockList.forEach(x => {
        //   x['isShow'] = true;
        //   x['isCheck'] = true;
        //   x['qty'] = null;
        // });
      });
    })
  }

  addOutStock(data, date){

    data.forEach(x => {

      this.fb.add('tblstockout', {
        date: date,
        stockKey: x.stockKey,
        qty: x.type != 'Glass' ? x.qty : `${x.width}in x ${x.height}in`,
        numberOfSet: x.numberOfSet
      }).then( () => {
        console.log('out added');
      });    
    });
  }

  addScrap(data, numberOfSet, parentData, projectKey, date){
    console.log(data)

    if(data.stock > 0){
      
      console.log('pumasok ba?')
      
      this.fb.add('tblscrap', {
        scrap: data.baseSize,
        stockKey: data.stockKey
      }).then( (r) => {
        console.log(r.key)
        this.toDeleteScrap.push(r.key);
        console.log('Added new Scrap')
        data.stock-=1;
        this.fb.edit('tblstock', data.stockKey, {
          qty: data.stock
        })
        .then( () =>{
          console.log('-1 from stock')
          this.refreshScrap(data, numberOfSet, parentData, projectKey, date);
        })
      });
    }
    else{
      console.log(parentData)
      parentData.forEach( x => {
        this.fb.edit('tblstock', x.stockKey, {
          qty: x.numberOfStock
        }).then( () =>{
          this.addingPOLoader = false;
          this.M.toast(`<span class="yellow-text">${data.materialName} </span>&nbsp;insufficient stock or scrap`);
        })
      });

      this.toDeleteScrap.forEach( key => {
        this.fb.delete('tblscrap', key)
        .then(() =>{
          console.log(`${key} deleted`)
        });
      });
      
    }
  }

  

  payPO(data) {
    if(data.paidBy == 'check'){
      if(data.field.value == '' || data.field.value == null){
        this.M.toast('CHECK NUMBER is required');
      }
      else{
        this.fb.edit('tblpo', data.projectKey, {
          paid:{
            isPaid: true,
            paidBy: data.paidBy,
            date: data.date,
            check: data.field.value
          }
        })
        .then( () => {
          console.log('success');
        });
      } 
    }
    else{
      if(data.field.value == '' || data.field.value == null || data.date == null){
        this.M.toast('DATE and DISCOUNT is required');
      }
      else{
        this.fb.edit('tblpo', data.projectKey, {
          paid:{
            isPaid: true,
            paidBy: data.paidBy,
            date: data.date,
            discount: '.'+data.field.value
          }
        })
        .then( () => {
          console.log('success');
        });
      }
    }
    // console.log(key)
    // this.fb.edit('tblpo', key, {paid: true})
    // .then( () => {
    //   console.log('success')
    //   this.M.toastDismiss();
    // });
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
          z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
          
          
          if(z.po[key].supplier == 'FROM STOCK'){
            if(z.po[key].type.toLowerCase() == 'aluminum'){
              let inches = this.fractionToInches(''+z.po[key].qty);
                  
              inches = this.roundOff(inches, 'aluminum', z.po[key].supplier);
              console.log(inches)
              z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * inches) 
              * z.po[key].numberOfSet;
              
              subTotal+= z.po[key]['subtotal'];
             console.log('from stock')
              }
              else if(z.po[key].type.toLowerCase() == 'glass'){
                console.log('PUMASOK SA TYPE GLASS')
                  let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                  let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                  // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                  let sqft = ((xWidth * xHeight) / 144);
                  z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                  subTotal+= z.po[key]['subtotal'];
              }
              else if(z.po[key].type.toLowerCase() == 'accessories'){
                z.po[key]['subtotal'] = z.po[key]['price'] * z.po[key]['numberOfSet'];
                subTotal+= z.po[key]['subtotal'];
              }
          }
          else{
            if( z.po[key]['type'] == "Glass"){
              let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                let sqft = ((xWidth * xHeight) / 144);
                z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                // z.po[key]['subtotal'] = (z.po[key]['price'] * z.po[key]['width'] * z.po[key]['height']) * z.po[key]['numberOfSet'];
             }
             else{
              z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
             }
             subTotal+= z.po[key]['subtotal'];
          }

          poArr.unshift((z.po[key]))
        });

        if(z.paid.paidBy == 'cash'){
          subTotal -= subTotal * z.paid.discount;
        }

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
            projectName: project[0].payload.toJSON(),
            isShow: true
          });
          
        })

        

      });
      this.isShowProgressSupplier = false;
      this.supplierTotalPurchase = total;
      this.poList['total'] = total;
      this.poList['balance'] = balance;
      console.log(this.poList);

    })
  }
  // SUPPLIER

  // PURCHASES
  getAllPO(){
    this.fb.retrieve('tblpo')
    .subscribe( res => {
      this.purchases_poList = [];
      let total = 0;
      let balance = 0;

      res.forEach(element => {
        let z = element.payload.toJSON();
        let poArr = [];
        let subTotal = 0;

        Object.keys(z.po).map((key) => {
          z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);

          if(z.po[key].supplier == 'FROM STOCK'){
            if(z.po[key].type.toLowerCase() == 'aluminum'){
              let inches = this.fractionToInches(''+z.po[key].qty);
                  
                  inches = this.roundOff(inches, 'aluminum', z.po[key].supplier);
                  console.log(inches)
                  z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * inches) 
                  * z.po[key].numberOfSet;
                  
                  subTotal+= z.po[key]['subtotal'];
                 console.log('from stock')
            }
            else if(z.po[key].type.toLowerCase() == 'glass'){
              console.log('PUMASOK SA TYPE GLASS')
                  let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                  let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                  // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                  let sqft = ((xWidth * xHeight) / 144);
                  z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                  subTotal+= z.po[key]['subtotal'];
            }
            else if(z.po[key].type.toLowerCase() == 'accessories'){
              z.po[key]['subtotal'] = z.po[key]['price'] * z.po[key]['numberOfSet'];
              subTotal+= z.po[key]['subtotal'];
            }
          }
          else{
            if( z.po[key]['type'] == "Glass"){
              console.log(z.po[key]['width'])
              let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                let sqft = ((xWidth * xHeight) / 144);
                z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                // z.po[key]['subtotal'] = (z.po[key]['price'] * z.po[key]['width'] * z.po[key]['height']) * z.po[key]['numberOfSet'];
             }
             else{
              z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
             }
             subTotal+= z.po[key]['subtotal'];
          }

          poArr.unshift((z.po[key]))


        });
        if(z.paid.paidBy == 'cash'){
          subTotal -= subTotal * z.paid.discount;
        }

        balance+= z.paid ? 0 :  subTotal;
        total += subTotal;
        console.log(z)

        if(z.projectKey != 'stock'){
          this.fb.retrieve(`tblprojects/${z.projectKey}`)
          .subscribe( project => {
  
            this.purchases_poList.unshift({
              po: poArr,
              poKey: element.key,
              date: z.date,
              subTotal: subTotal,
              paid: z.paid,
              projectName: project[0].payload.toJSON(),
              isShow: true
            });
            
          });
        }
        else{
          this.purchases_poList.unshift({
            po: poArr,
            poKey: element.key,
            date: z.date,
            subTotal: subTotal,
            paid: z.paid,
            projectName: 'PRESTIGE STOCK',
            isShow: true
          });
        }
        

      });

      this.purchases_poList['total'] = total;
      this.purchases_poList['balance'] = balance;

      console.log(this.purchases_poList)
    })
  }

  filterPO(mm, yy){
    let total = 0;

    this.purchases_poList.forEach( po => {
      
      console.log(po.date.split('/'))
      po.isShow = po.date.split('/')[0] == mm && po.date.split('/')[2] == yy ? true : false;
      total+= po.isShow ? po.subTotal : 0;
    });
    this.purchases_poList.total = total;
    console.log(this.purchases_poList)
  }
  // PURCHASES

  // STOCK
  addStock(data, date){
    console.log(data)
    console.log(this.stockList)
    let poToEdit = [];
    let check = [];

    for(let x of data){
      for(let y of this.stockList){
        if(x.materialName.match(y.materialName) && x.section.match(y.section)){
          poToEdit.includes({
            numberOfSet: x.numberOfSet,
            material: y
          }) ? '' : poToEdit.push({
            numberOfSet: x.numberOfSet,
            material: y
          });
          break;
        }
      }
    }
    console.log(poToEdit)
    
    if(poToEdit.length !=0){
      poToEdit.forEach( x => {
        this.fb.edit('tblstock', x.material.stockKey, {
          qty: x.material.numberOfStock + x.numberOfSet,
          date: date
        })
        .then(() => {

          this.fb.add('tblstockin', {
            date: date,
            qty: x.numberOfSet,
            stockKey: x.material.stockKey
          })
          .then( () => {
            this.M.toast(`
            Qty of <span class="green-text">${x.material.materialName}</span>&nbsp;material has been addedd.
            `);
          });

        });
        
      });
    }

    data.forEach( x => {
      let isProceed = true;

      for(let y of poToEdit){
        if(x.materialName.match(y.material.materialName) &&
          x.section.match(y.material.section)){
            isProceed = false;
            break;
        }
      }
      
      if(isProceed){
        
        this.fb.add('tblstock',{
          materialKey: x.materialKey,
          price: x.price,
          qty: x.numberOfSet,
          baseLength: x.type == 'Aluminum' ? 252 : x.type == 'Glass' ? `${x.width}ft x ${x.height}ft` : '-',
          date: date
        }).then((r) => {
          console.log(`added ${x.materialName}`)

          this.fb.add('tblstockin', {
            date: date,
            qty: x.numberOfSet,
            stockKey: r.key
          })
          .then( () => {
            this.M.toast(`
              <span class="green-text">${x.materialName}</span>&nbsp;material has been addedd to stock.
            `);
          });

        });
      }
    });

    this.addingPOLoader = false;
    this.fb.add(`tblpo`, {
      po: data,
      projectKey: 'stock',
      supplier: data[0].supplier,
      date: date,
      paid: false
    })
    .then( () => {
      this.M.toast(`New PO has been added`);
      data.forEach(x => {
        x['isShow'] = true;
        x['isCheck'] = true;
        x['numberOfSet'] = null;
        x['stockPrice'] = null;
      });
    });

    data.forEach(x => {
      
    });
  }

  getStockPO(){
    console.log('gett')
    this.fb.retrieveWithCondition('tblpo', 'projectKey', 'stock')
    .subscribe( res => {
      this.stockPO = [];
      let total = 0;
      let balance = 0;

      res.forEach(element => {
        let z = element.payload.toJSON();
        let poArr = [];
        let subTotal = 0;

        Object.keys(z.po).map((key) => {
          z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
          
          
          if(z.po[key].supplier == 'FROM STOCK'){
            if(z.po[key].type.toLowerCase() == 'aluminum'){
              let inches = this.fractionToInches(''+z.po[key].qty);
                  
                  inches = this.roundOff(inches, 'aluminum', z.po[key].supplier);
                  console.log(inches)
                  z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * inches) 
                  * z.po[key].numberOfSet;
                  
                  subTotal+= z.po[key]['subtotal'];
                 console.log('from stock')
              }
              else if(z.po[key].type.toLowerCase() == 'glass'){
                console.log('PUMASOK SA TYPE GLASS')
                  let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].suppliere);
                  let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].suppliere);
                  // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                  let sqft = ((xWidth * xHeight) / 144);
                  z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                  subTotal+= z.po[key]['subtotal'];
              }
              else if(z.po[key].type.toLowerCase() == 'accessories'){
                z.po[key]['subtotal'] = z.po[key]['price'] * z.po[key]['numberOfSet'];
                subTotal+= z.po[key]['subtotal'];
              }
          }
          else{
            if( z.po[key]['type'] == "Glass"){
              let xWidth = this.roundOff(this.fractionToInches(''+z.po[key]['width']), 'glass', z.po[key].supplier);
                let xHeight = this.roundOff(this.fractionToInches(''+z.po[key]['height']), 'glass', z.po[key].supplier);
                // z.po[key]['subtotal'] = (z.po[key]['price'] * xWidth * xHeight) * z.po[key]['numberOfSet'];
                let sqft = ((xWidth * xHeight) / 144);
                z.po[key]['subtotal'] = sqft * z.po[key]['price'] * z.po[key]['numberOfSet']
                // z.po[key]['subtotal'] = (z.po[key]['price'] * z.po[key]['width'] * z.po[key]['height']) * z.po[key]['numberOfSet'];
             }
             else{
              z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
             }
             subTotal+= z.po[key]['subtotal'];
          }

          poArr.unshift((z.po[key]))
        });

        if(z.paid.paidBy == 'cash'){
          subTotal -= subTotal * z.paid.discount;
        }

        balance+= z.paid ? 0 :  subTotal;
        total += subTotal;

        this.stockPO.unshift({
          po: poArr,
          poKey: element.key,
          date: z.date,
          subTotal: subTotal,
          paid: z.paid,
          projectName: 'STOCK',
          isShow: true
        });

      });
      
      this.stockPO['total'] = total;
      this.stockPO['balance'] = balance;
      console.log(this.stockPO);
      
      this.M.tooiltip();
    });
  }

  arrayToDeleteScrap ;
  viewScrap(key){
    
    
    this.fb.retrieveOnce('tblscrap', 'stockKey', key).once('value', r => {
      let res = r.toJSON();
      this.arrayToDeleteScrap=[];
      console.log(res);
      if(res != null){
        Object.keys(res).map((key) => {
          // console.log(res[key])
          console.log(res[key])
          
          // scrap.scrap.unshift(res[key].scrap);
          // scrap.scrapKey.unshift(key);
          if(res[key].scrap == 0){
            this.fb.delete('tblscrap', key );
          }
          else if(res[key].scrap.toString().match(' x ')){
              
              if(res[key].scrap.split(' x ')[0].replace('ft','') == 0 || 
                res[key].scrap.split(' x ')[1].replace('ft','') == 0){
                  console.log(res[key].scrap)
                  console.log(key)
                  this.arrayToDeleteScrap.push(key)
              }
              else{
                this.M.toast(res[key].scrap)
              }
          }
          else{
            this.M.toast(res[key].scrap+'in')
          }
            
        });
        if(this.arrayToDeleteScrap.length > 0){
          this.arrayToDeleteScrap.forEach( x => {
            this.fb.delete('tblscrap', x ).then( () =>{
              console.log(x)
            })
          })
        }
      }
      else{
        this.M.toast('No scrap for this material');
      }
      

    });
    // .subscribe( res => {
      
    //   res.forEach( x => {
    //     console.log(x.payload.toJSON())

    //     if(x.payload.toJSON().scrap > 0){
    //       // this.M.toastDismiss();
          
    //     }
        
    //   })

    // })
  }

  getStockMaterials(section, color, type){
    this.fb.retrieve('tblstock')
    .subscribe(res => {
      this.stockList = [];
      res.forEach( x => {
        let materialkey = x.payload.toJSON().materialKey;
        let materialObj = {};

        this.fb.retrieve(`tblmaterials/${materialkey}`)
        .subscribe(m => {
          materialObj['color'] = m[0].payload.toJSON();
          materialObj['materialName'] = m[1].payload.toJSON();
          materialObj['section'] = m[3].payload.toJSON();
          materialObj['supplier'] = 'FROM STOCK';
          materialObj['type'] = m[5].payload.toJSON();
        })

        materialObj['isShow'] = true;
        materialObj['isCheck'] = true;
        materialObj['qty'] = null;
        materialObj['stockPrice'] = null;
        materialObj['stockKey'] = x.payload.key;
        materialObj['baseSize'] = x.payload.toJSON().baseLength;
        materialObj['price'] = x.payload.toJSON().price;
        materialObj['stock'] = x.payload.toJSON().qty;
        materialObj['numberOfSet'] = null;
        materialObj['glassCutStyle']= false;
        materialObj['numberOfStock'] = x.payload.toJSON().qty;
        materialObj['date'] = x.payload.toJSON().date;

        this.stockList.unshift(materialObj);
        
      });
      console.log(this.stockList)
      let wew = this;
      setTimeout( function() {
        wew.sortMaterialsStock(section, color, type);
        wew.progressStockstable = false;
        
      }, 300)
      
    });
  }

  updateStock(data){
    let obj = {
      price: data.fields[0].value,
      qty: data.fields[1].value
    }
    console.log(obj)
    this.fb.edit('tblstock', data.key, obj)
    .then( () => {
      this.M.toast(`Item updated.`);
    })
  }

  deleteStock(data){
    this.fb.delete('tblstock', data.stockKey)
    .then( () => {
      this.M.toastDismiss();
      this.M.toast(`<span class="yellow-text">${data.materialName}</span>&nbsp;has been deleted.`);
    });
  }

  sortMaterialsStock(section, color, type){
  
    this.stockList.forEach( m =>  {
   

      if(type == m.type){
        
        if(section != null && color == null){
          m.isShow = m.section == section ? true : false;
        }
        else if(section == null && color != null){
          m.isShow = m.color == color ? true : false;
        }
        else if(section != null && color != null){
          m.isShow = section == m.section && color == m.color ? true : false;
        }
        else{
          m.isShow = true;
        }

        console.log(m.isShow)
      }
      else{
        m.isShow = false;
      }
      
    });
    console.log(this.stockList)
    
    // this.getMaterialsByType(type);
  }

  getScrapUsingMaterial(data){
    this.viewScrap(data.stockKey)

    this.fb.retrieveWithCondition('tblscrap', 'stockKey', data.stockKey)
    .subscribe( res => {
      
      this.scrapList = {};
      let arr = [];
      res.forEach( element => {

        arr.unshift({
          materialName: data.materialName,
          color: data.color,
          scrap: element.payload.toJSON().scrap,
          stockkey: data.stockKey
        });
        
      });
      this.scrapType = data.type;
      this.scrapBaseSize = data.baseSize;

      this.scrapList = {
        list: arr,
        stockKey: data.stockKey
      }
      console.log(this.scrapList)
    });
  }

  addScrapManually(stockKey, data){
    this.fb.add('tblscrap', {
      scrap: data,
      stockKey: stockKey
    })
    .then( () =>{
      this.M.toast('Scrap successfully added')
    })
    console.log(stockKey + '   '+ data);
  }

  viewInOut(data){
    console.log(data)

    // in
    
    this.fb.retrieveWithCondition('tblstockin', 'stockKey', data.stockKey)
    .subscribe( res => {
     
      this.stockInList = [];

      res.forEach(element => {
        let x = element.payload.toJSON();

        this.fb.retrieve(`tblstock/${x.stockKey}`)
        .subscribe( r => {

          let materialKey = r[2].payload.toJSON();
          let obj = {};
          obj['date'] = x.date;
          obj['qty'] = x.qty;
          obj['baseLength'] = r[0].payload.toJSON();
          
          this.fb.retrieve(`tblmaterials/${materialKey}`)
          .subscribe( mRes => {

            obj['color'] = mRes[0].payload.toJSON();
            obj['materialName'] = mRes[1].payload.toJSON();
            
          });

          this.stockInList.push(obj);
          console.log(this.stockInList)
        });

      });
    });

    this.fb.retrieveWithCondition('tblstockout', 'stockKey', data.stockKey)
    .subscribe( res => {
     
      this.stockOutList = [];

      res.forEach(element => {
        let x = element.payload.toJSON();
        console.log(x);

        this.fb.retrieve(`tblstock/${x.stockKey}`)
        .subscribe( r => {
          console.log(r)

          let materialKey = r[2].payload.toJSON();
          let obj = {};
          obj['date'] = x.date;
          obj['qty'] = x.qty;
          obj['numberOfSet'] = x.numberOfSet;

          this.fb.retrieve(`tblmaterials/${materialKey}`)
          .subscribe( mRes => {

            obj['color'] = mRes[0].payload.toJSON();
            obj['materialName'] = mRes[1].payload.toJSON();

          });

          this.stockOutList.push(obj);
          console.log(this.stockOutList)
        });

      });
    });

  }
  // STOCK


  //TYPE
  typeName: string;
  listOfType: any = [];
  type_modalUpdateFields: any = {
    title: 'Update Type',
    key: '',
    fields: [
      {
        target: 'typeNameUpdate',
        label: 'Type Name',
        type: 'text',
        value: ''
      }
    ]
  };
  
  addType(data){
    console.log(data)
    this.fb.add('tbltype', {
      name: data
    })
    .then(() => {
      console.log('successfully added')
      this.typeName = '';
      this.M.toast(`<span class="green-text">${data}</span>&nbsp;material has been addedd.`);
    });
  }

  getType(){
    this.fb.retrieve('tbltype')
    .subscribe( res => {
      this.listOfType = [];
      res.forEach( x => {
        this.listOfType.unshift({
          name: x.payload.toJSON().name,
          key: x.payload.key,
          isCheck: false
        });

      });
      console.log(this.listOfType)
    });
  }

  editType(data){
    console.log(data)

    this.fb.edit('tbltype', data.key, {
      name: data.fields[0].value
    })
    .then( () => {
      console.log('successfully Updated')
    });
  }

  deleteType(data){
    console.log(data)

    this.fb.delete('tbltype', data.key)
    .then(() => {
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Type has been deleted.`)
    });
  }
  //TYPE

  //SUPPLIER
  supplierName: string;
  listOfSupplier = [];

  addSupplier(data) {
    console.log(data)
    this.fb.add('tblsupplier', data)
    .then( () => {
      console.log('Supplier added');
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Supplier has been addedd.`)
    });
  }

  getSupplier(){
    this.listOfSupplier = []; 
    this.fb.retrieve('tblsupplier')
    .subscribe( res => {
     this.listOfSupplier = []; 
     
      res.forEach(element => {
        let x = element.payload.toJSON();
        let key = element.payload.key;
        let types = x.types.split(';');
        console.log(types)
        console.log(x)
        let types_ = '';

        this.fb.onceRetrieve(`tbltype`)
        .once('value',( typeRes )=> {
          let r = typeRes.toJSON()

          Object.keys(r).map((key) => {
      
            types.forEach(t => {
              
              types_ += t == key ? `${r[key].name}, ` : '';

            });

          });
          
          this.listOfSupplier.unshift({
            name: x.name,
            types: types_,
            key: key
          });

          console.log(types_)
        });
       
      });

     
    });
  }

  editSupplier(data){
    
    this.fb.edit('tblsupplier', data.key, {
      name: data.fields[0].value
    })
    .then( () => {
      console.log('successfully Updated')
    })
  }

  deleteSupplier(data){
    console.log(data)

    this.fb.delete('tblsupplier', data.key)
    .then(() => {
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Supplier has been deleted.`)
    });
  }
  //SUPPLIER

  //SECTION
  sectionName: string;
  listOfSection = [];

  addSection(data){
    console.log(data)
    this.fb.add('tblsection', data)
    .then( () => {
      console.log('section added');
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Section has been addedd.`)
    });
  }

  getSection(){
    this.listOfSection = []; 
    this.fb.retrieve('tblsection')
    .subscribe( res => {
     this.listOfSection = []; 
     
      res.forEach(element => {
        let x = element.payload.toJSON();
        let key = element.payload.key;
        let types = x.types.split(';');
        console.log(types)
        console.log(x)
        let types_ = '';

        this.fb.onceRetrieve(`tbltype`)
        .once('value',( typeRes )=> {
          let r = typeRes.toJSON()

          Object.keys(r).map((key) => {
      
            types.forEach(t => {
              
              types_ += t == key ? `${r[key].name}, ` : '';

            });

          });
          
          this.listOfSection.unshift({
            name: x.name,
            types: types_,
            key: key
          });

          console.log(this.listOfSection)
        });
       
      });

     
    });
  }

  editSection(data){
    this.fb.edit('tblsection', data.key, {
      name: data.fields[0].value
    })
    .then( () => {
      console.log('successfully Updated')
    })
  }

  deleteSection(data){
    console.log(data)

    this.fb.delete('tblsection', data.key)
    .then(() => {
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Section has been deleted.`)
    });
  }
  //SECTION

  // COLOR
  colorName: string;
  listOfColor = [];

  addColor(data){
    console.log(data)
    this.fb.add('tblcolor', data)
    .then( () => {
      console.log('color added')
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Color has been addedd.`)
    });
  }

  getColor(){
    this.listOfColor = []; 
    this.fb.retrieve('tblcolor')
    .subscribe( res => {
     this.listOfColor = []; 
     
      res.forEach(element => {
        let x = element.payload.toJSON();
        let key = element.payload.key;
        let types = x.types.split(';');
        console.log(types)
        console.log(x)
        let types_ = '';

        this.fb.onceRetrieve(`tbltype`)
        .once('value',( typeRes )=> {
          let r = typeRes.toJSON()

          Object.keys(r).map((key) => {
      
            types.forEach(t => {
              
              types_ += t == key ? `${r[key].name}, ` : '';

            });

          });
          
          this.listOfColor.unshift({
            name: x.name,
            types: types_,
            key: key
          });

          console.log(this.listOfColor)
        });
       
      });

     
    });
  }

  editColor(data){
    this.fb.edit('tblcolor', data.key, {
      name: data.fields[0].value
    })
    .then( () => {
      console.log('successfully Updated')
    })
  }

  deleteColor(data){
    console.log(data)

    this.fb.delete('tblcolor', data.key)
    .then(() => {
      this.M.toast(`<span class="green-text">${data.name}</span>&nbsp;Color has been deleted.`)
    });
  }
  // COLOR


  getSupplierCheckBox(data){
    console.log(data)
   
    this.fb.onceRetrieve('tblsupplier').once('value', (r) => {
      let res = r.toJSON();
      this.supplierCheckBox = [];
      Object.keys(res).map((key) => {
       res[key].types.match(data.key) ?  this.supplierCheckBox.push({
         key: key,
         name: res[key].name,
         isCheck: false
       }) : '';
      });

      this.supplierCheckBox.sort(function (a, b) {
          if (a.name < b.name) {
              return -1;
          }
          return 0;
      });
      
      console.log(this.supplierCheckBox)
    });

    this.fb.onceRetrieve('tblsection').once('value', (r) => {
      let res = r.toJSON();
      this.sectionCheckBox = [];
      Object.keys(res).map((key) => {
       res[key].types.match(data.key) ?  this.sectionCheckBox.push({
         key: key,
         name: res[key].name,
         isCheck: false
       }) : '';
      });

      this.sectionCheckBox.sort(function (a, b) {
          if (a.name < b.name) {
              return -1;
          }
          return 0;
      });
      
      console.log(this.sectionCheckBox)
    });

    this.fb.onceRetrieve('tblcolor').once('value', (r) => {
      let res = r.toJSON();
      this.colorCheckBox = [];
      Object.keys(res).map((key) => {
       res[key].types.match(data.key) ?  this.colorCheckBox.push({
         key: key,
         name: res[key].name,
         isCheck: false
       }) : '';
      });

      this.colorCheckBox.sort(function (a, b) {
          if (a.name < b.name) {
              return -1;
          }
          return 0;
      });
      
      console.log(this.colorCheckBox)
    });
  }

  editMaterialKey(){

    this.fb.onceRetrieve(`tblmaterials`)
    .once('value',( r )=> {
      let res = r.toJSON();
      Object.keys(res).map((key) => {
        
        console.log(res[key].color)
        if(res[key].color == 'ANNEALED'){
          // console.log(res[key].color)

          // this.fb.edit('tblmaterials', key, {
          //   color: ''
          // })
          // .then( () => {
          //   console.log('successful updated')
          // })

        }
      })
    });
  }
}
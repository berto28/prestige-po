import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MaterializeService } from '../services/materialize.service';
import { element } from '@angular/core/src/render3';
 
@Injectable({
  providedIn: 'root'
})
export class PrestigeService {

  url: string = 'Projects';
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

  scrapList: any = [];
  //////////////////////////////Stocks

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
          price: m.price,
          type: data.type
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
                  z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * z.po[key].qty) 
                  * z.po[key].numberOfSet;
                  
                  subTotal+= z.po[key]['subtotal'];
                 console.log('from stock')
                }
              }
              else{
               if( z.po[key]['type'] == "Glass"){
                z.po[key]['subtotal'] = (z.po[key]['price'] * z.po[key]['width'] * z.po[key]['height']) * z.po[key]['numberOfSet'];
                
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
    // console.log(data)
    // console.log(data[0].supplier)

    this.getGlassCut(data);
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

  getGlassCut(data){
    // console.log(data);

    data.forEach( x => {
      this.processGlassCut(x, x.numberOfSet);
    });
  }

  processGlassCut(x, numberOfSet){
    this.fb.retrieveOnce('tblscrap', 'stockKey', x.stockKey).once('value', (r) => {
      let res = r.toJSON();
      console.log(res)
      if(res == null){
        console.log('walang laman')
        this.addGlassScrap(x, numberOfSet);
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
            let baseW = scrap[i].scrap.split(' x ')[0].replace('ft','');
            let baseH = scrap[i].scrap.split(' x ')[1].replace('ft','');

            if(scrap[i].scrap.split(' x ')[0].replace('ft','') < scrap[j].scrap.split(' x ')[0].replace('ft','') ||
              scrap[i].scrap.split(' x ')[1].replace('ft','') < scrap[j].scrap.split(' x ')[1].replace('ft','')){
              
                console.log(scrap[i].scrap.split(' x ')[0].replace('ft','') +'<'+ scrap[j].scrap.split(' x ')[0].replace('ft',''))
                console.log(scrap[i].scrap.split(' x ')[1].replace('ft','') +'<'+ scrap[j].scrap.split(' x ')[1].replace('ft',''))
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


        for(let i = 0; i < numberOfSet; i++){
          let ctr = 0;
          let isNotAvailable = true;
        

          for(let s of scrap){
            console.log(s)

            let baseW = s.scrap.split(' x ')[0].replace('ft','');
            let baseH = s.scrap.split(' x ')[1].replace('ft','');

            console.log(baseW +' x '+baseH);
            
            if(baseW >= x.width && baseH >= x.height){

              // HORIZONTAL
              let horizontal = {
                cut01: `${(baseW - x.width)}ft x ${x.height}ft`,
                cut02: `${baseW}ft x ${(baseH - x.height)}ft`
              }

              let vertical = {
                cut01: `${x.width}ft x ${(baseH - x.height)}ft`,
                cut02: `${(baseW - x.width)}ft x ${baseH}ft`
              }

              s.cutSize = horizontal;
              scrapKeyToDelete = s.scrapKey;
              console.log(horizontal)
              console.log(vertical)
              isDeleteExisting = true;
              break;
            }

          }

        }
        // console.log(scrap)

        isDeleteExisting ? this.deleteGlassScrap(scrap, x, scrapKeyToDelete) : this.updateGlassScrap(scrap, x);

        // this.updateGlassScrap(scrap, x, isDeleteExisting);

      }
    });
  }

  addGlassScrap(data, numberOfSet){
    console.log('getting new glass scrap from tblstock');
    if(data.stock > 0){

      this.fb.add('tblscrap', {
        scrap: data.baseSize,
        stockKey: data.stockKey
      }).then( () => {
        console.log('Added new Scrap')
        data.stock-=1;
        this.fb.edit('tblstock', data.stockKey, {
          qty: data.stock
        })
        .then( () =>{
          console.log('-1 from stock')
          this.processGlassCut(data, numberOfSet);
        })
       
      });

    }
    else{
      this.M.toast(`<span class="yellow-text">${data.materialName} </span>&nbsp;insufficient stock or scrap`);
    }
  }

  deleteGlassScrap(data, item, scrapKeyToDelete){
    console.log('pumasok sa delete glass scrap');
    console.log(data);

    this.fb.delete('tblscrap', scrapKeyToDelete)
    .then( () =>{
      this.updateGlassScrap(data, item)
    });
  }

  updateGlassScrap(data, item){
    console.log('pumasok sa updateGlassScrap')
    console.log(data)

    data.forEach(d => {

      if(d.cutSize == null || d.cutSize == undefined){}
      else{
        Object.keys(d.cutSize).map((key) => {
          console.log(d.cutSize[key])
          this.fb.add('tblscrap', {
            stockKey: item.stockKey,
            scrap: d.cutSize[key]
          }).
          then( () =>{
            console.log(`added ${d.cutSize.cut01} and ${d.cutSize.cut02}`)
          });
        }); 
      } 
      
    });

    
  }


  getScrap(data){
    console.log(data);
    
    
    data.forEach( x => {
      console.log(x)
      this.refreshScrap(x, x.numberOfSet);     
    });

  }

  refreshScrap(x, numberOfSet){
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
              this.addScrap(x, numberOfSet)
            }
            else{
              // let scrap = {
              //   scrap: [],
              //   scrapKey: []
              // };
  
              let scrap = [];
  
              Object.keys(res).map((key) => {
                // console.log(res[key])
                scrap.unshift(
                  {
                    scrap: res[key].scrap,
                    scrapKey: key
                  }
                )
                // scrap.scrap.unshift(res[key].scrap);
                // scrap.scrapKey.unshift(key);
              });
  
              console.log(scrap);
              
              let isGetNewScrap = true;
              let countFinishSet = 0;
              
              for(let i = 0; i < numberOfSet; i++){
                // console.log(i)
                let ctr = 0;
                let isNotAvailable = true;
              
  
                for(let s of scrap){
                  isGetNewScrap = true;
  
                  if(s.scrap >= x.qty){
                    let newScrap = s.scrap - x.qty;
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
              this.updateScrap(scrap, isGetNewScrap, x, (numberOfSet - countFinishSet));
              isGetNewScrap ? console.log('get new item') : '';
              
            }
          });
  }

  updateScrap(data, isGetNewScrap, item, numberOfSet){
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
        isGetNewScrap && ctr == len ? this.addScrap(item, numberOfSet) : '';
        // this.stockList.forEach(x => {
        //   x['isShow'] = true;
        //   x['isCheck'] = true;
        //   x['qty'] = null;
        // });
      });
    })
  }

  addScrap(data, numberOfSet){
    console.log(data)

    if(data.stock > 0){
      
      console.log('pumasok ba?')
      this.fb.add('tblscrap', {
        scrap: data.baseSize,
        stockKey: data.stockKey
      }).then( () => {
        console.log('Added new Scrap')
        data.stock-=1;
        this.fb.edit('tblstock', data.stockKey, {
          qty: data.stock
        })
        .then( () =>{
          console.log('-1 from stock')
          this.refreshScrap(data, numberOfSet);
        })
       
      });

    }
    else{
      this.M.toast(`<span class="yellow-text">${data.materialName} </span>&nbsp;insufficient stock or scrap`);
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
                z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * z.po[key].qty) 
                * z.po[key].numberOfSet;
                
                subTotal+= z.po[key]['subtotal'];
                console.log('from stock')
              }
          }
          else{
            z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
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
              z.po[key]['subtotal'] = ((z.po[key].price / z.po[key].baseSize) * z.po[key].qty) 
              * z.po[key].numberOfSet;
              
              subTotal+= z.po[key]['subtotal'];
             console.log('from stock')
            }
          }
          else{
            z.po[key]['subtotal'] = (z.po[key].price * z.po[key].numberOfSet);
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
    
    

    data.forEach( x => {
     this.fb.add('tblstock',{
      materialKey: x.materialKey,
      price: x.price,
      qty: x.qty,
      baseLength: x.type == 'Aluminum' ? 252 : x.type == 'Glass' ? `${x.width}ft x ${x.height}ft` : ''
     }).then(() => {
        this.M.toast(`
          <span class="green-text">${x.materialName}</span>&nbsp;material has been addedd to stock.
        `);
        x['isShow'] = true;
        x['isCheck'] = true;
        x['qty'] = null;
        x['stockPrice'] = null;
     });

    });
  }

  viewScrap(key){
    
   
    this.fb.retrieveOnce('tblscrap', 'stockKey', key).once('value', r => {
      let res = r.toJSON();
      Object.keys(res).map((key) => {
        // console.log(res[key])
        console.log(res[key])
        
        // scrap.scrap.unshift(res[key].scrap);
        // scrap.scrapKey.unshift(key);
        if(res[key].scrap == 0){
          this.fb.delete('tblscrap', key );
        }
        else{
          this.M.toast(res[key].scrap+'in')
        }
      });
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
        materialObj['numberOfStock'] = x.payload.toJSON().qty;

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
  // STOCK
}

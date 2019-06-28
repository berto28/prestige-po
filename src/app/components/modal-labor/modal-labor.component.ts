import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';
@Component({
  selector: 'app-modal-labor',
  templateUrl: './modal-labor.component.html',
  styleUrls: ['./modal-labor.component.css']
})
export class ModalLaborComponent implements OnInit {

  constructor(public prestige : PrestigeService) { }

  selectedType = "TYPE OF LABOR";
  labor = [
    {
      type: "TEMPERED",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 50,
            },
            {
              item: "10MM",
              price: 70,
            },
            {
              item: "12MM",
              price: 90,
            },
          ]
        },
        {
          supplier: "TRANS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 35,
            },
            {
              item: "10MM",
              price: 50,
            },
            {
              item: "12MM",
              price: 55,
            },
          ]
        },
        {
          supplier: "PACIFIC GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 20,
            },
            {
              item: "10MM",
              price: 24,
            },
            {
              item: "12MM",
              price: 28,
            },
          ]
        }
      ]
    },

    {
      type: "HASA/FEP",
      pricing: "linear",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 25,
            },
            {
              item: "10MM",
              price: 27,
            },
            {
              item: "12MM",
              price: 30,
            },
          ]
        },
        {
          supplier: "TRANS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 10,
            },
            {
              item: "10MM",
              price: 0,
            },
            {
              item: "12MM",
              price: 0,
            },
          ]
        },
        {
          supplier: "PACIFIC GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 70,
            },
            {
              item: "10MM",
              price: 111,
            },
            {
              item: "12MM",
              price: 125,
            },
          ]
        },
      ]
    },

    {
      type: "BEVEL",
      pricing: "linear",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 20,
            },
            {
              item: "10MM",
              price: 24,
            },
            {
              item: "12MM",
              price: 28,
            },
          ]
        },
        {
          supplier: "TRANS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 40,
            },
            {
              item: "10MM",
              price: 0,
            },
            {
              item: "12MM",
              price: 0,
            },
          ]
        },
        {
          supplier: "PACIFIC GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 64,
            },
            {
              item: "10MM",
              price: 71,
            },
            {
              item: "12MM",
              price: 78,
            },
          ]
        },
      ]
    },
    
    {
      type: "COLORCOATED",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 25,
            },
            {
              item: "10MM",
              price: 27,
            },
            {
              item: "12MM",
              price: 30,
            },
          ]
        },
        {
          supplier: "PACIFIC GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 274,
            },
            {
              item: "10MM",
              price: 274,
            },
            {
              item: "12MM",
              price: 274,
            },
          ]
        },
      ]
    },

    {
      type: "ETCHING",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 180,
            },
            {
              item: "10MM",
              price: 180,
            },
            {
              item: "12MM",
              price: 180,
            },
          ]
        },
        {
          supplier: "CLASSIC",
          itemAndPrice: [
            {
              item: "6MM",
              price: 120,
            },
            {
              item: "10MM",
              price: 0,
            },
            {
              item: "12MM",
              price: 400,
            },
          ]
        },
      ]
    },

    {
      type: "NOTCH",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 250,
            },
            {
              item: "10MM",
              price: 250,
            },
            {
              item: "12MM",
              price: 250,
            },
          ]
        },
      ]
    },

    {
      type: "HOLE 1/2",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 100,
            },
            {
              item: "10MM",
              price: 0,
            },
            {
              item: "12MM",
              price: 0,
            },
          ]
        },
        {
          supplier: "TRANS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 50,
            },
            {
              item: "10MM",
              price: 100,
            },
            {
              item: "12MM",
              price: 250,
            },
          ]
        },
      ]
    },

    {
      type: "HOLE 3/4",
      pricing: "sqft",
      labor: [
        {
          supplier: "CHAIN GLASS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 350,
            },
            {
              item: "10MM",
              price: 150,
            },
            {
              item: "12MM",
              price: 0,
            },
          ]
        },
        {
          supplier: "TRANS",
          itemAndPrice: [
            {
              item: "6MM",
              price: 50,
            },
            {
              item: "10MM",
              price: 100,
            },
            {
              item: "12MM",
              price: 250,
            },
          ]
        },
      ]
    },
  ];
  listOfSupplier = [];
  laborPO = [];
  laborMessage ='';

  ngOnInit() {
    console.log(this.labor)
  }

  onClickType(type){
    this.prestige.selectedLaborType = type;
    
    console.log(this.prestige.poLabor)
    let poLabor = this.prestige.poLabor;
    let laborType;
    for(let l of this.labor){
      if(l.type == type){
        laborType = l;
        break;
      }
    };

    this.prestige.listOfSupplierLabor = [];
    console.log(laborType)
    for(let l of laborType.labor){
      for(let j of l.itemAndPrice){
        for(let p of poLabor.po){

          if(p.materialName.toLowerCase().match(j.item.toLowerCase())){
            console.log(j.item)
            j['supplier'] = l.supplier;
            j['isCheck'] = false;
            j['pricing'] = laborType.pricing;
            j['laborType'] = laborType.type;
            this.prestige.listOfSupplierLabor.push({
              labor: j,
              po: p,
              poKey: poLabor.poKey,
              poNumber: poLabor.poNumber
            })
          }

        }
      }
    }
    this.prestige.listOfSupplierLabor.sort(function (a, b) {
      if (a.labor.price < b.labor.price) {
          return -1;
      }
      return 0;
    });
    console.log(this.prestige.listOfSupplierLabor)
    
  }

  onClickCheckBox(e, s){
    e.preventDefault();
    let poLabor = this.prestige.poLabor;
    let ctr = 0;
    
    s.labor.isCheck = !s.labor.isCheck;
    console.log(poLabor)
    for(let l of this.prestige.listOfSupplierLabor){
      for(let p of poLabor.po){
        
        if(l.labor.isCheck){
          if(p.materialName.toLowerCase().match(l.labor.item.toLowerCase())){

            if(this.laborMessage.toLowerCase().match(l.labor.item.toLowerCase())){}
            else{
              this.laborMessage+=p.materialName+',';
            }
            
          }
        }

      }
    }
    console.log(s.labor.isCheck)
  }


  onClickProceed(){
    console.log(this.prestige.listOfSupplierLabor)
    let arr = [];
    let jsonArray = [];

    this.prestige.listOfSupplierLabor.forEach( l => {
      l.labor.isCheck == true ? arr.push(l) : '';
    });

    arr.forEach(j => {
      console.log(j)
      let obj = {
        poKey: j.poKey,
        materialKey: j.po.materialKey,
        materialName: j.po.materialName,
        qty: j.po.numberOfSet,
        width: j.po.width,
        height: j.po.height,
        pricing: j.labor.pricing,
        price: j.labor.price,
        poNumber: j.poNumber,
        laborType: j.labor.laborType,
        laborSupplier: j.labor.supplier,
      }

      jsonArray.push(obj);
    });



    this.prestige.addLabor(jsonArray);
  }

}

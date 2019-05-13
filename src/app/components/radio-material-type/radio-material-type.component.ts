import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterializeService } from '../../services/materialize.service';

@Component({
  selector: 'app-radio-material-type',
  templateUrl: './radio-material-type.component.html',
  styleUrls: ['./radio-material-type.component.css']
})
export class RadioMaterialTypeComponent implements OnInit {

  isRadioCheck: Array<any> = [true, false, false];
  materialType: Array<string> = ['Aluminum', 'Accessories'];
  type = 'Aluminum';
  @Output() typeEmitter = new EventEmitter<string>();
  constructor(public materialService: MaterializeService) { }

  ngOnInit() {
  }

  onClickRadioButton(type, evt, i){
    evt.preventDefault();
    
    console.log(type)
    this.type = type;
    for(let c1 = 0; c1 < 3; c1++){
      this.isRadioCheck[c1] = false;
    }
    this.isRadioCheck[i] = true;
    this.typeEmitter.emit(type)
    // this.prestige.materials = [];
    this.materialService.dropdown();
  }
}

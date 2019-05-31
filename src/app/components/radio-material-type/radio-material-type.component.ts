import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterializeService } from '../../services/materialize.service';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-radio-material-type',
  templateUrl: './radio-material-type.component.html',
  styleUrls: ['./radio-material-type.component.css']
})
export class RadioMaterialTypeComponent implements OnInit {

  isRadioCheck: Array<any> = [true, false, false];
  materialType: Array<string> = ['Aluminum', 'Glass', 'Accessories'];
  type = 'Aluminum';
  @Output() typeEmitter = new EventEmitter<string>();
  constructor(public materialService: MaterializeService, public prestige: PrestigeService) { }

  ngOnInit() {
    this.prestige.getType();
  }

  onClickRadioButton(type, evt, i){
    evt.preventDefault();
    
    console.log(type)

    this.prestige.listOfType.forEach(element => {
      element.isCheck = false;
    });
    type.isCheck = true;
    this.typeEmitter.emit(type)
    // this.prestige.materials = [];
    this.materialService.dropdown();
  }
}

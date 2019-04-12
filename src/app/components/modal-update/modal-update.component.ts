import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})
export class ModalUpdateComponent implements OnInit {

  @Input() editData;
  @Output() updatedMaterial = new EventEmitter<any>();

  constructor(public prestige: PrestigeService) {}

  ngOnInit() {
  }

  onClickUpdate(material): void{
    this.updatedMaterial.emit(material);
  }

}
